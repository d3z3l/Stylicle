import React from "react";
import generalHelper from "../../../Helpers/GeneralHelper";
import { connect } from "react-redux";
var moment = require("moment");



class Reservations extends React.Component {
  render() {
    return (
      <>
        <div class="row">
          <div class="col-md-6">
            <h2>{this.props.title}</h2>
            {/* <p>
                          ‼️ Please Read‼️ Effective 1/1/2021 This is a fla...
                        </p> */}
          </div>
          <div class="col-md-6">
            <div class="bookbtnrow">
              <div>
                <div class="purify">
                  <strong>${this.props.price}</strong>
                </div>
                <span class="purify_2vd">
                {
                  <strong>
                    {moment(
                      new Date(
                        (this.props.start_time +
                          new Date().getTimezoneOffset() * 60) *
                          1000
                      )
                    ).format("LT") + "  -  "}
                    {/* - */}

                    {moment(
                      new Date(
                        (this.props.end_time + new Date().getTimezoneOffset() * 60) *
                          1000
                      )
                    ).format("LT")}
                  </strong>
                }
                </span>
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
export default connect(mapStateToProps)(Reservations);
