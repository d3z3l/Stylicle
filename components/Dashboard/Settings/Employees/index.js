import React from "react";
import config from "../../../../config";
import { connect } from "react-redux";
import ServicesHelper from "../../../../Helpers/ServicesHelper";
import AuthHelper from "../../../../Helpers/AuthHelper";
import AssignServicesHelper from "../../../../Helpers/AssignServicesHelper";
import ServicesTimeSlotsHelper from "../../../../Helpers/ServicesTimeSlotsHelper";
import EmploiesHelper from "../../../../Helpers/EmploiesHelper";
import dynamic from "next/dynamic";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
// import {faPencilAlt, faTrash} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SweetAlert from "react-bootstrap-sweetalert";

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
const MUIDataTable = dynamic(() => import("mui-datatables-next"), {
  ssr: false,
});
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
// const columns = ['Sr#',"Start",'End','Day',"Status"];
const columns = [
  {
    name: "Sr#",
    options: {
      filter: false,
      sort: false,
    },
  },
  {
    name: "Name",
    options: {
      filter: false,
      sort: false,
    },
  },
  {
    name: "Designation",
    options: {
      filter: false,
      sort: false,
    },
  },
  {
    name: "Salary",
    options: {
      filter: false,
      sort: false,
    },
  },
  {
    name: "Action",
    options: {
      filter: false,
      sort: false,
    },
  },
];
const options = {
  filterType: "checkbox",
  downloadOptions: {
    filename: "eventTable.csv",
  },
  print: false,
  viewColumns: false,
  filterTable: false,
  delete: false,
};

