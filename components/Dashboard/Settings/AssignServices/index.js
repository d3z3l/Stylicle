import React from "react";
import ServicesHelper from "../../../../Helpers/ServicesHelper";
import AuthHelper from "../../../../Helpers/AuthHelper";
import AssignServicesHelper from "../../../../Helpers/AssignServicesHelper";
import dynamic from "next/dynamic";
const MUIDataTable = dynamic(() => import('mui-datatables-next'), {
  ssr: false
});
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
const columns = ['Sr#',"Name",'Price',"Status"];
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
      price:'',
      seats:'',
      duration:'',
      rest:'',
      rest:'',
      services_id:'',
      subCategories:[],
      s_services:[],
      assignservices:[],
      message:""

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
    this.hendalGetServices()
    this.hendalGetAssignServices()
  };
  hendalAssignServices = () => {
    if (this.state.services_id=='') {
      this.setState({message:'Select any Services'})
      return false
    }
    if (this.state.price=='') {
      this.setState({message:'Select any price'})
      return false
    }
    let data = {
      price: this.state.price,
      seats: this.state.seats,
      duration: this.state.duration,
      rest: this.state.rest,
      services: this.state.services_id,
    };
    AssignServicesHelper.Create(data).then((resp) => {
      this.setState({message:''})
      this.hendalGetAssignServices()
    });
  };
  hendalUpdateAssignServices = (id,condetion) => {
    var data={}
    if (condetion) {
       data={status: "1"}
    } else {
       data={status: "0"}
    }
    AssignServicesHelper.Update(id,data).then((resp) => {
      this.hendalGetAssignServices()
    });
  };
  hendalGetAssignServices =async () => {
    let assignservices=[]
    await AuthHelper.Get().then((resp)=>{

      for (let i = 0; i < resp.data.data.user.assignservices.length; i++) {
        const element = resp.data.data.user.assignservices[i];
        console.log(element);
        console.log("element");
        console.log(element.services);
        if(element.services){
          assignservices.push([i+1,element.services.title,element.price,
            <div class="switch-container">
              <label class="switch">
                <input
                onClick={()=>{this.hendalUpdateAssignServices(element._id,element.status=='0')}} 
                  checked={element.status=='0'}
                  type="checkbox" class="off_1"
                />
                <span class="switch-button"></span>
              </label>
            </div>
          ])
        }
        
      }
    })  
    
    console.log(assignservices);
      this.setState({assignservices})
    
  };
  hendalGetServices = () => {
    let services=''
    ServicesHelper.Get().then((resp) => {
      for (let i = 0; i < resp.data.data.services.length; i++) {
        this.setState({s_services:resp.data.data.services})
      }
    });
  };

  render() {
    return (
      <>
        <div class="">
          <div class="container">
            <div class="catg_listing">
              <div class="row">
                <div class="col-md-4">
                  <h1>Add new Services</h1>
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
                        placeholder="Name"
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
                      <label>Availabel Services</label>
                      <select onChange={(text) => [
                          this.setState({ services_id: text.target.value }),
                        ]} class="form-control">
                          <option selected={this.state.services_id==''} value='' disabled >Select Any Services</option>
                        {
                          this.state.s_services.map((val,index)=>(
                            <option value={val._id} >{val.title}</option>
                          ))
                        }
                        {/* {this.state.categories} */}
                      </select>
                      <p class='Primery_color' >{this.state.message}</p>
                    </div>
                    <a onClick={this.hendalAssignServices} href="#." class="btn button bg-blue-700 btn-info">
                      Assign new Service
                    </a>
                  </form>
                </div>
                <div class="col-md-8">
                  <div class="card p-3 uk-box-shadow-medium">
                    <div class="bulkrow mb-3">
                    </div>
                    <div class="table-responsive">
                    <MuiThemeProvider theme={this.getMuiTheme()}>
                      <MUIDataTable title={"Category List"} data={this.state.assignservices} columns={columns} options={options} />
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
