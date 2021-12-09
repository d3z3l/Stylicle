import React from "react";
import ServicesHelper from "../../../../Helpers/ServicesHelper";
import SubCategoriesHelper from "../../../../Helpers/SubCategoriesHelper";
import MediaHelper from "../../../../Helpers/MediaHelper";
import dynamic from "next/dynamic";

import { faPencilAlt,faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import config from "../../../../config";
import SweetAlert from 'react-bootstrap-sweetalert';

const MUIDataTable = dynamic(() => import('mui-datatables-next'), {
  ssr: false
});
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
const columns = ['Sr#','Image',"Name",'Sub Category',"Featured","Status","Action"];
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
      subCategories:[],
      subCategories_id:'',
      services:[],
      message:"",
      image:'service.jpeg',
      new_image: "off",
      delete_service_id: "",
      show: false,
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
    this.hendalGetSubCaterory()
    this.hendalGetServices()
  };
  hendalCreateServices = async () => {
    if (this.state.new_image == "on") {
      await this.handleUpload();
    }

    if (this.state.subCategories_id=='') {
      this.setState({message:'Select any Category'})
      return false
    }
    if (this.state.title=='') {
      this.setState({message:'Select any Name'})
      return false
    }
    let data = {
      title: this.state.title,
      subcategories: this.state.subCategories_id,
      image: this.state.image,
    };
    ServicesHelper.Create(data).then((resp) => {
      this.setState({message:''})
      this.hendalGetServices()
    });
  };

  handleUpload = async () => {
    await MediaHelper.Upload(this.state.image).then((resp) => {
      console.log(JSON.parse(resp.data).status);
      this.state.image = JSON.parse(resp.data).status;
      this.setState({ image: JSON.parse(resp.data).status });
    });
  };
  hendalUpdateServices = (id,condetion,param) => {
    var data={}
    if (condetion) {
       data={status: "1"}
    } else {
       data={status: "0"}
    }
    ServicesHelper.Update(id,data).then((resp) => {
      this.hendalGetServices()
    });

  };
  hendalUpdateServices_featured = (id,condetion,param) => {
    var data={}
    if (condetion) {
       data={popular: "1"}
    } else {
       data={popular: "0"}
    }
    ServicesHelper.Update(id,data).then((resp) => {
      this.hendalGetServices()
    });

  };
  hendalGetServices = () => {
    let services=[]
    ServicesHelper.Get().then((resp) => {
    for (let i = 0; i < resp.data.data.services.length; i++) {
        const element = resp.data.data.services[i];
        // console.log(element.subcategories.title);
        services.push([i+1,
          <div class="bg-gradient-to-tr  transition   w-32 h-32">
            <img
              src={config.image_url + element.image}
              class="bg-gray-200 border-4 border-white  w-full h-full"
            />
          </div>
          ,element.title,element.subcategories.title,
        <div class="switch-container">
          <label class="switch">
            <input
            onClick={()=>{this.hendalUpdateServices_featured(element._id,element.popular=='0','popular')}} 
              checked={element.popular!='0'}
              type="checkbox" class="off_1"
            />
            <span class="switch-button"></span>
          </label>
        </div>,
        <div class="switch-container">
          <label class="switch">
            <input
            onClick={()=>{this.hendalUpdateServices(element._id,element.status=='0','status')}} 
              checked={element.status=='0'}
              type="checkbox" class="off_1"
            />
            <span class="switch-button"></span>
          </label>
        </div>,
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
            onClick={()=>this.setState({show:true,delete_service_id:element._id})}
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
    this.setState({services})
    });
  };
  hendalGetSubCaterory = () => {
    let subCategories=''
    SubCategoriesHelper.Get().then((resp) => {
      for (let i = 0; i < resp.data.data.subCategories.length; i++) {
        this.setState({subCategories:resp.data.data.subCategories})
      }
    });
  };

  modal=(e)=>{
    console.log(e);
    this.setState({

      title:e.title,
      subCategories_id:e.subcategories,
      image:e.image,
      update_service_id:e._id,
    })
    $('#exampleModalCenter').show()
  }
  update= async ()=>{
    if (this.state.new_image == "on") {
      await this.handleUpload();
    }
    let data = {
      title: this.state.title,
      subcategories: this.state.subCategories_id,
      image: this.state.image,
    };
    ServicesHelper.Update(this.state.update_service_id,data).then((resp) => {
      this.setState({message:''})
      this.hendalGetServices()

    });
  }
  hendalDeleteSubCategory= async (id)=>{
    await ServicesHelper.Delete(id).then((resp)=>{
      this.hendalGetServices()
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
                          this.setState({ subCategories_id: text.target.value }),
                        ]} class="form-control">
                          <option selected={this.state.subCategories_id==''} value='' disabled >Select Any category</option>
                        {
                          this.state.subCategories.map((val,index)=>(
                            <option selected={this.state.subCategories_id==val._id} value={val._id} >{val.title}</option>
                          ))
                        }
                        {/* {this.state.categories} */}
                      </select>
                      <p class='Primery_color' >{this.state.message}</p>
                    </div>
                    <div class='mb-3' >
                      <label class="col-span-2 " for="">
                        
                        Image
                      </label>
                      <input onChange={(text) => [ this.setState({ image: text.target.files[0], new_image: "on", }) ]} type="file" placeholder="" class="" />
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
                  <h1>Add new Service</h1>
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
                          this.setState({ subCategories_id: text.target.value }),
                        ]} class="form-control">
                          <option selected={this.state.subCategories_id==''} value='' disabled >Select Any category</option>
                        {
                          this.state.subCategories.map((val,index)=>(
                            <option value={val._id} >{val.title}</option>
                          ))
                        }
                        {/* {this.state.categories} */}
                      </select>
                      <p class='Primery_color' >{this.state.message}</p>
                    </div>
                    <div class='mb-3' >
                      <label class="col-span-2 " for="">
                        
                        Image
                      </label>
                      <input onChange={(text) => [ this.setState({ image: text.target.files[0], new_image: "on", }) ]} type="file" placeholder="" class="" />
                    </div>
                    <a onClick={this.hendalCreateServices} href="#." class="btn button bg-blue-700 btn-info">
                      Add new Service
                    </a>
                  </form>
                </div>
                <div class="col-md-8">
                  <div class="card p-3 uk-box-shadow-medium">
                    <div class="bulkrow mb-3">
                    </div>
                    <div class="table-responsive">
                    <MuiThemeProvider theme={this.getMuiTheme()}>
                      <MUIDataTable title={"Service List"} data={this.state.services} columns={columns} options={options} />
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
