import React from "react";
// import Layout from "../../../components/Dashboard/Layout";
import config from "../../config";
import Header from "../Home/Head";
import Footer from "../Home/Footer";
import Datetime from "react-datetime";
import generalHelper from "../../Helpers/GeneralHelper";
import { faCar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";

import DatePicker from "react-mobile-datepicker";
var moment = require("moment");
import dynamic from "next/dynamic";
import { data } from "jquery";
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
    time: new Date(),
    isOpen: false,
    min_date: new Date(),
    max_date: new Date(),
    morning: "",
    afternon: "",
    evening: "",
    time_slots: [],
  };
  componentDidMount = () => {
    this.handleLimit();
  };
  handleLimit = () => {
    var today = moment();
    var mindate = moment(today).subtract(1, "days");
    var maxdate = moment(today).add(183, "days");
    this.setState({ min_date: mindate.toDate(), max_date: maxdate.toDate() });
  };
  handleClick = () => {
    this.setState({ isOpen: true });
  };

  handleCancel = () => {
    this.setState({ isOpen: false });
  };

  handleSelect = (time) => {
    this.setState({ time, isOpen: false });
  };
  handleSelectDate = (time) => {
    let data = {
      path: "service_time_slots/60ab3a33833b3e059d5a9893",
      type: "POST",
      data: {
        date: 23231321,
        customer: "60a38c29f1b5b618593e5a4f",
        services_val: "60ab9955ecb7dd0a3a4e2e01",
      },
    };
    generalHelper.Get(data).then((resp) => {
      let morning = [];
      let afternon = [];
      let evening = [];
      for (let i = 0; i < resp.data.length; i++) {
        const element = resp.data[i];
        if (element.start_time < 27400) {
          console.log(element.start_time);
          morning.push(
            <li>
              <a href="#.">
                {moment(
                  new Date(
                    (element.start_time + new Date().getTimezoneOffset() * 60) *
                      1000
                  )
                ).format("LT")}
              </a>
            </li>
          );
        } else if (element.start_time < 49000) {
          afternon.push(
            <li>
              <a href="#.">
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
              <a href="#.">
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
      console.log(morning);
    });
  };

  renderInput(props, openCalendar, closeCalendar) {
    function clear() {
      props.onChange({ target: { value: "" } });
    }
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
        <div class="pt-4">
          {this.props.user_workinghours.map((item, key) => 0)}
          <p class="pb-2">
            Sunday{" "}
            <span class="float-right">
              <strong>Closed</strong>
            </span>
          </p>
          <p class="pb-2">
            Saturday{" "}
            <span class="float-right">
              <strong>09:00 AM - 05:00 PM</strong>
            </span>
          </p>
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
