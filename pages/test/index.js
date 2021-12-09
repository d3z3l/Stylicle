import React from "react";
import { connect } from "react-redux";
var moment = require("moment");
// import { withSwalInstance } from 'sweetalert2-react';
// import swal from 'sweetalert2';
// const SweetAlert = withSwalInstance(swal);
import SweetAlert from 'react-bootstrap-sweetalert';
class Workinghours extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totall: {},
    };
  }
  componentDidMount = () => {
    
  }
  render() {
    return (
      <>
        <div>
          <button onClick={() => this.setState({ show: true })}>Alert</button>
          <SweetAlert
            warning
            showCancel
            confirmBtnText="Yes, delete it!"
            confirmBtnBsStyle="danger"
            title="Are you sure?"
            onConfirm={this.deleteFile}
            onCancel={this.onCancel}
            focusCancelBtn
          >
            You will not be able to recover this imaginary file!
          </SweetAlert>
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
