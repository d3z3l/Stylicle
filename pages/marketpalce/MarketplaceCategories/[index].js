import React from "react";
// import Layout from "../../../../components/Dashboard/Layout";
import config from "../../../config";
import Header from "../../../components/Home/Head";
import Footer from "../../../components/Home/Footer";
import Datetime from "react-datetime";
import AuthHelper from "../../../Helpers/AuthHelper";
import TransactionHelper from "../../../Helpers/TransactionHelper";
import FollowersHelper from "../../../Helpers//FollowersHelper";
import ReservationsHelper from "../../../Helpers/ReservationsHelper";
import OrdersHelper from "../../../Helpers/OrdersHelper";
import generalHelper from "../../../Helpers/GeneralHelper";
import {
  faCar,
  faPlus,
  faStar,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import WorkingHours from "../../../components/Marketpalce/WorkingHours";
import Reservations from "../../../components/Marketpalce/Reservations";
import Services from "../../../components/Marketpalce/Services";
import $ from "jquery";
import Router from "next/router";
import cookie from "react-cookies";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

// import Router from 'next/router';
import DatePicker from "react-mobile-datepicker";
var moment = require("moment");
import dynamic from "next/dynamic";

import {
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  HatenaIcon,
  InstapaperIcon,
  LineIcon,
  LinkedinIcon,
  LivejournalIcon,
  MailruIcon,
  OKIcon,
  PinterestIcon,
  PocketIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  ViberIcon,
  VKIcon,
  WeiboIcon,
  WhatsappIcon,
  FacebookShareButton,
  FacebookShareCount,
  TwitterShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  TelegramShareButton,
} from "react-share";

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
// const Router = dynamic(
//   () => {
//     return import("next/router");
//   },
//   { ssr: false }
// );
const OwlCarousel = dynamic(
  () => {
    return import("react-owl-carousel");
  },
  { ssr: false }
);
class ViewSeller extends React.Component {
  state = {
    seller_id: "",
    customer_val: this.props.user_data._id,
    time: new Date(),
    isOpen: false,
    min_date: new Date(),
    max_date: new Date(),
    morning: "",
    afternon: "",
    evening: "",
    time_slots: [],
    service_val: "",
    service_price: "",
    service_duration: "",
    service_title: "",
    service_time_slote: "",
    follower_check: false,
    date_in_unix: 0,

    login_status: "",
    reservations: [],
    Seller_data: null,
    Assign_services: null,
  };
  componentDidMount = () => {
    setTimeout(() => {
      const myArr = Router.router.asPath.split("/");
      console.log(Router.query);
      this.followervarify(Router.query.index);
      this.hendleSellerData(Router.query.index);
      this.setState({ seller_id: Router.query.index });
      this.hendalReservationsGet(Router.query.index);
    }, 500);
    // if (Router.query.index!=undefined) {
    //   cookie.save('Seller', Router.query.index , { path: '/' })
    //   this.hendleSellerData(Router.query.index);
    //   this.setState({seller_id:Router.query.index})
    //   this.hendalReservationsGet(Router.query.index);
    // }else{
    //   if (cookie.load('Seller')!=undefined) {

    //     console.log('333333');
    //     this.hendleSellerData(cookie.load('Seller'));
    //     this.setState({seller_id:cookie.load('Seller')})
    //     this.hendalReservationsGet(cookie.load('Seller'));
    //   }
    //   console.log('44444444');
    //   this.hendleSellerData(myArr[3]);
    //   this.setState({seller_id:myArr[3]})
    //   this.hendalReservationsGet(myArr[3]);
    // }
    this.loginvarify();
    this.handleLimit();
  };
  hendalReservationCreate = () => {
    if (this.state.service_time_slote == "") {
      toast.error("Error! please select any time slot", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return false;
    }
    for (let i = 0; i < this.state.reservations.length; i++) {
      let element = this.state.reservations[i];
      if (
        element.time_slot.start_time <=
          this.state.service_time_slote.start_time &&
        element.time_slot.end_time >= this.state.service_time_slote.end_time
      ) {
        return false;
      }
    }
    let data = {
      seller: this.state.seller_id,
      slots: this.state.service_time_slote,
      service: this.state.service_val,
      price: this.state.service_price,
      date: this.state.date_in_unix,
      status: 0,
    };
    ReservationsHelper.create(data).then((resp) => {
      this.hendalReservationsGet(this.state.seller_id);
      // this.setState({reservations:[...this.state.reservations,resp.data.data.details]})
    });
  };
  hendalReservationsGet = (id) => {
    let data = {
      seller: id,
    };
    ReservationsHelper.get(data).then((resp) => {
      this.setState({ reservations: resp.data.data.orders });
    });
  };
  hendalSearch = (e) => {
    var regEx = new RegExp(e.toLowerCase(), "g");
    console.log(111111111);
    //  let data=this.state.Seller_data.assignservices.filter((assignservices) => !!assignservices.services.title.toLowerCase().match(regEx))
    let data = this.state.Seller_data.assignservices.filter((assignservices) =>
      assignservices.services
        ? !!assignservices.services.title.toLowerCase().match(regEx)
        : false
    );
    console.log(22222);

    this.setState({ Assign_services: data });
  };
  hendleSellerData = (id) => {
    AuthHelper.Get_by_id(id).then((resp) => {
      console.log(resp);
      console.log(123123123);
      this.setState({
        Seller_data: resp.data.data.user,
        Assign_services: resp.data.data.user.assignservices,
      });
    });
  };
  hendalfollow = (id) => {
    let data = {
      followee: this.state.seller_id,
    };
    FollowersHelper.CreateFollower(data).then((resp) => {
      this.setState({ follower_check: true });
    });
  };
  hendalunfollow = (id) => {
    let data = {
      followee: this.state.seller_id,
    };
    FollowersHelper.Unfollow(data).then((resp) => {
      console.log(resp);
      this.setState({ follower_check: false });
    });
  };
  followervarify = (id) => {
    // alert(id)
    let data = {
      followee: id,
    };
    FollowersHelper.Followersvarify(data).then((resp) => {
      // alert(resp.data.data)
      // console.log(resp.data.data);
      this.setState({ follower_check: resp.data.data });
    });
  };
  handleLimit = () => {
    var today = moment();
    var mindate = moment(today).subtract(1, "days");
    var maxdate = moment(today).add(183, "days");
    this.setState({ min_date: mindate.toDate(), max_date: maxdate.toDate() });
  };
  handleSelectDate = (time) => {
    if (this.state.login_status == "unauthorize") {
      toast.error("Error! please please login", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // return false;
      return (
        $(".remort_close").click(),
        setTimeout(() => {
          $(".remort_close").click();
          $(".remort_close").click();
          Router.push("/auth/login");
        }, 500)
      );
      // return Router.push("/auth/login");
    }
    console.warn(time.unix(), "time test");
    console.warn(time, "time test");
    this.setState({ date_in_unix: time.unix() });
    let data = {
      path: "service_time_slots/60ab3a33833b3e059d5a9893",
      type: "POST",
      data: {
        date: time.unix(),
        day: moment(time).day() == 0 ? 7 : moment(time).day(),
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
              <a
                onClick={() => this.hendalVarifyTime(element)}
                class={element._id}
                href="#."
              >
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
              <a
                onClick={() => this.hendalVarifyTime(element)}
                class={element._id}
                href="#."
              >
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
              <a
                onClick={() => this.hendalVarifyTime(element)}
                class={element._id}
                href="#."
              >
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
      let element2 = this.state.reservations[i];
      if (
        element2.time_slot.start_time <= element.start_time &&
        element2.time_slot.end_time >= element.end_time
      ) {
        return false;
      }
    }
    $("." + this.state.service_time_slote._id).removeClass(
      "selected_time_slote"
    );
    $("." + element._id).addClass("selected_time_slote");
    this.setState({ service_time_slote: element });
  };
  hendalOrders = (element) => {
    var price = 0;
    let details = [];
    for (let i = 0; i < this.state.reservations.length; i++) {
      const element = this.state.reservations[i];
      price += element.time_slot.assignservices.price;
      details.push(element._id);
      console.log(element._id);
    }
    console.log(details);

    let data = {
      seller: this.state.seller_id,
      price: price,
      qty: this.state.reservations.length,
      Payment_method: 2,
      date: new Date().valueOf() / 1000,
      customer: this.state.customer_val,
      details: details,
    };
    OrdersHelper.create(data).then((resp) => {
      let data2 = {
        amount: price,
        date: new Date().valueOf() / 1000,
        sender: this.state.customer_val,
        receiver: this.state.seller_id,
        method: "wallet",
      };
      TransactionHelper.create(data2).then((resp) => {
        console.log(resp);
        alert(33344455678);
      });
      this.setState({ reservations: [] });
      $(".remort_close").click();
    });
  };

  loginvarify = () => {
    // alert(33)
    AuthHelper.Varification().then((data) => {
      // console.log(data.status);
      // if (data.status=='unauthorize') {
      this.setState({ login_status: data.status });
      console.log(
        data.status,
        "data.status data.status data.status data.status data.status data.status data.status data.status data.status data.status data.status "
      );
      // }else{
      //   return (<p>ooooo</p>);
      // }
    });
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

  hendalCheckout = () => {
    if (this.state.reservations.length < 1) {
      toast.error("Error! book at least one service", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return false;
    }
    $(".remort_close").click();
    Router.push("/marketpalce/Checkout/" + this.state.seller_id);
  };
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
                  class="close remort_close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="bookingmodal_1" style={{ display: " none" }}>
                  <h4>Select Service</h4>
                  <div class="babrerbox mb-0">
                    <h1>
                      {this.state.Seller_data != null
                        ? this.state.Seller_data.name
                        : null}
                    </h1>
                    <p>
                      {this.state.Seller_data != null
                        ? this.state.Seller_data.email
                        : null}
                    </p>
                    <span>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="far fa-star"></i>
                    </span>
                  </div>

                  {this.state.Assign_services != null
                    ? // this.state.Assign_services.length!=0?(
                      this.state.Assign_services.map(
                        (val, index) => (
                          console.log(val),
                          val.services != undefined ? (
                            <Services
                              onPress={() => {
                                $(".bookingmodal_2").show(),
                                  $(".bookingmodal_1").hide();
                              }}
                              onBook={() =>
                                this.setState({
                                  service_val: val._id,
                                  service_price: val.price,
                                  service_duration: val.duration,
                                  service_title: val.services.title,
                                  morning: "",
                                  afternon: "",
                                  evening: "",
                                })
                              }
                              title={val.services.title}
                              disc={val.disc}
                              duration={val.duration}
                              modal_close={"no"}
                              price={val.price}
                            />
                          ) : null
                        )
                      )
                    : //  ):null
                      null}
                </div>
                <div class="bookingmodal_2">
                  <h4>
                    <i class="fas fa-chevron-left mr-2 float-left"></i> Pick a
                    date & time
                  </h4>
                  <label class="mr-5"> Select Date DD</label>
                  <Datetime
                    inputProps={{ placeholder: "Select Date" }}
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
                            <span class="purify_2vd">
                              {this.state.service_duration}min
                            </span>
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
                    <hr />
                    <div>
                      <span
                        onClick={() => {
                          $(".bookingmodal_2").hide(),
                            $(".bookingmodal_1").show();
                        }}
                      >
                        <FontAwesomeIcon
                          style={{
                            color: config.primaryColor,
                            fontSize: "20px",
                            cursor: "pointer",
                          }}
                          icon={faPlus}
                        />
                      </span>
                      <label
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          $(".bookingmodal_2").hide(),
                            $(".bookingmodal_1").show();
                        }}
                        class="p-3"
                      >
                        add more
                      </label>
                    </div>
                    {this.state.reservations.map(
                      (val, index) => (
                        console.log(val.time_slot.assignservices.services),
                        (
                          <Reservations
                            title={val.time_slot.assignservices.services.title}
                            start_time={val.time_slot.start_time}
                            end_time={val.time_slot.end_time}
                            price={val.time_slot.assignservices.price}
                          />
                        )
                      )
                    )}
                  </div>
                  {this.state.login_status == "unauthorize" ? (
                    <a href="#." class="btn  btn-block btn-secondary btn-lg">
                      CONFIRM
                    </a>
                  ) : (
                    <a
                      onClick={this.hendalCheckout}
                      href="#."
                      class="btn btn-info btn-block btn-lg"
                    >
                      CONFIRM
                    </a>
                  )}
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
                    {/* <OwlCarousel
                      className="owl-theme "
                      items={1}
                      loop={true}
                      autoplay={true}
                      dots={false}
                      margin={10}
                    > */}
                    <div class="item">
                      <a href="#.">
                        <div class="ctgsldimg_full">
                          {this.state.Seller_data != null ? (
                            <img
                              src={
                                config.image_url +
                                this.state.Seller_data.banner_image
                              }
                              alt=""
                            />
                          ) : null}
                          {/* <p>
                              5.0 <span>240 Reviews</span>
                            </p> */}
                        </div>
                      </a>
                    </div>

                    {/* </OwlCarousel> */}
                    {/* </div> */}
                  </div>
                  <div class="babrerbox">
                    <div class="row">
                      <div class="col-10">
                        <h1 class="m-0">
                          {this.state.Seller_data != null
                            ? this.state.Seller_data.name
                            : null}
                        </h1>
                        <p>
                          {this.state.Seller_data != null
                            ? this.state.Seller_data.email
                            : null}
                        </p>
                      </div>
                      <div class="col-2">
                        <h1 class="bpf-btn">
                          {this.state.login_status ==
                          "unauthorize" ? null : this.state.follower_check ==
                            true ? (
                            <a
                              onClick={this.hendalunfollow}
                              class="btn btn-info"
                            >
                              Unfollow
                            </a>
                          ) : (
                            <a onClick={this.hendalfollow} class="btn btn-info">
                              Follow
                            </a>
                          )}
                          {/* {
                              this.state.follower_check==true?
                                <a onClick={this.hendalunfollow}  class="btn btn-info">
                                  Unfollow
                                </a>
                              :
                                <a  onClick={this.hendalfollow} class="btn btn-info">
                                  Follow
                                </a>
                            } */}
                        </h1>
                      </div>
                    </div>

                    <span>
                      <i class="far fa-heart"></i>
                    </span>
                  </div>

                  <div class="barbersearch">
                    <div class="row">
                      <div class="col-md-8">
                        <h1>Services</h1>
                      </div>
                      <div class="col-md-4">
                        <input
                          onChange={(e) => this.hendalSearch(e.target.value)}
                          type="text"
                          class="form-control"
                          placeholder="Search for services"
                        />
                      </div>
                    </div>
                  </div>
                  <div id="accordion" class="accordion">
                    <div class="mb-0">
                      {this.state.Assign_services != null
                        ? // this.state.Assign_services.length!=0?(
                          this.state.Assign_services.map((val, index) =>
                            val.services != undefined ? (
                              <>
                                {console.log(5555555555555555)}
                                {console.log(val.services)}
                                <Services
                                  onBook={() =>
                                    this.setState({
                                      service_val: val._id,
                                      service_price: val.price,
                                      service_duration: val.duration,
                                      service_title: val.services.title,
                                      morning: "",
                                      afternon: "",
                                      evening: "",
                                    })
                                  }
                                  title={val.services.title}
                                  disc={val.disc}
                                  duration={val.duration}
                                  price={val.price}
                                />
                              </>
                            ) : null
                          )
                        : //  ):null
                          null}
                      {/* <Services/> */}
                    </div>
                  </div>

                  <div class="venue_box">
                    <h1>See Our Work</h1>
                    <div class="row">
                      {this.state.Seller_data != null &&
                      this.state.Seller_data.newsfeedsPosts.length != 0 ? (
                        <div class="col-md-6">
                          <img
                            class="mb-3"
                            src={
                              config.image_url +
                              this.state.Seller_data.newsfeedsPosts[0].media
                            }
                            alt=""
                          />
                        </div>
                      ) : null}

                      <div class="col-md-6">
                        <div class="row">
                          {this.state.Seller_data != null
                            ? this.state.Seller_data.newsfeedsPosts.map(
                                (val, index) =>
                                  index != 0 ? (
                                    <div class="col-sm-6">
                                      <img
                                        style={{
                                          width: "100%",
                                          "max-height": "500px",
                                        }}
                                        class="mb-4"
                                        src={config.image_url + val.media}
                                        alt=""
                                      />
                                    </div>
                                  ) : null
                              )
                            : null}
                        </div>
                      </div>
                      <Link
                        href={{
                          pathname: "/dashboard/profile",
                          query: {
                            index:
                              this.state.Seller_data != null
                                ? this.state.Seller_data._id
                                : null,
                          },
                        }}
                      >
                        <a
                          href="#"
                          class="btn btn-outline-info btn-block btn-lg"
                        >
                          See All
                        </a>
                      </Link>
                    </div>
                  </div>
                  {this.state.Seller_data != null
                    ? (console.log(this.state.Seller_data),
                      console.log("sikandar ali"),
                      this.state.Seller_data.reviews.map((val, index) => (
                        <div class="commentrow">
                          <div class="row">
                            <div class="col-md-6">
                              <div class="stars">
                                <FontAwesomeIcon
                                  style={{
                                    color: "#FBC02D",
                                    fontSize: "15px",
                                    cursor: "pointer",
                                  }}
                                  icon={faStar}
                                />
                                <FontAwesomeIcon
                                  style={{
                                    color: "#FBC02D",
                                    fontSize: "15px",
                                    cursor: "pointer",
                                  }}
                                  icon={faStar}
                                />
                                <FontAwesomeIcon
                                  style={{
                                    color: "#FBC02D",
                                    fontSize: "15px",
                                    cursor: "pointer",
                                  }}
                                  icon={faStar}
                                />
                                <FontAwesomeIcon
                                  style={{
                                    color: "#FBC02D",
                                    fontSize: "15px",
                                    cursor: "pointer",
                                  }}
                                  icon={faStar}
                                />
                                <FontAwesomeIcon
                                  style={{
                                    color: "#FBC02D",
                                    fontSize: "15px",
                                    cursor: "pointer",
                                  }}
                                  icon={faStar}
                                />
                              </div>
                              <p class="ctgnam">
                                {
                                  // console.log(val.orders.details),
                                  val.orders.details.map(
                                    (val2, index2) =>
                                      val2.assignservices.services.title + "  "
                                  )
                                }
                                <br />
                                <span>by {this.state.Seller_data.name}</span>
                              </p>
                            </div>
                            <div class="col-md-6">
                              <p class="outhernam">
                                {val.clint_name + " "}
                                <FontAwesomeIcon
                                  style={{
                                    color: config.primaryColor,
                                    fontSize: "15px",
                                    cursor: "pointer",
                                  }}
                                  icon={faCheckCircle}
                                />
                                <i class="fas fa-check-circle"></i>
                              </p>
                            </div>
                          </div>
                          <p class="comnttxt m-2">{val.review}</p>
                        </div>
                      )))
                    : null}
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
                        {this.state.Seller_data != null
                          ? this.state.Seller_data.disc
                          : null}
                      </p>
                    </div>
                    <div class="p-3">
                      <h1 class="border-bottom pb-3 mb-0">
                        Contact & Business hours
                      </h1>
                      <div class="mobileservice">
                        <div class="row">
                          <div class="col-md-6">
                            <p class="bpp-text">
                              Phone:
                              <strong>
                                {" "}
                                {this.state.Seller_data != null
                                  ? this.state.Seller_data.phone
                                  : null}
                              </strong>
                            </p>
                          </div>
                          <div class="col-md-6">
                            <div class="bookbtnrow">
                              <div class="purify_3kC">
                                <a
                                  href={
                                    this.state.Seller_data != null
                                      ? "tel:" + this.state.Seller_data.phone
                                      : null
                                  }
                                  class="btn btn-info"
                                >
                                  Call
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {this.state.Seller_data != null ? (
                        this.state.Seller_data.workinghours.length != 0 ? (
                          <WorkingHours
                            WorkingHours={this.state.Seller_data.workinghours}
                          />
                        ) : null
                      ) : null}
                    </div>
                    <div class="p-3">
                      <h1 class="border-bottom pb-3">Social Media & Share</h1>
                      <ul>
                        <li>
                          <TwitterShareButton
                            url={"https://www.npmjs.com/package/react-share"}
                            title={"Twitter"}
                            className="Demo__some-network__share-button"
                          >
                            <TwitterIcon size={32} round />
                          </TwitterShareButton>
                        </li>
                        <li>
                          <FacebookShareButton
                            url={"https://www.npmjs.com/package/react-share"}
                            quote={"facebook"}
                            className="Demo__some-network__share-button"
                          >
                            <FacebookIcon size={32} round />
                          </FacebookShareButton>
                        </li>
                        <li>
                          <LinkedinShareButton
                            url={"https://www.npmjs.com/package/react-share"}
                            className="Demo__some-network__share-button"
                          >
                            <LinkedinIcon size={32} round />
                          </LinkedinShareButton>
                        </li>
                        <li>
                          <PinterestShareButton
                            url={"https://www.npmjs.com/package/react-share"}
                            media={
                              "https://bestofreactjs.com/assets/images/logo_bestofreactjs.png"
                            }
                            className="Demo__some-network__share-button"
                          >
                            <PinterestIcon size={32} round />
                          </PinterestShareButton>
                        </li>
                        <li>
                          <TelegramShareButton
                            url={"https://www.npmjs.com/package/react-share"}
                            title={"Telegram"}
                            className="Demo__some-network__share-button"
                          >
                            <TelegramIcon size={32} round />
                          </TelegramShareButton>
                        </li>
                      </ul>
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