class Employees extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      seats: "",
      from: "",
      to: "",
      day: "",
      servicestimeslote_id: "",
      subCategories: [],
      servicestimeslotes: [],
      assignservices: [],
      message: "",
      assignservice_id: "",
      show: false,
      employ_id: "",
      update_employ_id: "",
    };
  }

  getMuiTheme = () =>
    createMuiTheme({
      typography: { htmlFontSize: 10 },
      overrides: {
        MUIDataTableBodyCell: {
          root: {
            fontSize: 15,
          },
        },
        MUIDataTablePagination: {
          root: {
            backgroundColor: "#80808054",
          },
        },
      },
    });
  componentDidMount = () => {
    this.hendalGetEmployees();
  };
  hendalAddEmployees = () => {
    if (this.state.name == "") {
      this.setState({ message: "Select any Services" });
      return false;
    }
    if (this.state.price == "") {
      this.setState({ message: "Select any price" });
      return false;
    }
    let data = {
      name: this.state.name,
      designaton: this.state.designaton,
      salary: this.state.salary,
      cnic: this.state.cnic,
    };
    EmploiesHelper.Create(data).then((resp) => {
      // console.log(resp);
      this.getUserHendal();
    });
  };

  modal = (e) => {
    this.setState({
      name: e.name,
      designaton: e.designaton,
      salary: e.salary,
      cnic: e.cnic,
      update_employ_id: e._id,
    });
    $("#exampleModalCenter").show();
  };

  hendalGetEmployees = async (id) => {
    let servicestimeslotes = [];
    // await AssignServicesHelper.Get(id).then((resp)=>{
    for (let i = 0; i < this.props.user_data.emploies.length; i++) {
      const element = this.props.user_data.emploies[i];
      console.log(element);
      servicestimeslotes.push([
        i + 1,
        element.name,
        element.designaton,
        "$" + element.salary,
        <>
          <div class="mx-2 d-inline">
            <FontAwesomeIcon
              data-toggle="modal"
              data-target="#exampleModalCenter"
              onClick={() => this.modal(element)}
              style={{
                color: config.primaryColor,
                fontSize: "20px",
                cursor: "pointer",
              }}
              icon={faPencilAlt}
            />
          </div>
          <FontAwesomeIcon
            onClick={() =>
              this.setState({ show: true, employ_id: element._id })
            }
            style={{
              color: config.primaryColor,
              fontSize: "20px",
              cursor: "pointer",
            }}
            icon={faTrash}
          />
        </>,
      ]);
    }
    // })
    console.log(servicestimeslotes);
    this.setState({ servicestimeslotes });
  };

  hendalDeleteEmployees = async (id) => {
    await EmploiesHelper.Delete(id).then((resp) => {
      this.getUserHendal();
    });
    this.setState({ show: false });
  };
  getUserHendal = async () => {
    await AuthHelper.Get().then((resp) => {
      this.props._user_data(resp.data.data.user);
    });
    this.hendalGetEmployees();
  };
  update = () => {
    let data = {
      name: this.state.name,
      designaton: this.state.designaton,
      salary: this.state.salary,
      cnic: this.state.cnic,
    };
    EmploiesHelper.Update(this.state.update_employ_id, data).then((resp) => {
      this.setState({ message: "" });
      this.getUserHendal();
    });
  };
  render() {
    return (
      <>
        {this.state.show ? (
          <SweetAlert
            // style={ { display: "none", marginTop: "-100px" } }
            warning
            showCancel
            confirmBtnText="Yes, delete it!"
            confirmBtnBsStyle="danger"
            title="Are you sure?"
            onConfirm={() => this.hendalDeleteEmployees(this.state.employ_id)}
            onCancel={() => this.setState({ show: false })}
            focusCancelBtn
          >
            You will not be able to recover this imaginary file!
          </SweetAlert>
        ) : null}

        <div
          class="modal"
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
                {/* <h5 class="modal-title" id="exampleModalCenterTitle">
                  Powered by <img src="images/footerlogo.svg" alt="" />
                </h5> */}
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
                <div class="bookingmodal_2">
                  <h4>
                    <i class="fas fa-chevron-left mr-2 float-left"></i> Edit
                    Services
                  </h4>
                  <hr />
                  <form>
                    <div class="mb-3">
                      <label>Name</label>
                      <input
                        onChange={(text) => [
                          this.setState({ name: text.target.value }),
                        ]}
                        type="text"
                        placeholder="name"
                        class="form-control"
                        value={this.state.name}
                      />
                    </div>
                    <div class="mb-3">
                      <label>Designaton</label>
                      <input
                        onChange={(text) => [
                          this.setState({ designaton: text.target.value }),
                        ]}
                        type="text"
                        placeholder="Designaton"
                        class="form-control"
                        value={this.state.designaton}
                      />
                    </div>
                    <div class="mb-3">
                      <label>Salary</label>
                      <input
                        onChange={(text) => [
                          this.setState({ salary: text.target.value }),
                        ]}
                        type="text"
                        placeholder="Salary"
                        class="form-control"
                        value={this.state.salary}
                      />
                    </div>
                    <div class="mb-3">
                      <label>CNIC</label>
                      <input
                        onChange={(text) => [
                          this.setState({ cnic: text.target.value }),
                        ]}
                        type="text"
                        placeholder="CNIC"
                        class="form-control"
                        value={this.state.cnic}
                      />
                    </div>
                    <a
                      onClick={this.update}
                      class="btn button bg-blue-700 btn-info  "
                      type="button"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      Update
                    </a>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="">
          <div class="container">
            <div class="catg_listing">
              <div class="row">
                <div class="col-md-4">
                  <div class="assign_box">
                    <h1>Add new Employee</h1>
                    <form>
                      <div class="mb-3">
                        <label>Name</label>
                        <input
                          onChange={(text) => [
                            this.setState({ name: text.target.value }),
                          ]}
                          type="text"
                          placeholder="name"
                          class="form-control"
                        />
                      </div>
                      <div class="mb-3">
                        <label>Designaton</label>
                        <input
                          onChange={(text) => [
                            this.setState({ designaton: text.target.value }),
                          ]}
                          type="text"
                          placeholder="Designaton"
                          class="form-control"
                        />
                      </div>
                      <div class="mb-3">
                        <label>Salary</label>
                        <input
                          onChange={(text) => [
                            this.setState({ salary: text.target.value }),
                          ]}
                          type="text"
                          placeholder="Salary"
                          class="form-control"
                        />
                      </div>
                      <div class="mb-3">
                        <label>CNIC</label>
                        <input
                          onChange={(text) => [
                            this.setState({ cnic: text.target.value }),
                          ]}
                          type="text"
                          placeholder="CNIC"
                          class="form-control"
                        />
                      </div>
                      <a
                        onClick={this.hendalAddEmployees}
                        href="#."
                        class="btn button bg-blue-700 btn-info"
                      >
                        Add Employees
                      </a>
                    </form>
                  </div>
                </div>
                <div class="col-md-8">
                  <div class="card p-3 uk-box-shadow-medium">
                    <div class="col-md-8"></div>
                    <div class="table-responsive">
                      <MuiThemeProvider theme={this.getMuiTheme()}>
                        <MUIDataTable
                          title={"Employee List"}
                          data={this.state.servicestimeslotes}
                          columns={columns}
                          options={options}
                        />
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

export default connect(mapStateToProps, mapDispatchToProps)(Employees);
