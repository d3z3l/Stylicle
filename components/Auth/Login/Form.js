import React from "react";
import Link from "next/link";
import { connect } from "react-redux";
import Router from "next/router";
import AuthHelper from "../../../Helpers/AuthHelper";
import cookie from "react-cookies";
import KeyHandler, { KEYPRESS } from "react-key-handler";

import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Input from "@material-ui/core/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faArrowLeft,
  faEye,
} from "@fortawesome/free-solid-svg-icons";

class CounterDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      messages: "",
      secureEntry: true,
      showPassword: false,
    };
  }
  componentDidMount = () => {
    AuthHelper.Varification().then((data) => {
      if (data.status != "unauthorize") {
        Router.push("/dashboard/feed");
      }
    });
  };
  count = () => {
    // setTimeout(() => {
    this.props._count(22);
    // }, 2000);
  };
  handleLogin = () => {
    var data = {
      email: this.state.email,
      password: this.state.password,
    };
    AuthHelper.Login(data).then((resp) => {
      if (resp.data.status != "success") {
        this.setState({ messages: resp.data.status });
      } else if (resp.data.nav == "packages") {
        // console.warn(
        //   resp.data,
        //   "resp.data.nav resp.data.nav resp.data.nav resp.data.nav resp.data.nav resp.data.nav resp.data.nav resp.data.nav resp.data.nav resp.data.nav resp.data.nav resp.data.nav resp.data.nav resp.data.nav resp.data.nav resp.data.nav resp.data.nav resp.data.nav resp.data.nav resp.data.nav resp.data.nav resp.data.nav  "
        // );
        cookie.save("Tokken_temp", resp.data.data.tokken, { path: "/" });
        Router.push("/packages_seller");
      } else {
        // console.warn(
        //   resp.data,
        //   "resp.data.nav resp.data.nav resp.data.nav resp.data.nav resp.data.nav resp.data.nav resp.data.nav resp.data.nav resp.data.nav resp.data.nav resp.data.nav resp.data.nav resp.data.nav resp.data.nav resp.data.nav resp.data.nav resp.data.nav resp.data.nav resp.data.nav resp.data.nav resp.data.nav resp.data.nav  "
        // );
        console.log(cookie.load("Tokken"));
        cookie.save("Tokken", resp.data.data.tokken, { path: "/" });
        Router.push("/dashboard/feed");
      }
    });
  };
  // {showPassword: !values.showPassword }

  render() {
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
    const handlePasswordChange = (prop) => (event) => {
      setValues({ [prop]: event.target.value });
    };
    const handleClickShowPassword = () => {
      this.setState((preState) => ({
        showPassword: !preState.showPassword,
      }));
    };
    const xyz = cookie.load("Tokken");

    return (
      <div class="row m-0 h-100 align-items-center justify-content-md-center">
        <KeyHandler
          keyEventName={KEYPRESS}
          keyValue="Enter"
          onKeyHandle={() => this.handleLogin()}
        />
        <div class="col-lg-6"></div>
        <div class="authimg">
          <img
            src="/images/login-img.png"
            alt=""
            class="img-fluid aun dexlog"
          />
        </div>
        <div class="col-sm-6 ml-auto">
          <div class="outhlogo">
            <a href="/">
              <img
                src="/images/logo2.png"
                alt=""
                class="img-fluid aun dexlog"
              />
            </a>
          </div>
          <div class="outhform">
            <h1
              onClick={this.count}
              class="lg:text-3xl text-xl font-semibold mb-6"
            >
              {" "}
              Log in
            </h1>
            <p class="mb-2 text-black text-lg">
              {/* {this.props.count} */}
              Email or Username
            </p>
            {/* <form action=""> */}
            {/* <FormControl className="searchOrder"> */}
            <input
              type="text"
              onChange={(text) => [this.setState({ email: text.target.value })]}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  this.handleLogin();
                }
              }}
              placeholder="example@mydomain.com"
              class=" mb-2 shadow-none dark:bg-gray-800"
              // class="bg-gray-200 mb-2 shadow-none dark:bg-gray-800"
              // style={{ border: "1px solid #d3d5d8 !important" }}
            />

            {/* </FormControl> */}
            <div class="d-flex p-0 m-0 align-items-center bg-white">
              <input
                type={this.state.showPassword === true ? "text" : "password"}
                // type="password"
                onChange={(text) => [
                  this.setState({ password: text.target.value }),
                ]}
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    this.handleLogin();
                  }
                }}
                placeholder="***********"
                class=" mb-0 shadow-none dark:bg-gray-800"
                // class="bg-gray-200 mb-0 shadow-none dark:bg-gray-800"
                // onKeyPress={this.handleLogin}
                // style={{ border: "1px solid #d3d5d8 !important" }}
              />
              <FontAwesomeIcon
                style={{
                  color: "#95979d",
                  fontSize: "15px",
                  cursor: "pointer",
                  // margin: "0px 0px 0px 20px",
                  // paddingRight: "20px",
                  marginRight: "10px",
                }}
                icon={faEye}
                onClick={() =>
                  this.setState((preState) => ({
                    showPassword: !preState.showPassword,
                  }))
                }
              />
            </div>

            {/* <span>
              <div class="checkbox">
                <FontAwesomeIcon
                  style={{
                    color: "#95979d",
                    fontSize: "16px",
                    cursor: "pointer",
                    margin: "0px 5px",
                  }}
                  icon={faMapMarkerAlt}
                />
                <input
                  onClick={() =>
                    this.setState((preState) => ({
                      showPassword: !preState.showPassword,
                    }))
                  }
                  type="checkbox"
                  id="chekcbox2"
                />
                <label for="chekcbox2">
                  <span class="checkbox-icon"></span>show password
                </label>
              </div>
            </span> */}
            <div class="flex justify-between my-4">
              <div class="checkbox">
                <input
                  onClick={() => console.log(44)}
                  type="checkbox"
                  id="chekcbox1"
                />
                <label for="chekcbox1">
                  <span class="checkbox-icon"></span>Remember Me
                </label>
              </div>
              {/* <a href="#"> Forgot Your Password? </a> */}
            </div>
            <p class="form_message">{this.state.messages}</p>
            {/* <Link href="/dashboard/feed"> */}
            <button
              onClick={this.handleLogin}
              class="bg-gradient-to-br from-pink-500 py-3 rounded-md text-white text-xl to-red-400 w-full"
            >
              Login
            </button>
            {/* </Link> */}
            <div class="text-center mt-5 space-x-2">
              <Link href="/auth/signup">
                <p class="text-base">
                  {" "}
                  Not registered?{" "}
                  <a href="form-register.html" class="">
                    {" "}
                    Create a account{" "}
                  </a>
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

function mapStateToProps(state, ownProps) {
  return {
    count: state.count,
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    _count: (data) => {
      dispatch({ type: "INCREMENT", payload: data });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CounterDisplay);
