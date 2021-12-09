import React from "react";
import Layout from "../../../components/Dashboard/Layout_admin";
import AuthHelper from "../../../Helpers/AuthHelper";
import TransactionHelper from "../../../Helpers/TransactionHelper";

import Router from 'next/router';
import config from "../../../config";
import { faHeart,faComment ,faDollarSign} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dynamic from "next/dynamic";
var moment = require("moment");
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Map from "../../../components/Dashboard/Settings/Profile/map";
const MUIDataTable = dynamic(() => import('mui-datatables-next'), {
    ssr: false
  });

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
  
export default class Login extends React.Component {
    state = {
        seller_id:'',
        subcategories:[],

    }
    componentDidMount = () => {
        console.log('Router.query', Router.query.index);
        setTimeout(() => {
            this.hendalTransaction(Router.query.index)
            this.hendleSellerData(Router.query.index);
        }, 500);

    };
    hendalTransaction = (id) => {
        let subcategories=[]
        let data= {_id:id}
        TransactionHelper.get_by_users(data).then((resp) => {
          console.log(34343434);
          console.log(resp);
          for (let i = 0; i < resp.data.data.transaction.length; i++) {
            const element = resp.data.data.transaction[i];
            subcategories.push([i+1,
              element.sender ?element.sender.name:null,
              <a>
                { element.receiver!=undefined ?element.receiver.name:'NaN' }     
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
          this.setState({transactions:subcategories})
        });
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
    hendleSellerData = (id) => {
        AuthHelper.Get_by_id(id).then((resp)=>{
        console.log(resp)
        this.setState({Seller_data:resp.data.data.user,Assign_services:resp.data.data.user.assignservices})
        })
    };

  render() {
    return (
      <>
        <Layout>
        <div class="container pro-container my-5">
                <div class="flex lg:flex-row flex-col items-center lg:py-8 lg:space-x-8">
                    <div>
                        <div class="bg-gradient-to-tr from-yellow-600 to-pink-600 p-1 rounded-full m-0.5 mr-2  w-56 h-56 relative overflow-hidden uk-transition-toggle">  
                            {
                              this.state.Seller_data!=null?
                                <img src={config.image_url + this.state.Seller_data.image} class="bg-gray-200 border-4 border-white rounded-full w-full h-full dark:border-gray-900"/>
                              :null
                            }

                            <div class="absolute -bottom-3 custom-overly1 flex justify-center pt-4 pb-7 space-x-3 text-2xl text-white uk-transition-slide-bottom-medium w-full">
                                <a href="#" class="hover:text-white">
                                    <i class="uil-camera"></i>
                                </a>
                                <a href="#" class="hover:text-white">
                                    <i class="uil-crop-alt"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="my-6 grid lg:grid-cols-2 grid-cols-2 gap-1.5  uk-link-reset" >
                        <div class="lg:w/8/12 flex-1 flex flex-col lg:items-start items-center"> 
                            <h2 class="font-semibold lg:text-2xl text-lg "> {this.state.Seller_data!=null?  this.state.Seller_data.personal_title+" "+this.state.Seller_data.name:null}</h2>
                            <p class="lg:text-left mb-2 text-center  dark:text-gray-100"> {this.state.Seller_data!=null?this.state.Seller_data.p_phone:null}</p>
                            <p class="lg:text-left mb-2 text-center  dark:text-gray-100"> {this.state.Seller_data!=null?this.state.Seller_data.p_address:null}</p>
                        </div>
                        
                    </div>
                </div>
                
                <MuiThemeProvider theme={this.getMuiTheme()}>
                      <MUIDataTable title={" Transactions List"} data={this.state.transactions} columns={columns} options={options} />
                    </MuiThemeProvider>
                <div class="my-6 grid lg:grid-cols-4 grid-cols-2 gap-1.5 hover:text-yellow-700 uk-link-reset">
                    {
                        this.state.Seller_data!=null?(
                            this.state.Seller_data.newsfeedsPosts.length!=0?
                                this.state.Seller_data.newsfeedsPosts.map((val,index)=>(
                                
                                <div>
                                    <div class="bg-red-500 max-w-full lg:h-64 h-40 rounded-md relative overflow-hidden uk-transition-toggle" tabindex="0"> 
                                        <img  src={config.image_url + val.media } class="w-full h-full absolute object-cover inset-0"/>

                                        <div class="absolute bg-black bg-opacity-40 bottom-0 flex h-full items-center justify-center space-x-5 text-lg text-white uk-transition-scale-up w-full">   
                                            <a href="#story-modal" uk-toggle class="flex items-center"> 
                                            <FontAwesomeIcon
                                                data-toggle="modal"
                                                data-target="#exampleModalCenter"
                                                style={{
                                                    color: 'white',
                                                    fontSize:'16px',
                                                    cursor: "pointer",
                                                }}
                                                icon={faHeart}
                                            />
                                            <p class='px-2'>
                                            {val.likes}   
                                            </p>
                                            </a>
                                            <a href="#story-modal" uk-toggle class="flex items-center"> 
                                            <FontAwesomeIcon
                                            data-toggle="modal"
                                            data-target="#exampleModalCenter"
                                            style={{
                                                color: 'white',
                                                fontSize:'16px',
                                                cursor: "pointer"
                                            }}
                                            icon={faComment}
                                            />
                                            <p class='px-2'>
                                            {val.commentsDeatils.length}
                                            </p>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                               
                                ))
                            :
                                <div class="bg-gray-100 border-4 border-dashed flex flex-col h-full items-center justify-center relative rounded-2xl w-full"> 
                                    <span> There is no data to display </span>
                                </div>
                        ):null 
                    }
                </div>
            </div>
        </Layout>
      </>
    );
  }
}
