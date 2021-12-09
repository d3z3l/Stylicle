import React from "react";
import ServicesHelper from "../../../../Helpers/ServicesHelper";
import AuthHelper from "../../../../Helpers/AuthHelper";
import AssignServicesHelper from "../../../../Helpers/AssignServicesHelper";
import ServicesTimeSlotsHelper from "../../../../Helpers/ServicesTimeSlotsHelper";
import { faPencilAlt,faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dynamic from "next/dynamic";
import config from "../../../../config";
import SweetAlert from 'react-bootstrap-sweetalert';
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Datetime from "react-datetime";
var moment = require("moment");
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

const MUIDataTable = dynamic(() => import('mui-datatables-next'), {
  ssr: false
});
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
// const columns = ['Sr#',"Start",'End','Day',"Status"];
const columns = [{
  name: "Sr#",
  options: {filter: false,sort: false}
 }
 ,{
  name: "Start",
  options: {
   filter: false,
   sort: false
  }
 }
  ,
  {
    name: "End",
    options: {
     filter: false,
     sort: false
    }
   }
  ,'Day',
  {
    name: "Status",
    options: {
     filter: false,
     sort: false
    }
   },
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
      assignservice_id:'',
      update_slot_id:'',
      delete_slot_id:'',
      show:false,
      selected:''

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
   
    this.hendalGetAssignServices()
  };
  hendalCreateServicesTimeSlote = () => {
    if (this.state.assignservice_id=='') {
      this.setState({message:'Select any Services'})
      return false
    }
    if (this.state.price=='') {
      this.setState({message:'Select any price'})
      return false
    }
    let data = {
      
    };
    if (this.state.type!='Manual') {
      let data = {
        assignservices: this.state.assignservice_id,
      };
      ServicesTimeSlotsHelper.Create(data).then((resp)=>{
        console.log(resp);
    })
    } else {
       data = {
        start_time: this.state.from,
        end_time: this.state.to,
        day: this.state.day,
        assignservices: this.state.assignservice_id,
      };
      console.log(data);
      ServicesTimeSlotsHelper.Manual(data).then((resp)=>{
          console.log(resp);
      })
    }
    AssignServicesHelper.Create(data).then((resp) => {
      this.setState({message:''})

      toast.success('Success!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      this.hendalServicesTimeSlote(this.state.assignservice_id)

      // this.hendalGetAssignServices()
    });
  };
  hendalUpdateAssignServices = (id,condetion) => {
    // alert(condetion)
    var data={}
    if (condetion) {
       data={status: "1"}
    } else {
       data={status: "0"}
    }
    ServicesTimeSlotsHelper.Update(id,data).then((resp) => {
      this.hendalServicesTimeSlote(this.state.selected)
      toast.success('Success!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      // this.hendalGetAssignServices()
    });
  };
  hendalServicesTimeSlote =async (id) => {
    this.setState({selected:id})
    let servicestimeslotes=[]
    await AssignServicesHelper.Get(id).then((resp)=>{

      for (let i = 0; i < resp.data.data.assignservices[0].service_time_slot.length; i++) {
        const element = resp.data.data.assignservices[0].service_time_slot[i];
        console.log(element);
        servicestimeslotes.push([i+1,
          moment(
            new Date(
              (element.start_time + new Date().getTimezoneOffset() * 60) *
                1000
                   )
          ).format("LT")
          ,moment(
            new Date(
              (element.end_time + new Date().getTimezoneOffset() * 60) *
                1000
            )
          ).format("LT")
          ,days[element.day]
          ,<div class="switch-container">
            <label class="switch">
              <input
              onClick={()=>{this.hendalUpdateAssignServices(element._id,element.status=='0')}} 
                checked={element.status=='0'}
                type="checkbox" class="off_1"
              />
              <span class="switch-button"></span>
            </label>
          </div>
          ,
          <>
            <div class='mx-2 d-inline' >
              <FontAwesomeIcon
              data-toggle="modal"
              data-target="#exampleModalCenter"
              onClick={()=>this.modal(element)}
                style={{
                  color: config.primaryColor,
                  fontSize:'20px',
                  cursor: "pointer"
                }}
                icon={faPencilAlt}
              />
            </div>
            <FontAwesomeIcon
            onClick={()=>this.setState({show:true,delete_service_id:element._id})}
              style={{
                color: config.primaryColor,
                fontSize:'20px',
                cursor: "pointer"
              }}
              icon={faTrash}
            />
          </>

        ])
      }
    })  
    
    console.log(servicestimeslotes);
      this.setState({servicestimeslotes})
    
  };
  hendalGetAssignServices =async () => {
    await AuthHelper.Get().then((resp)=>{
      console.log(resp.data.data.user.assignservices)
      this.setState({assignservices:resp.data.data.user.assignservices})
      
    })  
  };
  hendalDeleteSlot= async (id)=>{
    await ServicesTimeSlotsHelper.Delete(id).then((resp)=>{
      toast.success('Success!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
        this.hendalServicesTimeSlote(this.state.selected)
     });  
     this.setState({show:false})
   }

  modal=(e)=>{    
    this.setState({
      from:e.start_time,
      to:e.end_time,
      day:e.day,
      assignservice_id:e.assignservices,
      update_slot_id:e._id
    })
    $('#exampleModalCenter').show()
  }
  update=()=>{
    let data = {
      start_time: this.state.from,
      end_time: this.state.to,
      day: this.state.day,
    };
    ServicesTimeSlotsHelper.Update(this.state.update_slot_id,data).then((resp) => {

      this.setState({message:''})

      toast.success('Success!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      this.hendalServicesTimeSlote(this.state.selected)

      // this.hendalGetAssignServices()
    });
  }

  render() {
    return (
      <>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            />
        {
          this.state.show?
          <SweetAlert
              // style={ { display: "none", marginTop: "-100px" } }
              warning
              showCancel
              confirmBtnText="Yes, delete it!"
              confirmBtnBsStyle="danger"
              title="Are you sure?"
              onConfirm={()=> this.hendalDeleteSlot(this.state.delete_service_id)}
              onCancel={()=>this.setState({show:false})}
              focusCancelBtn
            >
                  You will not be able to recover this record !
                </SweetAlert>
            :null
        }
        <div
          class="modal"
          id="exampleModalCenter"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered bookingmodal modal-lg" role="document" >
            <div class="modal-content">
              <div class="modal-header">
                {/* <h5 class="modal-title" id="exampleModalCenterTitle">
                  Powered by <img src="images/footerlogo.svg" alt="" />
                </h5> */}
                <button
                  type="button"
                  class="close remort_close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="bookingmodal_2">
                  <h4 >
                    <i class="fas fa-chevron-left mr-2 float-left"></i> Edit Services
                  </h4>
                
                  <hr />
                  <form>
                    <div class="mb-3">
                      <label>Availabel Services</label>
                      <select onChange={(text) => [
                          this.setState({ assignservice_id: text.target.value }),
                        ]} class="form-control selector">
                          <option selected={this.state.assignservice_id==''} value='' disabled >Select Any Services</option>
                        {
                          this.state.assignservices.map((val,index)=>(
                            val.services?<option selected={this.state.assignservice_id==val._id} value={val._id} >{val.services.title}</option>:null
                            
                          ))
                        }
                        {/* {this.state.categories} */}
                      </select>
                      <p class='Primery_color' >{this.state.message}</p>
                    </div>
                    
                            <div class="mb-3">
                              <label>From</label>
                              <Datetime
                                value={new Date((this.state.from-Math.sqrt(new Date().getTimezoneOffset()*new Date().getTimezoneOffset())*60)*1000)}
                                viewMode="time"
                                dateFormat={false}
                                input={false}
                                // onChange={(time) => console.log(time.format())}
                                onChange={(time) => {

                                  
                                  var time1=new Date(time.format()).getTime()/1000;
                                  var time2 =new Date(time.format("YYYY-MM-DD")).getTime()/1000;
                                  let zone= new Date().getTimezoneOffset();
                                  console.log((time1-time2)+(Math.sqrt(zone*zone)*60));
                                  this.state.from=(time1-time2)+(Math.sqrt(zone*zone)*60)
                                  this.setState({from:(time1-time2)+(Math.sqrt(zone*zone)*60)})
                                  // this.hendalfielda()
                                }}
                              />
                            </div>
                            <div class="mb-3">
                              <label>TO</label>
                              <Datetime
                                // id="timepicker"
                                value={new Date((this.state.to-Math.sqrt(new Date().getTimezoneOffset()*new Date().getTimezoneOffset())*60)*1000)}
                                viewMode="time"
                                dateFormat={false}
                                input={false}
                                // onChange={(time) => console.log(time.format())}
                                onChange={(time) => {
                                  var time1=new Date(time.format()).getTime()/1000;
                                  var time2 =new Date(time.format("YYYY-MM-DD")).getTime()/1000;
                                  let zone= new Date().getTimezoneOffset();
                                  console.log((time1-time2)+(Math.sqrt(zone*zone)*60));
                                  this.state.to=(time1-time2)+(Math.sqrt(zone*zone)*60)
                                  this.setState({to:(time1-time2)+(Math.sqrt(zone*zone)*60)})
                                  // this.hendalfielda()
                                }}
                              />
                            </div>
                            <div class="mb-3">
                              <label>Day</label>
                              <select  onChange={(text) => [
                                  this.setState({ day: text.target.value }),
                                ]} class="form-control selector">
                                  <option selected={this.state.day==''} value='' disabled >Select Any Services</option>
                                  <option selected={this.state.day=='1'} value="1">Monday</option>
                                  <option selected={this.state.day=='2'} value="2">Tuesday</option>
                                  <option selected={this.state.day=='3'} value="3">Wednesday</option>
                                  <option selected={this.state.day=='4'} value="4">Thursday</option>
                                  <option selected={this.state.day=='5'} value="5">Friday</option>
                                  <option selected={this.state.day=='6'} value="6">Saturday</option>
                                  <option selected={this.state.day=='7'} value="7">Sunday</option>
                              </select>
                              <p class='Primery_color' >{this.state.message}</p>
                            </div>
                            <a 
                              onClick={this.update} 
                              class="btn button bg-blue-700 btn-info"
                              type="button"
                              data-dismiss="modal"
                              aria-label="Close"
                              >
                              Update
                            </a>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div class="">
          <div class="container">
            <div class="catg_listing">
              <div class="row">
                <div class="col-md-4">
                  <h1>Add new Services</h1>
                  <form>
                  <div class="mb-3">
                      <label>Availabel Services</label>
                      <select onChange={(text) => [
                          this.setState({ assignservice_id: text.target.value }),
                        ]} class="form-control selector">
                          <option selected={this.state.assignservice_id==''} value='' disabled >Select Any Services</option>
                        {
                          this.state.assignservices.map((val,index)=>(
                            val.services?<option value={val._id} >{val.services.title}</option>:null
                            
                          ))
                        }
                        {/* {this.state.categories} */}
                      </select>
                      <p class='Primery_color' >{this.state.message}</p>
                    </div>
                    
                    <div class="mb-3">
                      <label>Type</label>
                      <select onChange={(text) => [
                          this.setState({ type: text.target.value }),
                        ]} class="form-control selector">
                          {/* <option selected={this.state.type==''} value='' disabled >Select Any Services</option> */}
                          <option  value='Manual'  >Manual</option>
                          <option selected={this.state.type==''} value='Automatic'>Automatic</option>
                       
                      </select>
                      <p class='Primery_color' >{this.state.message}</p>
                    </div>
                    
                      {
                        this.state.type=='Manual'?(
                          <>
                            <div class="mb-3">
                              <label>From</label>
                              <Datetime
                                // initialValue={new Date()}
                                viewMode="time"
                                dateFormat={false}
                                input={false}
                                // onChange={(time) => console.log(time.format())}
                                onChange={(time) => {

                                  var time1=new Date(time.format()).getTime()/1000;
                                  var time2 =new Date(time.format("YYYY-MM-DD")).getTime()/1000;
                                  let zone= new Date().getTimezoneOffset();
                                  console.log((time1-time2)+(Math.sqrt(zone*zone)*60));
                                  this.state.from=(time1-time2)+(Math.sqrt(zone*zone)*60)
                                  this.setState({from:(time1-time2)+(Math.sqrt(zone*zone)*60)})
                                  // this.hendalfielda()
                                }}
                              />
                            </div>
                            <div class="mb-3">
                              <label>TO</label>
                              <Datetime
                                // id="timepicker"
                                // initialValue={new Date()}
                                viewMode="time"
                                dateFormat={false}
                                input={false}
                                // onChange={(time) => console.log(time.format())}
                                onChange={(time) => {
                                  var time1=new Date(time.format()).getTime()/1000;
                                  var time2 =new Date(time.format("YYYY-MM-DD")).getTime()/1000;
                                  let zone= new Date().getTimezoneOffset();
                                  console.log((time1-time2)+(Math.sqrt(zone*zone)*60));
                                  this.state.to=(time1-time2)+(Math.sqrt(zone*zone)*60)
                                  this.setState({to:(time1-time2)+(Math.sqrt(zone*zone)*60)})
                                  // this.hendalfielda()
                                }}
                              />
                            </div>
                            <div class="mb-3">
                              <label>Day</label>
                              <select  onChange={(text) => [
                                  this.setState({ day: text.target.value }),
                                ]} class="form-control selector">
                                  <option selected={this.state.day==''} value='' disabled >Select Any Services</option>
                                  <option value="1">Monday</option>
                                  <option value="2">Tuesday</option>
                                  <option value="3">Wednesday</option>
                                  <option value="4">Thursday</option>
                                  <option value="5">Friday</option>
                                  <option value="6">Saturday</option>
                                  <option value="7">Sunday</option>
                              
                              </select>
                              <p class='Primery_color' >{this.state.message}</p>
                            </div>
                          </>
                        ):null
                      }
                    
                    <a onClick={this.hendalCreateServicesTimeSlote} href="#." class="btn button bg-blue-700 btn-info">
                      Assign new Service
                    </a>
                  </form>
                </div>
                <div class="col-md-8">
                  <div class="card p-3 uk-box-shadow-medium">
                  <div class="col-md-8">
                  <div class="mb-3">
                      <label>Assigned Services</label>
                      <select onChange={(text) => this.hendalServicesTimeSlote(text.target.value)}
                       class="form-control">
                          <option  selected={this.state.servicestimeslote_id==''} value='' disabled >Select Any Services</option>
                        {
                          this.state.assignservices.map((val,index)=>(
                            val.services?<option  value={val._id} >{val.services.title}</option>:null
                          ))
                        }
                        {/* {this.state.categories} */}
                      </select>
                      <p class='Primery_color' >{this.state.message}</p>
                    </div>

                  </div>
                    <div class="table-responsive">
                    <MuiThemeProvider theme={this.getMuiTheme()}>
                      <MUIDataTable title={"Time Slots"} data={this.state.servicestimeslotes} columns={columns} options={options} />
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
