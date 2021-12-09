import React from "react";
import Header from "../../../components/Home/Head";
import Footer from "../../../components/Home/Footer";
import OrdersHelper from "../../../Helpers/OrdersHelper";
import WorkinghoursHelper from "../../../Helpers/WorkinghoursHelper";
import { connect } from "react-redux";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { faEye,faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import config from '../../../config'
import Link from 'next/link'
import Layout from "../../../components/Dashboard/Layout";

const MUIDataTable = dynamic(() => import('mui-datatables-next'), {
  ssr: false
});

import Router from 'next/router';
var moment = require("moment");
import dynamic from "next/dynamic";
const days = [
  "",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const columns = [{
  name: "Sr#",
  options: {
   filter: false,
   sort: false
  }
 }
 ,{
  name: "Name",
  options: {
   filter: false,
   sort: false
  }
 }
  ,
  {
    name: "Price",
    options: {
     filter: false,
     sort: false
    }
   }
  ,
  {
    name: "Status",
    options: {
     filter: true,
     sort: false
    }
   },{
    name: "Qty",
    options: {
     filter: false,
     sort: false
    }
   }
  ,
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

class ViewSeller extends React.Component {
  state = {
    type:'',
    seats:'',
    from:'',
    to:'',
    day:'',
    servicestimeslote_id:'',
    subCategories:[],
    servicestimeslotes:[],
    assignservices:[],
    message:"",
    assignservice_id:''
    
  };
  componentDidMount = () => {
    this.hendalallOrders()
  };
  hendalStatus=(id)=>{
    switch (id) {
      case '0':
        return 'Pending'
        break;
      case '1':
       return 'Completed'
        break;
      case '2':
       return 'Canceled'
        break;
    
      default:
        break;
    }
   }
  hendalallOrders =async (id) => {
    let orders=[]
    let data={}
    console.log("this.props.user_data");
    // console.log(this.props.user_data.role_id);
    // if (this.props.user_data.role_id=='1') {
    //   data={customer:this.props.user_data._id}
    // } else {
    //   data={seller:this.props.user_data._id}
    // }
    await OrdersHelper.get_all(data).then((resp)=>{
      // console.log(resp);
      for (let i = 0; i < resp.data.data.orders.length; i++) {
        const element = resp.data.data.orders[i];
        if (element.details[0]==undefined) {
          console.log(element);
          
        }
        orders.push([i+1,
          resp.data.data.role_id=='1'? element.details[0].customer.name:element.details[0].seller.name
          ,element.price
          ,this.hendalStatus(element.status)
          ,element.details.length
          , <Link  href={{pathname: '/marketpalce/Orders/order_view/'+ element._id, query: { candidateId: 8432 }}}  >
          <FontAwesomeIcon
            style={{
              color: config.primaryColor,
              fontSize:'20px',
              cursor: "pointer"
            }}
            icon={faEye}
          />
          </Link>
        ])
        console.log(element);
      }
    })  
    
    // console.log(servicestimeslotes);
    this.setState({servicestimeslotes:orders})
    
  };
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

  render() {
    return (
      <>
        <Layout >
        <div class="">
          <div class="container">
            <h1 class="text-2xl leading-none text-gray-900 tracking-tight mt-5">
              Orders
            </h1>
            <div class="catg_listing">
              <div class="row">
                <div class="col-md-12 ">
                  <div class="card p-3 uk-box-shadow-medium mt-5">
                  <div class="col-md-12">
                  <div class="mb-3">
                     
                    </div>

                  </div>
                    <div class="table-responsive">
                    {
                        this.state.servicestimeslotes.length==0?
                        <h1 class="no_data_here" >There is no data to display</h1>
                        :null
                      }
                    <MuiThemeProvider theme={this.getMuiTheme()}>
                      <MUIDataTable title={"Order List"} data={this.state.servicestimeslotes} columns={columns} options={options} />
                    </MuiThemeProvider>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        </Layout>
      </>
    );
  }
}
function mapStateToProps(state, ownProps) {
  return {
    user_data: state.user_data,
    user_workinghours: state.user_workinghours,
  };
}
export default connect(mapStateToProps)(ViewSeller);
