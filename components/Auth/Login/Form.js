import React from "react";
import Link from "next/link";
import { connect } from "react-redux";
import Router from "next/router";
import AuthHelper from "../../../Helpers/AuthHelper";
import cookie from "react-cookies";
import KeyHandler, { KEYPRESS } from "react-key-handler";

class CounterDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      messages: "",
      secureEntry: true,
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
        cookie.save("Tokken_temp", resp.data.data.tokken, { path: "/" });
        Router.push("/packages_seller");
      } else {
        console.log(cookie.load("Tokken"));
        cookie.save("Tokken", resp.data.data.tokken, { path: "/" });
        Router.push("/dashboard/feed");
      }
    });
  };

  render() {
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
            <input
              type="text"
              onChange={(text) => [this.setState({ email: text.target.value })]}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  this.handleLogin();
                }
              }}
              placeholder="example@mydomain.com"
              class="bg-gray-200 mb-2 shadow-none dark:bg-gray-800"
              style={{ border: "1px solid #d3d5d8 !important" }}
            />
            <input
              type="password"
              onChange={(text) => [
                this.setState({ password: text.target.value }),
              ]}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  this.handleLogin();
                }
              }}
              placeholder="***********"
              class="bg-gray-200 mb-2 shadow-none dark:bg-gray-800"
              style={{ border: "1px solid #d3d5d8 !important" }}
            />
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
