import React from "react";
// import Layout from "../../../../components/Dashboard/Layout";
import config from "../../../config";
import Header from "../../../components/Home/Head";
import Footer from "../../../components/Home/Footer";
import Datetime from "react-datetime";
import AuthHelper from "../../../Helpers/AuthHelper";
import FollowersHelper from "../../../Helpers//FollowersHelper";
import ReservationsHelper from "../../../Helpers/ReservationsHelper";
import OrdersHelper from "../../../Helpers/OrdersHelper";
import generalHelper from "../../../Helpers/GeneralHelper";
import { faCar,faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import WorkingHours from "../../../components/Marketpalce/WorkingHours";
import Reservations from "../../../components/Marketpalce/Reservations";
import Services from "../../../components/Marketpalce/Services";
import $ from 'jquery'
import Router from 'next/router';
import DatePicker from "react-mobile-datepicker";
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
const OwlCarousel = dynamic(
  () => {
    return import("react-owl-carousel");
  },
  { ssr: false }
);
class ViewSeller extends React.Component {
  state = {

    seller_id:Router.query.index,
    customer_val:this.props.user_data._id,
    

    time: new Date(),
    isOpen: false,
    min_date: new Date(),
    max_date: new Date(),
    morning: "",
    afternon: "",
    evening: "",
    time_slots: [],
    service_val:'',
    service_price:'',
    service_duration:'',
    service_title:'',
    service_time_slote:'',

    reservations:[],
    Seller_data:null,
    Assign_services:null,
    
  };
  componentDidMount = () => {
    console.log('Router.query', Router.query);
    console.log('Router.query', this.props.user_data);
    this.handleLimit();
    this.hendalReservationsGet();
    this.hendleSellerData(this.state.seller_id);
  };
  hendalReservationCreate = () => {
    for (let i = 0; i < this.state.reservations.length; i++) {
      let element = this.state.reservations[i]
      if (element.time_slot.start_time <= this.state.service_time_slote.start_time &&  element.time_slot.end_time >= this.state.service_time_slote.end_time) {
        alert('error')
        return false
      }
      
    }
     let data={
      seller:this.state.seller_id,
      slots:this.state.service_time_slote,
      service:this.state.service_val,
      price:this.state.service_price,
      date:(new Date().valueOf())/1000,
      status:0
      }
    ReservationsHelper.create(data).then((resp)=>{
      this.hendalReservationsGet()
      // this.setState({reservations:[...this.state.reservations,resp.data.data.details]})
    })
  };
  hendalReservationsGet = () => {
     let data={
      seller:this.state.seller_id
      }
    ReservationsHelper.get(data).then((resp)=>{
      this.setState({reservations:resp.data.data.orders})
    })
  };
  hendalSearch = (e) => {
    var regEx = new RegExp(e.toLowerCase(), "g");
     let data=this.state.Seller_data.assignservices.filter((assignservices) => !!assignservices.services[0].title.toLowerCase().match(regEx))
     this.setState({Assign_services:data})
  };
  hendleSellerData = (id) => {
   AuthHelper.Get_by_id(id).then((resp)=>{
     this.setState({Seller_data:resp.data.data.user,Assign_services:resp.data.data.user.assignservices})
   })
  };
  hendalfollow = (id) => {
    let data={
      followee:Router.query.index
    }
    FollowersHelper.CreateFollower(data).then((resp)=>{
      console.log(resp);
    })
  };
  handleLimit = () => {
    var today = moment();
    var mindate = moment(today).subtract(1, "days");
    var maxdate = moment(today).add(183, "days");
    this.setState({ min_date: mindate.toDate(), max_date: maxdate.toDate() });
  };
  handleSelectDate = (time) => {
    let data = {
      path: "service_time_slots/60ab3a33833b3e059d5a9893",
      type: "POST",
      data: {
        date: time.unix(),
        day: moment(time).day()==0 ?7:moment(time).day(),
        customer: this.state.customer_val,
        services_val: this.state.service_val,
      },
    };
    generalHelper.Get(data).then((resp) => {
      let morning = [];
      let afternon = [];
      let evening = [];
      for (let i = 0; i < resp.data.length; i++) {
        const element = resp.data[i];
        if (element.start_time < 43200) {
          morning.push(
            <li>
              <a onClick={()=>  this.hendalVarifyTime(element)} class={element._id} href="#.">
                {moment(
                  new Date(
                    (element.start_time + new Date().getTimezoneOffset() * 60) *
                      1000
                         )
                ).format("LT")}
              </a>
            </li>
          );
        } else if (element.start_time < 61200) {
          afternon.push(
            <li>
              <a onClick={()=>  this.hendalVarifyTime(element)} class={element._id}   href="#.">
                {moment(
                  new Date(
                    (element.start_time + new Date().getTimezoneOffset() * 60) *
                      1000
                  )
                ).format("LT")}
              </a>
            </li>
          );
        } else {
          evening.push(
            <li>
              <a onClick={()=>  this.hendalVarifyTime(element)}  class={element._id}  href="#.">
                {moment(
                  new Date(
                    (element.start_time + new Date().getTimezoneOffset() * 60) *
                      1000
                  )
                ).format("LT")}
              </a>
            </li>
          );
        }
      }
      this.setState({ morning, afternon, evening });
    });
  };
  hendalVarifyTime = (element) => {
    for (let i = 0; i < this.state.reservations.length; i++) {
      let element2 = this.state.reservations[i]
      if (element2.time_slot.start_time <= element.start_time &&  element2.time_slot.end_time >= element.end_time) {
        alert('error')
        return false
      }
    }
    $('.'+this.state.service_time_slote._id).removeClass('selected_time_slote')
    $('.'+element._id).addClass('selected_time_slote')
    this.setState({service_time_slote:element})
  };
  hendalOrders = (element) => { 
    var price=0
    let details=[]
    for (let i = 0; i < this.state.reservations.length; i++) {
      const element = this.state.reservations[i];
      price+=element.time_slot.assignservices.price
      details.push(element._id)
      console.log(element._id);
    }
    console.log(details);

    let data={
      seller:this.state.seller_id,
      price:price,
      qty:this.state.reservations.length,
      Payment_method:2,
      date:(new Date().valueOf())/1000,
      customer:this.state.customer_val,
      details:details
    }
    OrdersHelper.create(data).then((resp)=>{
      this.setState({reservations:[]})
      // console.log(resp);
    })
  };

  renderInput(props, openCalendar, closeCalendar) {
   
    return (
      <div>
        <input {...props} />
        <button onClick={openCalendar}>open calendar</button>
        <button onClick={closeCalendar}>close calendar</button>
        <button onClick={clear}>clear</button>
      </div>
    );
  }

  render() {
    return (
      <>
      
        <Header />
        <div
          class="modal fade"
          id="exampleModalCenter"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div
            class="modal-dialog modal-dialog-centered bookingmodal modal-lg"
            role="document"
          >
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalCenterTitle">
                  Powered by <img src="images/footerlogo.svg" alt="" />
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="bookingmodal_1" style={{ display: " none" }}>
                  <h4>Select Service</h4>
                  <div class="babrerbox">
                    <h1>{this.state.Seller_data!=null?this.state.Seller_data.name:null}</h1>
                    <p>{this.state.Seller_data!=null?this.state.Seller_data.email:null}</p>
                    <span>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="far fa-star"></i>
                    </span>
                  </div>

                  {
                    //  alert(this.props.user_data.assignservices.length),

                    this.state.Assign_services!=null?(
                      // this.state.Assign_services.length!=0?(
                        this.state.Assign_services.map((val,index)=>(
                        //  alert(index111),
                        console.log(this.state.Assign_services),
                          <Services  onPress={()=> {$('.bookingmodal_2').show(),$('.bookingmodal_1').hide()}} onBook={()=>this.setState({service_val:val._id,service_price:val.price,service_duration:val.duration,service_title:val.services.title,morning:'',afternon:'',evening:''})} title={val.services.title} duration={val.duration} modal_close={'no'} price={val.price} />
                        ))
                      //  ):null
                    ):null
                  }





                </div>
                <div class="bookingmodal_2">
                  <h4 >
                    <i class="fas fa-chevron-left mr-2 float-left"></i> Pick a
                    date & time
                  </h4>
                  <label class="mr-5"> Select Date </label>
                  <Datetime
                    inputProps={{ placeholder: "This is placeholder" }}
                    initialValue={new Date(this.state.start_view * 1000)}
                    viewMode="date"
                    dateFormat="YYYY-MM-DD"
                    timeFormat={false}
                    closeOnSelect={true}
                    utc={true}
                    onChange={this.handleSelectDate}
                  />
                 
                  <hr />
                  <div class="row days">
                    <span class="col">MORNING</span>
                    <span class="col">AFTERNOON</span>
                    <span class="col">EVENING</span>
                  </div>
                  <div class="row days">
                    <div class="col">
                      <ul>{this.state.morning}</ul>
                    </div>
                    <div class="col">
                      <ul>{this.state.afternon}</ul>
                    </div>
                    <div class="col">
                      <ul>{this.state.evening}</ul>
                    </div>
                  </div>
                  <div class="mobileservice pt-4 pb-4 border-0">
                    <div class="closeb">
                      <a href="#.">
                        <i class="fas fa-times"></i>
                      </a>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <h2>{this.state.service_title}</h2>
                        {/* <p>
                          ‼️ Please Read‼️ Effective 1/1/2021 This is a fla...
                        </p> */}
                      </div>
                      <div class="col-md-5  pr-5">
                        <div class="bookbtnrow">
                          <div>
                            <div class="purify">
                            <strong>${this.state.service_price}</strong>
                            </div>
                            <span class="purify_2vd">{this.state.service_duration}min</span>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-1 d-flex justify-content-end">
                        <button
                          onClick={this.hendalReservationCreate}
                          class="btn btn-info"
                        >
                          Book
                        </button>
                      </div>
                      
                    </div>
                    <hr/>
                    <div>
                      <span  onClick={()=> {$('.bookingmodal_2').hide(),$('.bookingmodal_1').show()}} >
                          <FontAwesomeIcon
                            style={{
                              color: config.primaryColor,
                              fontSize:'20px',
                              cursor: "pointer"
                            }}
                            icon={faPlus}
                          />
                        </span>
                        <label class="p-3" >add more</label>
                    </div>
                    {
                      this.state.reservations.map((val,index)=>(
                        console.log(val.time_slot.assignservices.services),
                        // alert(val.time_slot.assignservices.services[0].title),
                          <Reservations title={val.time_slot.assignservices.services.title}  start_time={val.time_slot.start_time} end_time={val.time_slot.end_time} price={val.time_slot.assignservices.price} />

                      ))
                    }

                  </div>
                  <a onClick={this.hendalOrders} href="#." class="btn btn-info btn-block btn-lg">
                    CONFRIME
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="maincontent">
          <div class="profile_wrepp">
            <div class="container">
              <div class="row">
                <div class="col-md-8">
                  <div class="catg_slider mb-5">
                    {/* <div class="owl-five owl-carousel owl-theme"> */}
                    <OwlCarousel
                      className="owl-theme "
                      items={1}
                      loop={true}
                      autoplay={true}
                      dots={false}
                      margin={10}
                    >
                      <div class="item">
                        <a href="#.">
                          <div class="ctgsldimg">
                            <img src="/images/fg-05.png" alt="" />
                            <p>
                              5.0 <span>240 Reviews</span>
                            </p>
                            <p class="recomnned">
                              <i
                                class="fas fa-thumbs-up"
                                aria-hidden="true"
                              ></i>{" "}
                              stylicle recommended
                            </p>
                          </div>
                        </a>
                      </div>
                      <div class="item">
                        <a href="#.">
                          <div class="ctgsldimg">
                            <img src="/images/fg-05.png" alt="" />
                            <p>
                              5.0 <span>240 Reviews</span>
                            </p>
                            <p class="recomnned">
                              <i
                                class="fas fa-thumbs-up"
                                aria-hidden="true"
                              ></i>{" "}
                              stylicle recommended
                            </p>
                          </div>
                        </a>
                      </div>
                      <div class="item">
                        <a href="#.">
                          <div class="ctgsldimg">
                            <img src="/images/fg-05.png" alt="" />
                            <p>
                              5.0 <span>240 Reviews</span>
                            </p>
                            <p class="recomnned">
                              <i
                                class="fas fa-thumbs-up"
                                aria-hidden="true"
                              ></i>{" "}
                              stylicle recommended
                            </p>
                          </div>
                        </a>
                      </div>
                    </OwlCarousel>
                    {/* </div> */}
                  </div>
                  <div class="babrerbox">
                    <h2>
                      <FontAwesomeIcon
                        style={{
                          color: config.primaryColor,
                        }}
                        icon={faCar}
                      />
                      <i class="fas fa-car"></i> Traveling service{" "}
                    </h2>
                    <div class='row' >
                      <div class="col-10" ><h1>{this.state.Seller_data!=null?this.state.Seller_data.name:null}</h1></div>
                      <div class="col" >
                        <div class="col-2">
                          <h1>
                            <a  onClick={this.hendalfollow} class="btn btn-info">
                              Follow
                            </a>
                          </h1>
                        </div>
                      </div>
                    </div>
                    
                    <p>{this.state.Seller_data!=null?this.state.Seller_data.email:null}</p>
                    <span>
                      <i class="far fa-heart"></i>
                    </span>
                  </div>



                  <div class="barbersearch">
          <div class="row">
            <div class="col-md-6">
              <h1>Services</h1>
            </div>
            <div class="col-md-6">
              <input
              onChange={(e)=>this.hendalSearch(e.target.value)}
                type="text"
                class="form-control"
                placeholder="Search for services"
              />
            </div>
          </div>
        </div>
        <div id="accordion" class="accordion">
          <div class="mb-0">
            
          {
            //  alert(this.props.user_data.assignservices.length),

            this.state.Assign_services!=null?(
              // this.state.Assign_services.length!=0?(
                this.state.Assign_services.map((val,index)=>(
                //  alert(index),
                
                  <Services onBook={()=>this.setState({service_val:val._id,service_price:val.price,service_duration:val.duration,service_title:val.services.title,morning:'',afternon:'',evening:''})} title={val.services.title} duration={val.duration} price={val.price} />
                ))
              //  ):null
            ):null

          
            
          }
                  {/* <Services/> */}







                  
       
       
          
                  
          </div>
        </div>
        <div class="venue_box">
          <h1>Venue Health and Safety Rules</h1>
          <ul>
            <li>
              <i class="fas fa-shield-alt"></i> Employees wear masks
            </li>
            <li>
              <i class="fas fa-shield-alt"></i> Disinfection of all surfaces in
              the workplace
            </li>
            <li>
              <i class="fas fa-shield-alt"></i> Disinfection between clients
            </li>
            <li>
              <i class="fas fa-shield-alt"></i> Maintain social distancing
            </li>
            <li>
              <i class="fas fa-shield-alt"></i> Barbicide COVID-19 Certified
            </li>
            <li>
              <i class="fas fa-shield-alt"></i> Place to wash hands available
            </li>
          </ul>
        </div>



                
                
                



                
                  <div class="venue_box">
                    <h1>See Our Work</h1>
                    <div class="row">
                      <div class="col-md-6">
                        <img class="mb-3" src="/images/img.jpeg" alt="" />
                      </div>
                      <div class="col-md-6">
                        <div class="row">
                          <div class="col-sm-6">
                            <img class="mb-4" src="/images/img.jpeg" alt="" />
                          </div>
                          <div class="col-sm-6">
                            <img class="mb-4" src="/images/img.jpeg" alt="" />
                          </div>
                          <div class="col-sm-6">
                            <img class="mb-4" src="/images/img.jpeg" alt="" />
                          </div>
                          <div class="col-sm-6">
                            <img class="mb-4" src="/images/img.jpeg" alt="" />
                          </div>
                        </div>
                      </div>
                      <a
                        href="#."
                        class="btn btn-outline-info btn-block btn-lg"
                      >
                        See All
                      </a>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="barberright">
                    <div class="map">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d13606.813007965276!2d74.3235535!3d31.50483955!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1623046095247!5m2!1sen!2s"
                        width="100%"
                        height="250"
                        style={{ border: "0" }}
                        allowfullscreen=""
                        loading="lazy"
                      ></iframe>
                    </div>
                    <div class="p-3">
                      <h1>About Us</h1>
                      <p>
                        In convallis eget sapien vel tincidunt. Sed a massa id
                        nunc facilisis viverra. Nam scelerisque lorem venenatis
                        lacus sollicitudin, eget porttitor sem gravida. Aliquam
                        nec neque eu velit faucibus vulputate ut pretium quam.
                        Fusce non ultrices massa.
                      </p>
                    </div>
                    <div class="p-3">
                      <h1 class="border-bottom pb-3">
                        Contact & Business hours
                      </h1>
                      <div class="mobileservice">
                        <div class="row">
                          <div class="col-md-6">
                            <p>
                              <i class="fas fa-mobile-alt mr-2 mt-3"></i> {this.state.Seller_data!=null?this.state.Seller_data.phone:null}
                            </p>
                          </div>
                          <div class="col-md-6">
                            <div class="bookbtnrow">
                              <div class="purify_3kC">
                                <a href={ this.state.Seller_data!=null?'tel:'+this.state.Seller_data.phone:null}  class="btn btn-info">
                                  Call
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                        {
                          this.state.Seller_data!=null?(
                            this.state.Seller_data.workinghours.length!=0?(<WorkingHours  WorkingHours={this.state.Seller_data.workinghours} />):null
                          ):null
                        }

                    </div>
                    <div class="p-3">
                      <h1>Social Media & Share</h1>
                      <ul>
                        <li>
                          <a href="#.">
                            <i class="fab fa-twitter" aria-hidden="true"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#.">
                            <i class="fab fa-facebook" aria-hidden="true"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#.">
                            <i
                              class="fab fa-linkedin-in"
                              aria-hidden="true"
                            ></i>
                          </a>
                        </li>
                        <li>
                          <a href="#.">
                            <i class="fab fa-pinterest" aria-hidden="true"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#.">
                            <i class="fab fa-instagram" aria-hidden="true"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div class="p-3">
                      <p class="pt-3 pb-3 border-top border-bottom">
                        <a href="#.">
                          Payment & Cancellation Policy{" "}
                          <span class="float-right">
                            <i class="fas fa-chevron-right"></i>
                          </span>
                        </a>
                      </p>
                      <p class="pt-2">
                        <a href="#.">
                          Payment & Cancellation Policy{" "}
                          <span class="float-right">
                            <i class="fas fa-chevron-right"></i>
                          </span>
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
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
