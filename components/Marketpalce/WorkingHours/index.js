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
  render() {
    return (
      <>
        <div class="pt-4">
          {this.props.WorkingHours.map((item, key) => (
            <p class="pb-2">
              {(console.log(item), days[item.day])}
              <span class="float-right">
                {item.off == 1 ? (
                  <strong>Closed</strong>
                ) : (
                  <strong>
                    {moment(
                      new Date(
                        (item.starting_time +
                          new Date().getTimezoneOffset() * 60) *
                          1000
                      )
                    ).format("LT") + "  -  "}
                    {/* - */}

                    {moment(
                      new Date(
                        (item.end_time + new Date().getTimezoneOffset() * 60) *
                          1000
                      )
                    ).format("LT")}
                  </strong>
                )}
              </span>
            </p>
          ))}
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
