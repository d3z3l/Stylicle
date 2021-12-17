import React from "react";
import Link from "next/link";
import AuthHelper from "../../../Helpers/AuthHelper";
import { connect } from "react-redux";
import cookie from "react-cookies";
import Select from "react-select";
import config from "../../../config";
import CategoriesHelper from "../../../Helpers/CategoriesHelper";
import {
  faCar,
  faList,
  faTachometerAlt,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Router from "next/router";
const jwt = require("jsonwebtoken");

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];
class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      user_data: "",
      user_name: "",
      user_image: "",
      sub_menu: 0,
      nav_effect: "/admin/",
      selectedOption: null,
      group: [],
    };
  }

  componentDidMount = () => {
    this.setState({ nav_effect: Router.asPath });
    AuthHelper.Varification().then((data) => {
      if (data.status == "unauthorize") {
        Router.push("/auth/login");
      }
    });
    this.props._user_data(222);
    this.hendalGetCaterory();
    this.getUserHendal();
    this.getUsergroupsHendal();
  };

  getUsergroupsHendal = async () => {
    await AuthHelper.groups().then((resp) => {
      console.log(resp.data.data.group?.user);
      this.setState({ group: resp.data.data.group?.user });
    });
  };
  getUserHendal = async () => {
    await AuthHelper.Get().then((resp) => {
      this.props._user_fname(resp.data.data.user.name);
      this.props._user_lname(
        resp.data.data.user.name.split(" ").slice(-1).join(" ")
      );
      this.props._user_phone(resp.data.data.user.phone);
      this.props._user_image(resp.data.data.user.image);
      this.props._user_workinghours(resp.data.data.user.workinghours);
      this.props._user_data(resp.data.data.user);
    });
  };
  nightmode = () => {
    document.documentElement.classList.toggle("dark");
    if (document.documentElement.classList.contains("dark")) {
      localStorage.setItem("gmtNightMode", true);
      return;
    }
    localStorage.removeItem("gmtNightMode");
  };
  daymode = () => {
    setTimeout(() => {
      this.nightmode();
    }, 5000);
    document.documentElement.classList.toggle("dark");
    if (document.documentElement.classList.contains("dark")) {
      localStorage.setItem("gmtNightMode", true);
      return;
    }
    localStorage.removeItem("gmtNightMode");
  };
  hendalGetCaterory = () => {
    let categories = "";
    CategoriesHelper.Get().then((resp) => {
      for (let i = 0; i < resp.data.data.categories.length; i++) {
        this.setState({ categories: resp.data.data.categories });
      }
    });
  };

  count = () => {
    // setTimeout(() => {
    this.props._count("fiiidfd");
    // this.props._user_fname('fiiidfd');
    // }, 2000);
  };
  hendalLogout = () => {
    cookie.remove("Tokken", { path: "/" });
  };
  hendalChangeGroup = async (data) => {
    console.log(process.env);
    var data2 = { id: data };
    await AuthHelper.groups_tocken(data2).then((resp) => {
      cookie.save("Tokken", resp.data.data.tokken, { path: "/" });
      Router.reload();
      // console.log(resp.data.data.tokken);
      // this.setState({group:resp.data.data.group.user})
    });
    // alert(process.env.STRIPE_SECRET_KEY)
    // var tokken =jwt.sign({ _id: data }, process.env.TOKEN_SECRET)
    // cookie.save('Tokken33', tokken , { path: '/' })
  };
  submenu = () => {
    if (this.state.sub_menu == "") {
      $(".active_menu").addClass("active-submenu");
      this.setState({ sub_menu: "settinge" });
    } else {
      this.setState({ sub_menu: "" });
      $(".active-submenu").removeClass("active-submenu");
    }
  };

  render() {
    const { selectedOption } = this.state;
    return (
      <>
        <div id="wrapper">
          {this.props.user_data.status == "3" ? (
            <div class="bg-dark p-2 d-flex text-light justify-content-center">
              The expiration date for your package have passed.
              <p
                class=".bg-pink-500 dfdf"
                style={{ "line-height": "27px", color: "#bc1f30" }}
              >
                <Link href="/packages"> Do you want to Renew it?</Link>
              </p>
            </div>
          ) : null}
          {this.props.user_data.status == "4" ? (
            <div class="bg-dark p-2 d-flex text-light justify-content-center">
              Your account is listed offline till you clear your dues.
              <p
                class=".bg-pink-500 dfdf"
                style={{ "line-height": "27px", color: "#bc1f30" }}
              >
                {" "}
                Please contact your Admin
              </p>
            </div>
          ) : null}
          <div class="sidebar">
            <div class="sidebar_header border-b border-gray-200 from-gray-100 to-gray-50 bg-gradient-to-t  uk-visible@s">
              <Link href="/">
                <a>
                  <img src="/images/Stylicle-Icon.svg" alt="" />
                  <img src="/images/footerlogo.svg" class="logo_inverse" />
                </a>
              </Link>
              {/* <a
              onClick={this.nightmode}
                
                id="night-mode"
                class="btn-night-mode"
                data-tippy-placement="left"
                title="Switch to dark mode"
              ></a> */}
              {/* <Select
                value={selectedOption}
                onChange={this.handleChange}
                options={options}
              /> */}
              <div>
                <div>
                  <h5 className="mt-0, ml-3">
                    {this.props.user_data.business == null
                      ? "Wellcome Seller"
                      : "Wellcome Buyer"}
                  </h5>
                </div>
                {/* <select
                  onChange={(e) => this.hendalChangeGroup(e.target.value)}
                  className="shadow-none mt-3 ml-3 border rounded py-2"
                >
                  <option value="" disabled selected>
                    select any sik
                  </option>
                  {this.state.group?.map((val, index) => (
                    <option
                      selected={this.props.user_data._id == val._id}
                      value={val._id}
                    >
                      {val.business}
                    </option>
                  ))}
                </select> */}
              </div>
            </div>
            <div class="border-b border-gray-20 flex justify-between items-center p-3 pl-5 relative uk-hidden@s">
              <h3 class="text-xl"> Navigation </h3>
              <span
                class="btn-mobile"
                uk-toggle="target: #wrapper ; cls: sidebar-active"
              ></span>
            </div>
            <div class="sidebar_inner" data-simplebar>
              <div class="flex flex-col items-center my-6 uk-visible@s">
                <div class="bg-gradient-to-tr p-1 rounded-full transition m-0.5 mr-2  w-24 h-24">
                  <img
                    onClick={this.count}
                    src={config.image_url + this.props.user_image}
                    class="bg-gray-200 border-4 border-white rounded-full w-full h-full"
                  />
                </div>
                <Link
                  href={{
                    pathname: "/dashboard/profile",
                    query: {
                      index:
                        this.props.user_data != null
                          ? this.props.user_data._id
                          : null,
                    },
                  }}
                >
                  <a class="text-xl font-medium capitalize mt-4 uk-link-reset">
                    {this.props.user_fname}
                  </a>
                </Link>
              </div>

              <hr class="-mx-4 -mt-1 uk-visible@s" />
              <ul>
                {this.props.user_data.role_id == "2" ? (
                  <li
                    onClick={() => this.setState({ nav_effect: "/admin" })}
                    class={this.state.nav_effect == "/admin" ? "active" : ""}
                  >
                    <Link href="/admin/">
                      <a href="#.">
                        <FontAwesomeIcon
                          style={{
                            width: "16px",
                          }}
                          icon={faTachometerAlt}
                        />
                        <span>Dashboard</span>
                      </a>
                    </Link>
                  </li>
                ) : null}

                {this.props.user_data.role_id == "1" ||
                this.props.user_data.role_id == "0" ? (
                  <>
                    <li
                      onClick={() =>
                        this.setState({ nav_effect: "/dashboard/feed" })
                      }
                      class={
                        this.state.nav_effect == "/dashboard/feed"
                          ? "active"
                          : ""
                      }
                    >
                      <Link href="/dashboard/feed">
                        <a>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                            />
                          </svg>
                          <span> Feed</span>{" "}
                        </a>
                      </Link>
                    </li>
                    <li
                      onClick={() =>
                        this.setState({ nav_effect: "/dashboard/TS" })
                      }
                      class={
                        this.state.nav_effect == "/dashboard/TS" ? "active" : ""
                      }
                    >
                      <Link href="/dashboard/TS">
                        <a href="#.">
                          <i class="uil-store"></i>
                          <span>Stylar </span>{" "}
                        </a>
                      </Link>
                    </li>
                    <li
                      onClick={() =>
                        this.setState({ nav_effect: "/dashboard/massages" })
                      }
                      class={
                        this.state.nav_effect == "/dashboard/massages"
                          ? "active"
                          : ""
                      }
                    >
                      <Link href="/dashboard/massages">
                        <a href="#.">
                          <i class="uil-location-arrow"></i>
                          <span>Chat </span>{" "}
                        </a>
                      </Link>
                    </li>
                    <li
                      onClick={() =>
                        this.setState({ nav_effect: "/marketpalce/Orders" })
                      }
                      class={
                        this.state.nav_effect == "/marketpalce/Orders"
                          ? "active"
                          : ""
                      }
                    >
                      <Link href="/marketpalce/Orders">
                        <a href="#.">
                          <FontAwesomeIcon
                            style={{
                              width: "16px",
                            }}
                            icon={faList}
                          />
                          <span> Order </span>{" "}
                        </a>
                      </Link>
                    </li>
                    {this.props.user_data.role_id == "0" ? (
                      <li
                        onClick={() =>
                          this.setState({
                            nav_effect: "/marketpalce/MarketplaceCategories/",
                          })
                        }
                        class={
                          this.state.nav_effect ==
                          "/marketpalce/MarketplaceCategories/"
                            ? "active"
                            : ""
                        }
                      >
                        <Link href="/marketpalce/MarketplaceCategories/">
                          <a href="#.">
                            <i class="uil-store"></i>
                            <span> Explore Market </span>{" "}
                          </a>
                        </Link>
                      </li>
                    ) : null}
                    <li
                      onClick={() =>
                        this.setState({ nav_effect: "/dashboard/settings" })
                      }
                      class={
                        this.state.nav_effect == "/dashboard/settings"
                          ? "active"
                          : ""
                      }
                    >
                      <Link href="/dashboard/settings">
                        <a>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                            />
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          <span> Settings </span>
                        </a>
                      </Link>
                    </li>
                    {this.props.user_data.role_id == "1" ? (
                      <li
                        onClick={() =>
                          this.setState({
                            nav_effect: "/dashboard/settings/sellerLogin",
                          })
                        }
                        class={
                          this.state.nav_effect ==
                          "/dashboard/settings/sellerLogin"
                            ? "active"
                            : ""
                        }
                      >
                        <Link href="/dashboard/settings/sellerLogin">
                          <a href="#.">
                            <i class="uil-store"></i>
                            <span> Add Seller </span>{" "}
                          </a>
                        </Link>
                      </li>
                    ) : null}
                  </>
                ) : null}
                {this.props.user_data.role_id == "2" ? (
                  <>
                    <li
                      onClick={() =>
                        this.setState({ nav_effect: "/admin/categories" })
                      }
                      class={
                        this.state.nav_effect == "/admin/categories"
                          ? "active"
                          : ""
                      }
                    >
                      <Link href="/admin/categories">
                        <a>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                            />
                          </svg>
                          <span>Categories</span>{" "}
                        </a>
                      </Link>
                    </li>
                    <li
                      onClick={() =>
                        this.setState({ nav_effect: "/admin/subcategories" })
                      }
                      class={
                        this.state.nav_effect == "/admin/subcategories"
                          ? "active"
                          : ""
                      }
                    >
                      <Link href="/admin/subcategories">
                        <a href="#.">
                          <i class="uil-store"></i>
                          <span>Sub Sategories</span>{" "}
                        </a>
                      </Link>
                    </li>
                    <li
                      onClick={() =>
                        this.setState({ nav_effect: "/admin/services" })
                      }
                      class={
                        this.state.nav_effect == "/admin/services"
                          ? "active"
                          : ""
                      }
                    >
                      <Link href="/admin/services">
                        <a href="#.">
                          <FontAwesomeIcon
                            style={{
                              width: "16px",
                            }}
                            icon={faList}
                          />
                          <span>service</span>{" "}
                        </a>
                      </Link>
                    </li>

                    <li
                      onClick={() =>
                        this.setState({ nav_effect: "/admin/profile" })
                      }
                      class={
                        this.state.nav_effect == "/admin/profile"
                          ? "active"
                          : ""
                      }
                    >
                      <Link href="/admin/profile">
                        <a href="#.">
                          <FontAwesomeIcon
                            style={{
                              width: "16px",
                            }}
                            icon={faList}
                          />
                          <span>Profile</span>
                        </a>
                      </Link>
                    </li>
                    <li class="active_menu">
                      <a onClick={() => this.submenu()}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span>Users</span>
                      </a>
                      <ul>
                        <Link href="/admin/sellers" class="text-white">
                          <li
                            onClick={() =>
                              this.setState({ nav_effect: "/admin/sellers" })
                            }
                            class={
                              this.state.nav_effect == "/admin/sellers"
                                ? "active"
                                : ""
                            }
                          >
                            <a>Sellers</a>
                          </li>
                        </Link>
                        <Link href="/admin/buyers">
                          <li
                            onClick={() =>
                              this.setState({ nav_effect: "/admin/buyers" })
                            }
                            class={
                              this.state.nav_effect == "/admin/buyers"
                                ? "active"
                                : ""
                            }
                          >
                            <a>Buyers</a>
                          </li>
                        </Link>
                      </ul>
                    </li>
                  </>
                ) : null}
                <li>
                  <hr class="my-2" />
                </li>
                <li onClick={this.hendalLogout}>
                  <Link href="/auth/login">
                    <a>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      <span> Logout </span>{" "}
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div class="main_content">
            <header>
              <div class="header_inner">
                <div class="left-side">
                  <div id="logo" class=" uk-hidden@s">
                    <Link href="/dashboard/feed">
                      <a>
                        <img src="assets/images/Stylicle-Icon.svg" alt="" />
                        <img
                          src="assets/images/footerlogo.svg"
                          class="logo_inverse"
                        />
                      </a>
                    </Link>
                  </div>

                  <div
                    class="triger"
                    uk-toggle="target: #wrapper ; cls: sidebar-active"
                  >
                    <i class="uil-bars"></i>
                  </div>

                  <div class="header_search"></div>
                  {this.props.user_data != 222 &&
                  this.props.user_data.e_wallet != undefined ? (
                    <p>
                      <FontAwesomeIcon
                        style={{
                          width: "16px",
                        }}
                        icon={faWallet}
                      />
                      <b>Wallet balance :</b> $
                      {this.props.user_data.e_wallet[0]?.ballence}
                    </p>
                  ) : null}
                </div>
                <div class="right-side lg:pr-4">
                  <Link href="/dashboard/feed/upload">
                    <a
                      href="#"
                      class="bg-pink-500 flex font-bold  hover:bg-pink-600 hover:text-white inline-block items-center lg:block  mr-4 px-4 py-2 rounded shado text-white"
                    >
                      <ion-icon
                        name="add-circle"
                        class="-mb-1
                                mr-1 opacity-90 text-xl uilus-circle"
                      ></ion-icon>{" "}
                      Upload
                    </a>
                  </Link>
                  {this.props.user_data.role_id != "1" ? (
                    <Link href="/dashboard/TS/upload">
                      <a
                        href="#"
                        class="bg-pink-500 flex font-bold  hover:bg-pink-600 hover:text-white inline-block items-center lg:block  mr-4 px-4 py-2 rounded shado text-white"
                      >
                        <ion-icon
                          name="add-circle"
                          class="-mb-1
                                          mr-1 opacity-90 text-xl uilus-circle"
                        ></ion-icon>{" "}
                        TS Upload
                      </a>
                    </Link>
                  ) : null}
                </div>
              </div>
            </header>

            {this.props.children}
          </div>
        </div>
      </>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    user_data: state.user_data,
    user_fname: state.user_fname,
    user_lname: state.user_lname,
    user_image: state.user_image,
    user_phone: state.user_phone,
    count: state.count,
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    _user_data: (data) => {
      dispatch({ type: "user_data", payload: data });
    },
    _user_fname: (data) => {
      dispatch({ type: "user_fname", payload: data });
    },
    _user_lname: (data) => {
      dispatch({ type: "user_lname", payload: data });
    },
    _user_phone: (data) => {
      dispatch({ type: "user_phone", payload: data });
    },
    _user_image: (data) => {
      dispatch({ type: "user_image", payload: data });
    },
    _user_workinghours: (data) => {
      dispatch({ type: "user_workinghours", payload: data });
    },
    _count: (data) => {
      dispatch({ type: "INCREMENT", payload: data });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
