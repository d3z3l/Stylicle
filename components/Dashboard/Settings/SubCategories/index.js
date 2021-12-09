import React from "react";
import CategoriesHelper from "../../../../Helpers/CategoriesHelper";
import SubCategoriesHelper from "../../../../Helpers/SubCategoriesHelper";
import dynamic from "next/dynamic";

import { faPencilAlt,faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import config from "../../../../config";
import SweetAlert from 'react-bootstrap-sweetalert';

const MUIDataTable = dynamic(() => import('mui-datatables-next'), {
  ssr: false
});
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
const columns = ['Sr#',"Name",'Category',"Status",'Action'];
const options = {
  filterType: 'checkbox',
  downloadOptions: { 
    filename: 'eventTable.csv',
  },  print: false,
  viewColumns: false,
  filterTable: false,
  delete: false,

  
};


class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title:'',
      categories:[],
      category_id:'',
      subcategories:[],
      message:"",
      update_subcat_id:"",
      delete_subcat_id:"",
      show:false,

    };
  }
  getMuiTheme = () => createMuiTheme({
    typography: {htmlFontSize: 10},
    overrides: {
      MUIDataTableBodyCell: {
        root: {
          fontSize: 15,
        }
      },
      MUIDataTablePagination: {
        root: {
          backgroundColor: "#80808054",
        }
      },
    }
  })
  componentDidMount = () => {
    this.hendalGetCaterory()
    this.hendalGetSubCaterory()
  };
  hendalCreateSubCaterory = () => {
    if (this.state.category_id=='') {
      this.setState({message:'Select any Category'})
      return false
    }
    if (this.state.title=='') {
      this.setState({message:'Select any Name'})
      return false
    }
    let data = {
      title: this.state.title,
      categories: this.state.category_id,
    };
    SubCategoriesHelper.Create(data).then((resp) => {
      this.setState({message:''})
      this.hendalGetSubCaterory()
    });
  };
  hendalUpdateSubCaterory = (id,condetion) => {
    var data={}
    if (condetion) {
       data={status: "1"}
    } else {
       data={status: "0"}
    } 
    SubCategoriesHelper.Update(id,data).then((resp) => {
      this.hendalGetSubCaterory()
    });
  };
  hendalGetSubCaterory = () => {
    let subcategories=[]
    SubCategoriesHelper.Get().then((resp) => {
      for (let i = 0; i < resp.data.data.subCategories.length; i++) {
        const element = resp.data.data.subCategories[i];
        console.log(element);
        subcategories.push([i+1,element.title,element.categories.title,
        <div class="switch-container">
          <label class="switch">
            <input
            onClick={()=>{this.hendalUpdateSubCaterory(element._id,element.status=='0')}} 
              checked={element.status=='0'}
              type="checkbox" class="off_1"
            />
            <span class="switch-button"></span>
          </label>
        </div>
        ,
        <>
          <div class='mx-2 d-inline' >
            <FontAwesomeIcon
            data-toggle="modal"
            data-target="#exampleModalCenter"
            onClick={()=>this.modal(element)}
              style={{
                color: config.primaryColor,
                fontSize:'20px',
                cursor: "pointer"
              }}
              icon={faPencilAlt}
            />
          </div>
          <FontAwesomeIcon
          onClick={()=>this.setState({show:true,delete_subcat_id:element._id})}
            style={{
              color: config.primaryColor,
              fontSize:'20px',
              cursor: "pointer"
            }}
            icon={faTrash}
          />
        </>
      ])
    }
      this.setState({subcategories})
    });
  };
  hendalGetCaterory = () => {
    let categories=''
    CategoriesHelper.Get().then((resp) => {
      for (let i = 0; i < resp.data.data.categories.length; i++) {
        this.setState({categories:resp.data.data.categories})
      }
    });
  };


  modal=(e)=>{
    console.log(e);
    this.setState({
      title:e.title,
      category_id:e.categories,
      update_subcat_id:e._id,
    })
    $('#exampleModalCenter').show()

  }
  update=()=>{
    let data = {
      title: this.state.title,
      categories: this.state.category_id,
    };
    SubCategoriesHelper.Update(this.state.update_subcat_id,data).then((resp) => {
      this.setState({message:''})
      this.hendalGetSubCaterory()
    });
  }
  hendalDeleteSubCategory= async (id)=>{
    await SubCategoriesHelper.Delete(id).then((resp)=>{
      this.hendalGetSubCaterory()
    });  
     this.setState({show:false})
   }
  render() {
    return (
      <>

        {
          this.state.show?
              <SweetAlert
                warning
                showCancel
                confirmBtnText="Yes, delete it!"
                confirmBtnBsStyle="danger"
                title="Are you sure?"
                onConfirm={()=> this.hendalDeleteSubCategory(this.state.delete_subcat_id)}
                onCancel={()=>this.setState({show:false})}
                focusCancelBtn
              >
                You will not be able to recover this record !
              </SweetAlert>
            :null
        }
        <div
          class="modal"
          id="exampleModalCenter"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered bookingmodal modal-lg" role="document" >
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
                  <h4 >
                    <i class="fas fa-chevron-left mr-2 float-left"></i> Edit Services
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
                    <div class="mb-3">
                      <label>Parent category</label>
                      <select onChange={(text) => [
                          this.setState({ category_id: text.target.value }),
                        ]} class="form-control">
                          <option selected={this.state.category_id==''} value='' disabled >Select Any category</option>
                        {
                          this.state.categories.map((val,index)=>(
                            <option selected={this.state.category_id==val._id} value={val._id} >{val.title}</option>
                          ))
                        }
                        {/* {this.state.categories} */}
                      </select>
                      <p class='Primery_color' >{this.state.message}</p>
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
                  <h1>Add new Sub Category</h1>
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
                    <div class="mb-3">
                      <label>Parent category</label>
                      <select onChange={(text) => [
                          this.setState({ category_id: text.target.value }),
                        ]} class="form-control">
                          <option selected={this.state.category_id==''} value='' disabled >Select Any category</option>
                        {
                          this.state.categories.map((val,index)=>(
                            <option value={val._id} >{val.title}</option>
                          ))
                        }
                        {/* {this.state.categories} */}
                      </select>
                      <p class='Primery_color' >{this.state.message}</p>
                    </div>
                    <a onClick={this.hendalCreateSubCaterory} href="#." class="btn button bg-blue-700 btn-info">
                      Add new Sub Category
                    </a>
                  </form>
                </div>
                <div class="col-md-8">
                  <div class="card p-3 uk-box-shadow-medium">
                    <div class="bulkrow mb-3">
                    </div>
                    <div class="table-responsive">
                    <MuiThemeProvider theme={this.getMuiTheme()}>
                      <MUIDataTable title={" SubCategory List"} data={this.state.subcategories} columns={columns} options={options} />
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
