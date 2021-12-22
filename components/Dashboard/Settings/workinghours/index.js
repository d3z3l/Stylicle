import React from "react";
import { connect } from "react-redux";
import AuthHelper from "../../../../Helpers/AuthHelper";
import WorkinghoursHelper from "../../../../Helpers/WorkinghoursHelper";
import Datetime from "react-datetime";
import $ from "jquery";
import Fields from "./Fields";
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
var moment = require("moment");

class Workinghours extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mon: { starting_time: 0, end_time: 0, off: 0, day: "1" },
      tus: { starting_time: 0, end_time: 0, off: 0, day: "2" },
      wed: { starting_time: 0, end_time: 0, off: 0, day: "3" },
      thu: { starting_time: 0, end_time: 0, off: 0, day: "4" },
      fri: { starting_time: 0, end_time: 0, off: 0, day: "5" },
      sat: { starting_time: 0, end_time: 0, off: 0, day: "6" },
      sun: { starting_time: 10, end_time: 10, off: 0, day: "7" },
      totall: {},
    };
  }
  componentDidMount = () => {
    this.setState({
      totall: this.props.user_workinghours,
    });
    console.log(this.state.totall);
  };
  handleWorkinghours = async (data) => {
    this.state.totall[data.day-1] = data;
    console.log(this.state.totall);
    
  };
  handleWorkinghoursUpdates = async (data) => {
   this.state.totall.forEach(element => {
     if (element.update) {
      WorkinghoursHelper.update(element).then((resp)=>{
        
      })
     }
   });
   toast.success('Success!', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });
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
        <div class="grid lg:grid-cols-3 mt-12 gap-8">
          <div>
            <br/>
            <h3 class="text-xl mb-2">Business Hours</h3>
            <p> Add or change your working hours here</p>
          </div>
          <div class="bg-white rounded-md lg:shadow-lg shadow col-span-2">
            <Fields
              name={"Monday"}
              id={1}
              onChange={this.handleWorkinghours.bind(this)}
            />
            <Fields
              name={"Tuesday"}
              id={2}
              onChange={this.handleWorkinghours.bind(this)}
            />
            <Fields
              name={"Wednesday"}
              id={3}
              onChange={this.handleWorkinghours.bind(this)}
            />
            <Fields
            id={4}
              name={"Thursday"}
              onChange={this.handleWorkinghours.bind(this)}
            />
            <Fields
              name={"Friday"}
              
              id={5}
              onChange={this.handleWorkinghours.bind(this)}
            />
            <Fields
              id={6}
              name={"Saturday"}
              onChange={this.handleWorkinghours.bind(this)}
            />
            <Fields
              id={7}
              name={"Sunday"}
              onChange={this.handleWorkinghours.bind(this)}
            />

            <div class="bg-gray-10 p-6 pt-0 flex justify-end space-x-3">
              <button
                onClick={this.handleWorkinghoursUpdates}
                type="button"
                class="button bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
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
const mapDispatchToProps = (dispatch) => {
  return {
    _user_data: (data) => {
      dispatch({ type: "user_data", payload: data });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Workinghours);
