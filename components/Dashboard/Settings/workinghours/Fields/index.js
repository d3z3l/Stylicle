import React from "react";
import { connect } from "react-redux";
import $ from "jquery";
import Datetime from "react-datetime";

var moment = require("moment");

class Fields extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start_view: this.props.user_workinghours[this.props.id-1].starting_time+(new Date().getTimezoneOffset() * 60),
      end_view :this.props.user_workinghours[this.props.id-1].end_time+(new Date().getTimezoneOffset() * 60),
      start: this.props.user_workinghours[this.props.id-1].starting_time,
      end: this.props.user_workinghours[this.props.id-1].end_time,
      off: this.props.user_workinghours[this.props.id-1].off==0?false:true,
      _id: this.props.user_workinghours[this.props.id-1]._id
    };
  }
componentDidMount=()=>{
  // console.log(new Date().getTimezoneOffset() * 60);
  // let zone=new Date().getTimezoneOffset() * 60000;
  // let time=(this.props.user_workinghours[this.props.id-1].end_time*1000)+(new Date().getTimezoneOffset() * 60000);
  // console.log();
  // console.log(this.props.user_workinghours[this.props.id-1]._id);
}
  hendalfielda = () => {
    
      
      this.props.onChange({
        starting_time:this.state.start,
        end_time:this.state.end,
        off:this.state.off?1:0,
        _id:this.state._id,
        day:this.props.id+'',
        update:true,
      })
    
  };
  hendalfieldabySwitch = (status) => {
      this.props.onChange({
        starting_time:this.state.start,
        end_time:this.state.end,
        off:status?1:0,
        _id:this.state._id,
        day:this.props.id+'',
        update:true,
      })
   
  };
  render() {
    return (
      <>
        <div class="grid grid-cols-4 gap-3 lg:p-6  pt-5 pb-2">
          <div>
            {/* <label for=""> Sunday</label> */}
            <h3>{this.props.name}</h3>
          </div>
          <div>
            <label for="">To </label>
            <Datetime
              // id="timepicker"
              initialValue={new Date((this.state.start_view*1000))}
              viewMode="time"
              dateFormat={false}
              onChange={(time) => {
                var time1=new Date(time.format()).getTime()/1000;
                var time2 =new Date(time.format("YYYY-MM-DD")).getTime()/1000;
                let zone= new Date().getTimezoneOffset();

                this.state.start=(time1-time2)+(Math.sqrt(zone*zone)*60)
                this.setState({start:(time1-time2)+(Math.sqrt(zone*zone)*60)})
                this.hendalfielda()
              }}
            />
           
          </div>
          <div>
            <label for="">From</label>
            <Datetime
              // id="timepicker"
              initialValue={new Date(this.state.end_view*1000)}
              viewMode="time"
              dateFormat={false}
              onChange={(time) => {
                var time1=new Date(time.format()).getTime()/1000;
                var time2 =new Date(time.format("YYYY-MM-DD")).getTime()/1000;
                let zone= new Date().getTimezoneOffset()
                console.log((time1-time2));
                this.setState({end:(time1-time2)+(Math.sqrt(zone*zone)*60)})
                this.hendalfielda()
              }}
            />
          </div>
          <div>
            <label for="">OFF</label>
            <div class="switch-container">
              <label class="switch">
                <input
                 onClick={()=>{
                  this.setState({off:!this.state.off})
                  this.hendalfieldabySwitch(!this.state.off)
                }} 
                checked={this.state.off}
                type="checkbox" class="off_1" />
                <span class="switch-button"></span>
              </label>
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
export default connect(mapStateToProps) (Fields);
