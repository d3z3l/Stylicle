import React from "react";
import Router from 'next/router';
import cookie from 'react-cookies'

import config from "../../../../config";
import Link from 'next/link'
import { faEye,faPlus ,faDollarSign} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TransactionHelper from "../../../../Helpers/TransactionHelper";
import AuthHelper from "../../../../Helpers/AuthHelper";
import dynamic from "next/dynamic";
var moment = require("moment");

const MUIDataTable = dynamic(() => import('mui-datatables-next'), {
  ssr: false
});
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const columns = [{
  name: "Sr#",
  options: {filter: false,sort: false}
 }
 ,{
  name: "Sender",
  options: {
   filter: false,
   sort: false
  }
 }
  ,
  {
    name: "Receiver",
    options: {
     filter: false,
     sort: false
    }
   }
  ,
  {
    name: "Date",
    options: {
     filter: false,
     sort: false
    }
   }
  ,
  {
    name: "Amount",
    options: {
     filter: false,
     sort: false
    }
   }
  ,
  {
    name: "Method",
    options: {
     filter: false,
     sort: false
    }
   }

  ];
const options = {
  filterType: 'checkbox',
  downloadOptions: { 
    filename: 'eventTable.csv',
  },  print: false,
  viewColumns: false,
  filterTable: false,
  delete: false,
  


};
class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title:'',
      categories:[],
      category_id:'',
      subcategories:[],
      message:""

    };
  }

  getMuiTheme = () => createMuiTheme({
    typography: {htmlFontSize: 10},
    overrides: {
      MUIDataTableBodyCell: {
        root: {
          fontSize: 15,
        }
      },
      MUIDataTablePagination: {
        root: {
          backgroundColor: "#80808054",
        }
      },
    }
  })
  componentDidMount = () => {
    // this.hendalGetCaterory()
    if (Router.query.index!=undefined) {
      console.log('Router.query', Router.query.index);
      cookie.save('User_id', Router.query.index , { path: '/' })
      this.hendalGetSubCaterory(Router.query.index)
    }else{
      console.log('Router.Cookie', cookie.load('User_id'));
      this.hendalGetSubCaterory(cookie.load('User_id'))
    }
    // this.hendalGetSubCaterory()

  };
  hendalCreateSubCaterory = () => {
    if (this.state.category_id=='') {
      this.setState({message:'Select any Category'})
      return false
    }
    if (this.state.title=='') {
      this.setState({message:'Select any Name'})
      return false
    }
    let data = {
      title: this.state.title,
      categories: this.state.category_id,
    };
    SubCategoriesHelper.Create(data).then((resp) => {
      this.setState({message:''})
      this.hendalGetSubCaterory()
    });
  };
  hendalUpdateSubCaterory = (id,condetion) => {
    var data={}
    if (condetion) {
       data={status: "1"}
    } else {
       data={status: "0"}
    }
    SubCategoriesHelper.Update(id,data).then((resp) => {

    });

  };

  hendalGetSubCaterory = (id) => {
    let subcategories=[]
    let data= {_id:id}
    TransactionHelper.get_by_users(data).then((resp) => {
      console.log(34343434);
      console.log(resp);
      for (let i = 0; i < resp.data.data.transaction.length; i++) {
        console.log(i);
        console.log('element.data');
        const element = resp.data.data.transaction[i];
        console.log(element);
        // alert(element.sender)
        subcategories.push([i+1,
          element.sender ?element.sender.name:null,
          <a>
            { element.receiver!=undefined ?element.receiver.name:'NaN' }
            {/* { element.receiver==undefined ?element.receiver[0].name:null } */}
            {console.log(element)}
            {console.log(element.receiver)}
          </a>
         ,
          
          moment(
            new Date(
              (element.date + new Date().getTimezoneOffset() * 60) *
              1000
                )
            ).format('MMM Do YY')
          ,
          "$"+element.amount,
          element.method,
          // element.date,
        ])
        // console.log(element.method);
      }
      this.setState({subcategories:subcategories})
    });
  };

  // hendalGetCaterory = () => {
  //   let categories=''
  //   CategoriesHelper.Get().then((resp) => {
  //     for (let i = 0; i < resp.data.data.categories.length; i++) {
  //       this.setState({categories:resp.data.data.categories})
  //     }
  //   });
  // };

  render() {
    return (
      <>
        <div class="">
          <div class="container">
            <h1 class="text-2xl leading-none text-gray-900 tracking-tight ">
            Transactions
            </h1>
            <div class="catg_listing">
              <div class="row">
               
                <div class="col-md-12">
                  <div class="card p-3 uk-box-shadow-medium">
                    <div class="bulkrow mb-3">
                    </div>
                    <div class="table-responsive">
                      {
                        this.state.subcategories.length==0?
                        <h1 class="no_data_here" >There is no data to display</h1>
                        :null
                      }
                    <MuiThemeProvider theme={this.getMuiTheme()}>
                      <MUIDataTable title={" Transactions List"} data={this.state.subcategories} columns={columns} options={options} />
                    </MuiThemeProvider>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}



export default Categories;
