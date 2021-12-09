import React from "react";
import ServicesHelper from "../../../../Helpers/ServicesHelper";
import AuthHelper from "../../../../Helpers/AuthHelper";
import AssignServicesHelper from "../../../../Helpers/AssignServicesHelper";
import ServicesTimeSlotsHelper from "../../../../Helpers/ServicesTimeSlotsHelper";
import dynamic from "next/dynamic";
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
  options: {
   filter: false,
   sort: false
  }
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
      assignservice_id:''

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
      // this.hendalGetAssignServices()
    });
  };
  hendalUpdateAssignServices = (id,condetion) => {
    var data={}
    if (condetion) {
       data={status: "1"}
    } else {
       data={status: "0"}
    }
    AssignServicesHelper.Update(id,data).then((resp) => {
      // this.hendalGetAssignServices()
    });
  };
  hendalServicesTimeSlote =async (id) => {
    let servicestimeslotes=[]
    // alert(this.state.servicestimeslote_id)
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

  render() {
    return (
      <>
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
                                initialValue={new Date()}
                                viewMode="time"
                                dateFormat={false}
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
                                initialValue={new Date()}
                                viewMode="time"
                                dateFormat={false}
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
                      <MUIDataTable title={"Category List"} data={this.state.servicestimeslotes} columns={columns} options={options} />
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
