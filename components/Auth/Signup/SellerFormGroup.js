import React from "react";
import Link from "next/link";
import AuthHelper from "../../../Helpers/AuthHelper";
import WorkinghoursHelper from "../../../Helpers/WorkinghoursHelper";
import Router from 'next/router'


export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      f_name: "",
      l_name: "",
      email: "",
      phone: "",
      business: "",
      address: "",
      gender: "",
      personal_title: "",
      password: "",
      c_password: "",
      messages: "",
      checked:false
    };
  }
  handleLogin = () => {
    // alert(this.state.checked)
    // return false
   
    if (this.state.password != this.state.c_password) {
      this.setState({ messages: 'password dose not match' });
      return false;
    }
    if (!this.state.checked) {
      this.setState({ messages: 'please accept the terms and conditions' });
      return false;
    }
    var data = {
      name:this.state.f_name,
      email:this.state.email,
      phone:this.state.phone,
      business:this.state.business,
      gender:this.state.gender,
      personal_title:this.state.personal_title,
      address:this.state.address,
      role_id:'1',
      password:this.state.password,
      is_related:true
    };
    AuthHelper.Signup_group(data).then((resp) => {
      if (resp.data.status != "success") {
        console.log(resp.data.status);
        let str=JSON.stringify(resp.data.status)
         str = str.replace(/"/g, " ");
         str = str.replace(/`/g, " ");
        str = str.substring(1, str.length - 1);
        this.setState({ messages: str });
      } else {
        let data={_id:resp.data.data.newUser._id}
        WorkinghoursHelper.create(data).then((resp)=>{
          // Router.push('/auth/login')
        })

      }
    });

  };

  render() {
    return (
      <div class="row m-0 h-100 align-items-center justify-content-md-center">
        
        <div class="col-sm-12 ml-auto">
          
        <div class="outhform">
          <h1 class="lg:text-3xl text-xl font-semibold mb-6"> Add a new seller</h1>
          <p class="mb-2 text-black text-lg">
            {" "}
            Register to manage your account{" "}
          </p>
          {/* <form action=""> */}
          <div class="flex lg:flex-row flex-col lg:space-x-2" >
              <select  onChange={(text) => [
                  this.setState({ gender: text.target.value }),
                ]} class="bg-gray-200 mb-2 shadow-none  dark:bg-gray-800">
                  <option selected={''==''} value='' disabled >Select Any Gender</option>
                  <option selected={this.state.gender=='Male'} value="Male">Male</option>
                  <option selected={this.state.gender=='Female'} value="Female">Female</option>
              </select>
              <select  onChange={(text) => [
                  this.setState({ personal_title: text.target.value }),
                ]} class="bg-gray-200 mb-2 shadow-none  dark:bg-gray-800">
                  <option selected={''==''} value='' disabled >Select Any Title</option>
                  <option selected={this.state.personal_title=='Mr'} value="Mr">Mr</option>
                  <option selected={this.state.personal_title=='Mrs'} value="Mrs">Mrs</option>
                  <option selected={this.state.personal_title=='Miss'} value="Miss">Miss</option>
                  <option selected={this.state.personal_title=='Ms'} value="Ms">Ms</option>
              </select>
            </div>
            <div class="flex lg:flex-row flex-col lg:space-x-2">
              <input
                onChange={(text) => [
                  this.setState({ f_name: text.target.value }),
                ]}
                type="text"
                placeholder="Your Name"
                class="bg-gray-200 mb-2 shadow-none  dark:bg-gray-800"
                style={{ border: "1px solid #d3d5d8 !important" }}
              />
              
            </div>
            <input
              onChange={(text) => [
                this.setState({ email: text.target.value }),
              ]}
              type="text"
              placeholder="Email"
              class="bg-gray-200 mb-2 shadow-none  dark:bg-gray-800"
              style={{ border: "1px solid #d3d5d8 !important" }}
            />
            <input
              onChange={(text) => [
                this.setState({ phone: text.target.value }),
              ]}
              type="text"
              placeholder="Business Phone"
              class="bg-gray-200 mb-2 shadow-none  dark:bg-gray-800"
              style={{ border: "1px solid #d3d5d8 !important" }}
            />
            <input
              onChange={(text) => [
                this.setState({ business: text.target.value }),
              ]}
              type="text"
              placeholder="Business name"
              class="bg-gray-200 mb-2 shadow-none  dark:bg-gray-800"
              style={{ border: "1px solid #d3d5d8 !important" }}
            />
            <input
              onChange={(text) => [
                this.setState({ address: text.target.value }),
              ]}
              type="text"
              placeholder="Working Address"
              class="bg-gray-200 mb-2 shadow-none  dark:bg-gray-800"
              style={{ border: "1px solid #d3d5d8 !important" }}
            />
            

            <input 
              onChange={(text) => [
                this.setState({ password: text.target.value }),
              ]}
              type="password"
              placeholder="Password"
              class="bg-gray-200 mb-2 shadow-none  dark:bg-gray-800"
              style={{ border: "1px solid #d3d5d8 !important" }}
            />
            <input
              onChange={(text) => [
                this.setState({ c_password: text.target.value }),
              ]}
              type="password"
              placeholder="Confirm Password"
              class="bg-gray-200 mb-2 shadow-none  dark:bg-gray-800"
              style={{ border: "1px solid #d3d5d8 !important" }}
            />
            <div class="flex justify-start my-4 space-x-1">
              <div class="checkbox d-flex">
                <input type="checkbox" onClick={()=>this.setState({checked:!this.state.checked})} id="chekcbox1" checked={this.state.checked} />
                <label for="chekcbox1">
                  <span class="checkbox-icon"></span> I Agree {" "}
                </label>
                <label class="pl-1" for="chekcbox1">
                to the Terms and Conditions 
                </label>
              </div>
                
              {/* <a href="#"> Terms and Conditions</a> */}
            </div>
            <p class="form_message">{this.state.messages}</p>
            {/* <Link href="/auth/login"> */}
            <button
              onClick={this.handleLogin}
              class="bg-gradient-to-br from-pink-500 py-3 rounded-md text-white text-xl to-red-400 w-full"
            >
              Register
            </button>
            {/* </Link> */}
            <div class="text-center mt-5 space-x-2">
              <Link href="/auth/login">
                <p class="text-base">
                  {" "}
                </p>
              </Link>
            </div>
          {/* </form> */}
          </div>
        </div>
      </div>
    );
  }
}
