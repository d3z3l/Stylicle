import React from "react";
import config from "../../../../config";
import Link from 'next/link'
import { faEye,faPlus ,faDollarSign} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CategoriesHelper from "../../../../Helpers/CategoriesHelper";
import SubCategoriesHelper from "../../../../Helpers/SubCategoriesHelper";
import AuthHelper from "../../../../Helpers/AuthHelper";
import dynamic from "next/dynamic";
const MUIDataTable = dynamic(() => import('mui-datatables-next'), {
  ssr: false
});
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const columns = [{
  name: "Sr#",
  options: {filter: false,sort: false}
 }
 ,{
  name: "Image",
  options: {
   filter: false,
   sort: false
  }
 }
  ,
  {
    name: "Name",
    options: {
     filter: false,
     sort: false
    }
   }
  ,
  {
    name: "Email",
    options: {
     filter: false,
     sort: false
    }
   }
  ,
  {
    name: "Phone",
    options: {
     filter: false,
     sort: false
    }
   }
  ,
  // {
  //   name: "Status",
  //   options: {
  //    filter: false,
  //    sort: false
  //   }
  // },
  {
    name: "Action",
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
    this.hendalGetSubCaterory()
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
    AuthHelper.Update_by_id(id,data).then((resp) => {
      this.hendalGetSubCaterory()
    });

  };

  hendalGetSubCaterory = () => {
    let subcategories=[]
    AuthHelper.getAllbuyersAdmin().then((resp) => {
      for (let i = 0; i < resp.data.data.user.length; i++) {
        const element = resp.data.data.user[i];
        subcategories.push([i+1,
          <div class="bg-gradient-to-tr p-1 rounded-full transition m-0.5 mr-2  w-24 h-24">
            <img
              src={config.image_url + element.image}
              class="bg-gray-200 border-4 border-white rounded-full w-full h-full"
            />
          </div>,
          element.name,element.email,element.phone,
          // <div class="switch-container">
          //   <label class="switch">
          //     <input
          //     onClick={()=>{this.hendalUpdateSubCaterory(element._id,element.status=='0')}} 
          //       checked={element.status!='0'}
          //       type="checkbox" class="off_1"
          //     />
          //     <span class="switch-button"></span>
          //   </label>
          // </div>,
          <>
          <Link  href={{pathname: '/admin/profile_users' , query: { index: element._id!=null?element._id:null }}}  >
            <FontAwesomeIcon
              style={{
                color: config.primaryColor,
                fontSize:'20px',
                cursor: "pointer"
              }}
              icon={faEye}
            />
          </Link>
          <div class='m-3 d-inline' >
            <Link  href={{pathname: '/admin/transactions' , query: { index: element._id }}}  >
              <FontAwesomeIcon
                style={{
                  color: config.primaryColor,
                  fontSize:'20px',
                  cursor: "pointer"
                }}
                icon={faDollarSign}
                />
            </Link>
          </div>
          </>

      ])
      console.log(subcategories);
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
            Buyers
            </h1>
            <div class="catg_listing">
              <div class="row">
               
                <div class="col-md-12">
                  <div class="card p-3 uk-box-shadow-medium">
                    <div class="bulkrow mb-3">
                    </div>
                    <div class="table-responsive">
                    <MuiThemeProvider theme={this.getMuiTheme()}>
                      <MUIDataTable title={" Buyers List"} data={this.state.subcategories} columns={columns} options={options} />
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
