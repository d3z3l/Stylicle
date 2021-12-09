import React from "react";
import { connect } from "react-redux";
import CategoriesHelper from "../../../../Helpers/CategoriesHelper";
import dynamic from "next/dynamic";
const MUIDataTable = dynamic(() => import('../../../../node_modules/mui-datatables-next'), {
  ssr: false
});
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
const columns = ['Sr#',"Name","Status"];
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
      categories: [["",""]]
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
  };
  hendalCreateCaterory = () => {
    let data = {
      title: this.state.title,
    };
    CategoriesHelper.Create(data).then((resp) => {
      this.hendalGetCaterory()
    });
  };
  hendalUpdateCaterory = (id,condetion) => {
    var data={}
    if (condetion) {
       data={status: "1"}
    } else {
       data={status: "0"}
    }
    CategoriesHelper.Update(id,data).then((resp) => {
      this.hendalGetCaterory()
    });
  };
  hendalGetCaterory = () => {
    let categories=[]
    CategoriesHelper.Get().then((resp) => {
      for (let i = 0; i < resp.data.data.categories.length; i++) {
        const element = resp.data.data.categories[i];
        categories.push([i+1,element.title,
        <div class="switch-container">
          <label class="switch">
            <input
            onClick={()=>{this.hendalUpdateCaterory(element._id,element.status=='0')}} 
              checked={element.status=='0'}
              type="checkbox" class="off_1"
            />
            <span class="switch-button"></span>
          </label>
        </div>
      ])
    }
      this.setState({categories})
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
                    <a onClick={this.hendalCreateCaterory} href="#." class="btn button bg-blue-700 btn-info">
                      Add new category
                    </a>
                  </form>
                </div>
                <div class="col-md-8">
                  <div class="card p-3 uk-box-shadow-medium">
                    <div class="bulkrow mb-3">
                    </div>
                    <div class="table-responsive">
                    <MuiThemeProvider theme={this.getMuiTheme()}>
                      <MUIDataTable title={"Category List"} data={this.state.categories} columns={columns} options={options} />
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
