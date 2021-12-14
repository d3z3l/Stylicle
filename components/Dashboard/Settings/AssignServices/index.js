import React from "react";
import ServicesHelper from "../../../../Helpers/ServicesHelper";
import CategoriesHelper from "../../../../Helpers/CategoriesHelper";
import AuthHelper from "../../../../Helpers/AuthHelper";
import AssignServicesHelper from "../../../../Helpers/AssignServicesHelper";
import dynamic from "next/dynamic";
import config from "../../../../config";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SweetAlert from "react-bootstrap-sweetalert";

const MUIDataTable = dynamic(() => import("mui-datatables-next"), {
  ssr: false,
});
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
const columns = ["Sr#", "Name", "Price", "Status", "Action"];
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

class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      price: "",
      seats: "",
      duration: "",
      rest: "",
      services_id: "",
      subCategories: [],
      s_services: [],
      assignservices: [],
      message: "",
      disc: "",
      update_service_id: "",
      delete_service_id: "",
      show: false,
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
    this.hendalGetServices();
    this.hendalGetAssignServices();
  };
  hendalAssignServices = () => {
    if (this.state.services_id == "") {
      this.setState({ message: "Select any Services" });
      return false;
    }
    if (this.state.price == "") {
      this.setState({ message: "Select any price" });
      return false;
    }
    let data = {
      price: this.state.price,
      seats: this.state.seats,
      duration: this.state.duration,
      disc: this.state.disc,
      rest: this.state.rest,
      services: this.state.services_id,
    };
    AssignServicesHelper.Create(data).then((resp) => {
      this.setState({ message: "" });
      this.hendalGetAssignServices();
    });
  };
  hendalUpdateAssignServices = (id, condetion) => {
    var data = {};
    if (condetion) {
      data = { status: "1" };
    } else {
      data = { status: "0" };
    }
    AssignServicesHelper.Update(id, data).then((resp) => {
      this.hendalGetAssignServices();
    });
  };
  hendalGetAssignServices = async () => {
    let assignservices = [];
    await AuthHelper.Get().then((resp) => {
      for (let i = 0; i < resp.data.data.user.assignservices.length; i++) {
        const element = resp.data.data.user.assignservices[i];
        console.log(element);
        console.log("element");
        console.log(element.services);
        if (element.services) {
          assignservices.push([
            i + 1,
            element.services.title,
            element.price,
            <div class="switch-container">
              <label class="switch">
                <input
                  onClick={() => {
                    this.hendalUpdateAssignServices(
                      element._id,
                      element.status == "0"
                    );
                  }}
                  checked={element.status == "0"}
                  type="checkbox"
                  class="off_1"
                />
                <span class="switch-button"></span>
              </label>
            </div>,
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
                  this.setState({ show: true, delete_service_id: element._id })
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
      }
    });

    console.log(assignservices);
    this.setState({ assignservices });
  };
  hendalGetServices = () => {
    let services = "";

    // ServicesHelper.Get().then((resp) => {
    CategoriesHelper.Get().then((resp) => {
      // for (let i = 0; i < resp.data.data.services.length; i++) {
      this.setState({ s_services: resp.data.data.categories });
      // }
    });
  };
  hendalDeleteAssignServices = async (id) => {
    await AssignServicesHelper.Delete(id).then((resp) => {
      this.hendalGetAssignServices();
    });
    this.setState({ show: false });
  };

  modal = (e) => {
    // console.log(e);
    this.setState({
      price: e.price,
      seats: e.seats,
      duration: e.duration,
      rest: e.rest,
      disc: e.disc,
      services_id: e.services._id,
      update_service_id: e._id,
    });
    $("#exampleModalCenter").show();
  };
  update = () => {
    let data = {
      price: this.state.price,
      seats: this.state.seats,
      duration: this.state.duration,
      disc: this.state.disc,
      rest: this.state.rest,
      services: this.state.services_id,
    };
    AssignServicesHelper.Update(this.state.update_service_id, data).then(
      (resp) => {
        this.setState({ message: "" });
        this.hendalGetAssignServices();
      }
    );
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
            onConfirm={() =>
              this.hendalDeleteAssignServices(this.state.delete_service_id)
            }
            onCancel={() => this.setState({ show: false })}
            focusCancelBtn
          >
            You will not be able to recover this record !
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
                      <label>Price</label>
                      <input
                        onChange={(text) => [
                          this.setState({ price: text.target.value }),
                        ]}
                        type="number"
                        placeholder="Price"
                        class="form-control"
                        value={this.state.price}
                      />
                    </div>
                    <div class="mb-3">
                      <label>Seats</label>
                      <input
                        onChange={(text) => [
                          this.setState({ seats: text.target.value }),
                        ]}
                        type="number"
                        placeholder="Seats"
                        class="form-control"
                        value={this.state.seats}
                      />
                    </div>
                    <div class="mb-3">
                      <label>Duration in mins</label>
                      <input
                        onChange={(text) => [
                          this.setState({ duration: text.target.value }),
                        ]}
                        type="number"
                        placedholder="Duration in mins"
                        class="form-control"
                        value={this.state.duration}
                      />
                    </div>
                    <div class="mb-3">
                      <label>Rest</label>
                      <input
                        onChange={(text) => [
                          this.setState({ rest: text.target.value }),
                        ]}
                        type="number"
                        placeholder="Rest"
                        class="form-control"
                        value={this.state.rest}
                      />
                    </div>
                    <div class="mb-3">
                      <label>available Services</label>
                      <select
                        onChange={(text) => [
                          this.setState({ services_id: text.target.value }),
                        ]}
                        class="form-control"
                      >
                        <option selected value="" disabled>
                          Select Any Services
                        </option>
                        {this.state.s_services.map((item1, key1) => (
                          <>
                            <option disabled>{item1.title}</option>
                            {item1.subcategories.map((item2, key2) => (
                              <>
                                <option disabled>
                                  &nbsp;&nbsp;&nbsp;{item2.title}
                                </option>
                                {item2.services.map((item3, key3) => (
                                  <option
                                    selected={
                                      this.state.services_id == item3._id
                                    }
                                    value={item3._id}
                                  >
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    {item3.title}
                                  </option>
                                ))}
                              </>
                            ))}
                          </>
                        ))}
                      </select>
                      <p class="Primery_color">{this.state.message}</p>
                    </div>
                    <div class="mb-3">
                      <label>Short Discription</label>
                      <textarea
                        onChange={(text) => [
                          this.setState({ disc: text.target.value }),
                        ]}
                        type="text"
                        placeholder="Enter short discription....."
                        class="form-control"
                        value={this.state.disc}
                      />
                      <p class="Primery_color">{this.state.message}</p>
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
                    <h1>Assign new Services</h1>
                    <form>
                      <div class="mb-3">
                        <label>Price</label>
                        <input
                          onChange={(text) => [
                            this.setState({ price: text.target.value }),
                          ]}
                          type="number"
                          placeholder="Price"
                          class="form-control"
                        />
                      </div>
                      <div class="mb-3">
                        <label>Seats</label>
                        <input
                          onChange={(text) => [
                            this.setState({ seats: text.target.value }),
                          ]}
                          type="number"
                          placeholder="Seats"
                          class="form-control"
                        />
                      </div>
                      <div class="mb-3">
                        <label>Duration in mins</label>
                        <input
                          onChange={(text) => [
                            this.setState({ duration: text.target.value }),
                          ]}
                          type="number"
                          placeholder="Duration in mins"
                          class="form-control"
                        />
                      </div>
                      <div class="mb-3">
                        <label>Rest</label>
                        <input
                          onChange={(text) => [
                            this.setState({ rest: text.target.value }),
                          ]}
                          type="number"
                          placeholder="Rest"
                          class="form-control"
                        />
                      </div>
                      <div class="mb-3">
                        <label>Available Services</label>
                        <select
                          onChange={(text) => [
                            this.setState({ services_id: text.target.value }),
                          ]}
                          class="form-control"
                        >
                          <option
                            selected={this.state.services_id == ""}
                            value=""
                            disabled
                          >
                            Select Any Services
                          </option>
                          {this.state.s_services.map((item1, key1) => (
                            <>
                              <option disabled>{item1.title}</option>
                              {item1.subcategories.map((item2, key2) => (
                                <>
                                  <option disabled>
                                    &nbsp;&nbsp;&nbsp;{item2.title}
                                  </option>
                                  {item2.services.map((item3, key3) => (
                                    <option value={item3._id}>
                                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                      {item3.title}
                                    </option>
                                  ))}
                                </>
                              ))}
                            </>
                          ))}
                        </select>
                        <p class="Primery_color">{this.state.message}</p>
                      </div>
                      <div class="mb-3">
                        <label>Short Discription</label>
                        <textarea
                          onChange={(text) => [
                            this.setState({ disc: text.target.value }),
                          ]}
                          type="text"
                          placeholder="Enter short discription....."
                          class="form-control"
                        />
                        <p class="Primery_color">{this.state.message}</p>
                      </div>
                      <a
                        onClick={this.hendalAssignServices}
                        href="#."
                        class="btn button bg-blue-700 btn-info"
                      >
                        Assign new Service
                      </a>
                    </form>
                  </div>
                </div>
                <div class="col-md-8">
                  <div class="card p-3 uk-box-shadow-medium">
                    <div class="bulkrow mb-3"></div>
                    <div class="table-responsive">
                      <MuiThemeProvider theme={this.getMuiTheme()}>
                        <MUIDataTable
                          title={"Services List"}
                          data={this.state.assignservices}
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

export default Categories;
