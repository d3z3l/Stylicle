import React from "react";
import { connect } from "react-redux";
import CategoriesHelper from "../../../../Helpers/CategoriesHelper";
import dynamic from "next/dynamic";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import config from "../../../../config";
import SweetAlert from "react-bootstrap-sweetalert";

const MUIDataTable = dynamic(
  () => import("../../../../node_modules/mui-datatables-next"),
  {
    ssr: false,
  }
);
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
const columns = ["Sr#", "Name", "Status", "Action"];
const options = {
  filterType: "checkbox",
  downloadOptions: {
    filename: "eventTable.csv",
  },
  print: false,
  viewColumns: false,
  filterTable: false,
  delete: false,
  show: false,
};

class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [["", ""]],
      update_cat_id: "",
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
    this.hendalGetCaterory();
  };
  hendalCreateCaterory = () => {
    let data = {
      title: this.state.title,
    };
    CategoriesHelper.Create(data).then((resp) => {
      this.hendalGetCaterory();
    });
  };
  hendalUpdateCaterory = (id, condetion) => {
    var data = {};
    if (condetion) {
      data = { status: "1" };
    } else {
      data = { status: "0" };
    }
    CategoriesHelper.Update(id, data).then((resp) => {
      this.hendalGetCaterory();
    });
  };
  hendalGetCaterory = () => {
    let categories = [];
    CategoriesHelper.Get().then((resp) => {
      for (let i = 0; i < resp.data.data.categories.length; i++) {
        const element = resp.data.data.categories[i];
        categories.push([
          i + 1,
          element.title,
          <div class="switch-container">
            <label class="switch">
              <input
                onClick={() => {
                  this.hendalUpdateCaterory(element._id, element.status == "0");
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
      this.setState({ categories });
    });
  };

  modal = (e) => {
    console.log(e);
    this.setState({
      title: e.title,
      update_cat_id: e._id,
    });
    $("#exampleModalCenter").show();
  };
  update = () => {
    let data = {
      title: this.state.title,
      // services: this.state.services_id,
    };
    CategoriesHelper.Update(this.state.update_cat_id, data).then((resp) => {
      this.setState({ message: "" });
      this.hendalGetCaterory();
    });
  };
  hendalDeleteCategory = async (id) => {
    await CategoriesHelper.Delete(id).then((resp) => {
      this.hendalGetCaterory();
    });
    this.setState({ show: false });
  };
  render() {
    return (
      <>
        {this.state.show ? (
          <SweetAlert
            warning
            showCancel
            confirmBtnText="Yes, delete it!"
            confirmBtnBsStyle="danger"
            title="Are you sure?"
            onConfirm={() =>
              this.hendalDeleteCategory(this.state.delete_service_id)
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
                      <label>Name</label>
                      <input
                        onChange={(text) => [
                          this.setState({ title: text.target.value }),
                        ]}
                        type="text"
                        placeholder="Name"
                        class="form-control"
                        value={this.state.title}
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
                <div class="col-md-3">
                  <h1>Add new category</h1>
                  <form>
                    <div class="mb-3">
                      <label>Name</label>
                      <input
                        onChange={(text) => [
                          this.setState({ title: text.target.value }),
                        ]}
                        type="text"
                        placeholder="Name"
                        class="form-control"
                      />
                    </div>
                    <a
                      onClick={this.hendalCreateCaterory}
                      href="#."
                      class="btn button bg-blue-700 btn-info"
                    >
                      Add new category
                    </a>
                  </form>
                </div>
                <div class="col-md-9">
                  <div class="card p-3 uk-box-shadow-medium">
                    <div class="bulkrow mb-3"></div>
                    <div class="table-responsive">
                      <MuiThemeProvider theme={this.getMuiTheme()}>
                        <MUIDataTable
                          title={"Category List"}
                          data={this.state.categories}
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
