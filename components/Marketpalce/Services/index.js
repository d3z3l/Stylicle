import React from "react";
import generalHelper from "../../../Helpers/GeneralHelper";
import { connect } from "react-redux";
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

class WorkingHours extends React.Component {
  hendalFunction=()=>{
    this.props.onBook()
    this.props.onPress()
  }
  render() {
    return (
      <>
      <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" 
           />
          <script src="/js/jquery.min.js"></script>
          <script src="/js/bootstrap.js"></script>
        <div class="mobileservice">
          <div class="row">
            <div class="col-md-6">
              <h2>{this.props.title}</h2>
              {/* <p>‼️ Please Read‼️ Effective 1/1/2021 This is a fla...</p> */}
            </div>
            <div class="col-md-6">
              <div class="bookbtnrow">
                <div>
                  <div class="purify">
                    <strong>${this.props.price}</strong>
                  </div>
                  <span class="purify_2vd">{this.props.duration}min</span>
                </div>
                <div class="purify_3kC">
                  {
                    this.props.modal_close?(
                      <button
                        onClick={this.hendalFunction}
                        class="btn btn-info"
                      >
                         View
                  </button>
                    ):
                    (
                      <button
                    onClick={this.props.onBook}
                    class="btn btn-info"
                    data-toggle="modal"
                    data-target="#exampleModalCenter"
                  > View
                  </button>
                    )
                  }
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
function mapStateToProps(state, ownProps) {
  return {
    user_workinghours: state.user_workinghours,
  };
}
export default connect(mapStateToProps)(WorkingHours);
