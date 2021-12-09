import React from "react";
import Link from "next/link";
import config from "../../../../config";
import GoogleMapReact from "google-map-react";
import AuthHelper from "../../../../Helpers/AuthHelper";
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class ResetPassword extends React.Component {
  

  constructor(props) {
    super(props);
    this.state = {
     pass:'',
     c_pass:'',
     new_pass:'',
    };
  }
  componentDidMount=()=>{

  }
  hendalResetPass=()=>{
    if(this.state.pass!=this.state.c_pass){
      toast.error('Error! Confirm Password do no match', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      return false
    }
   var data={
      old_password:this.state.new_pass,
    new_password:this.state.pass,
    }
    AuthHelper.ResetPass(data).then((resp)=>{
      console.log(resp);
      console.log(resp.data.state== false);

      if (resp.data.state== false) {
        toast.error(resp.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }else{
        toast.success("Success! Password is updated", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    })
  }
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
            <h3 onClick={this.count} class="text-xl mb-2"> Basic</h3>
            <p> Lorem ipsum dolor sit amet nibh consectetuer adipiscing elit</p>
          </div>
          <div class="bg-white rounded-md lg:shadow-lg shadow col-span-2">
            <div class="grid grid-cols-2 gap-3 lg:p-6 p-4">
              <div>
                <label for="">New Passsword</label>
                <input
                  type="password"
                  onChange={(text) => [
                    this.setState({ pass: text.target.value }),
                  ]}
                  value={this.state.pass}
                  placeholder="Passsword..."
                  class="shadow-none bg-gray-100"
                />
              </div>
              <div>
                <label for="">Confirm Passsword</label>
                <input
                  type="password"
                  onChange={(text) => [
                    this.setState({ c_pass: text.target.value }),
                  ]}
                  value={this.state.c_pass}
                  placeholder="Passsword..."
                  class="shadow-none bg-gray-100"
                />
              </div>
              <div class="col-span-2">
                <label for="">Recoverd Passsword</label>
                <input
                  type="password"
                  onChange={(text) => [
                    this.setState({ new_pass: text.target.value }),
                  ]}
                  value={this.state.new_pass}
                  placeholder="Passsword..."
                  class="shadow-none bg-gray-100"
                />
              </div>
            </div>
            <div class="bg-gray-10 p-6 pt-0 flex justify-end space-x-3">
              <button class="p-2 px-4 rounded bg-gray-50 text-red-500">
                Cancel
              </button>
              <button
                onClick={this.hendalResetPass}
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


export default ResetPassword;
