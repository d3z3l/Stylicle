import React from "react";
import $ from "jquery";
import { connect } from "react-redux";
import AuthHelper from "../../Helpers/AuthHelper";
import ServicesHelper from "../../Helpers/ServicesHelper";
import Link from "next/link";
import CategoriesHelper from "../../Helpers/CategoriesHelper";
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      categories: [],
      selecter_category: "",
      login_status: "unauthorize",
      result: [],
      admin: 0,
    };
  }

  componentDidMount = () => {
    this.loginvarify();
    $(".overlay").hide();

    console.log("this.props.category_filter");
    console.log(this.props.category_filter);
    this.getUserHendal();
    this.hendalGetCaterory();
    this.hendalgetAllsellers();
    window.addEventListener("scroll", this.handleScroll);
  };

  loginvarify = () => {
    // alert(33)
    AuthHelper.Varification().then((data) => {
      // console.log(data.status);
      // if (data.status=='unauthorize') {
      this.setState({ login_status: data.status });
      // }else{
      //   return (<p>ooooo</p>);
      // }
    });
  };
  getUserHendal = async () => {
    await AuthHelper.Get().then((resp) => {
      this.props._user_fname(resp.data.data.user.name);
      this.props._user_lname(resp.data.data.user.name);
      this.props._user_phone(resp.data.data.user.phone);
      this.props._user_image(resp.data.data.user.image);
      this.props._user_workinghours(resp.data.data.user.workinghours);
      this.props._user_data(resp.data.data.user);
      if (resp.data.data.user.role_id == "2") {
        this.setState({ admin: 1 });
      }

      // this.setState({
      //   user_name:resp.data.data.user.name,
      //   user_image:resp.data.data.user.image,
      // })
    });
  };
  hendalgetAllsellers = (cat = "") => {
    var _type = "";
    // if (this.props.service_filter!='') {
    //   type='service'
    //   cat=this.props.service_filter
    // }
    AuthHelper.getAllsellers(cat, 0, _type).then((resp) => {
      if (cat != "") {
        this.props._category_filter(cat);
      }
      // this.setState({Sellers:resp.data.data.user})
      this.props._pagenate_count(resp.data.data.user_count);
      this.props._sellers_list(resp.data.data.user);
      // console.log(resp.data.data.user);
    });
  };
  hendalGetCaterory = () => {
    let categories = "";
    CategoriesHelper.Get().then((resp) => {
      // for (let i = 0; i < resp.data.data.categories.length; i++) {
      this.setState({ categories: resp.data.data.categories });
      // }
    });
  };
  componentWillUnmount = () => {
    window.removeEventListener("scroll", this.handleScroll);
  };

  handleScroll = () => {
    var sticky = $("header"),
      scroll = $(window).scrollTop();
    if (scroll >= 70) sticky.addClass("sticky");
    if (scroll <= 1) sticky.removeClass("sticky");
  };
  toggle = () => {
    if (this.state.toggle) {
      $(".dl-menuwrapper .dl-menu").css("opacity", "0");
      $(".overlay").hide();
    } else {
      $(".dl-menuwrapper .dl-menu").css({
        opacity: "1",
        "pointer-events": "auto",
      });

      $(".overlay").show();
    }
    this.setState({ toggle: !this.state.toggle });
  };
  test = () => {};
  search = (val) => {
    if (val.length > 2) {
      ServicesHelper.Get_search(val).then((resp) => {
        this.setState({ result: resp.data.data.services });
      });
    } else if (val.length == 0) {
      this.setState({ result: [] });
    }
    // alert(val.length)
  };

  render() {
    return (
      <>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"
        />
        <script src="/js/jquery.min.js"></script>
        <script src="/js/bootstrap.js"></script>
        <header class="header_home">
          <div class="overlay" onClick={this.toggle} />

          <div class="header-top" id="header">
            <div class="container">
              <div class="row">
                <div class="col-12 p-0">
                  <div class="navigation">
                    <nav class="navbar navbar-expand-lg navbar-light">
                      <a class="navbar-brand">
                        <Link href="/">
                          <img
                            src="/images/logo2.png"
                            alt=""
                            class="img-fluid aun dexlog"
                          />
                        </Link>
                        <Link href="/">
                          <img
                            src="images/Stylicle-Icon.svg"
                            alt=""
                            class="img-fluid moblog"
                          />
                        </Link>
                      </a>
                      <div class="header-form mr-auto">
                        <form>
                          <span
                            class="search-bar-icon"
                            style={{ width: "16px", height: "16px" }}
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M15.8906 14.6531L12.0969 10.8594C12.025 10.7875 11.9313 10.75 11.8313 10.75H11.4187C12.4031 9.60938 13 8.125 13 6.5C13 2.90937 10.0906 0 6.5 0C2.90937 0 0 2.90937 0 6.5C0 10.0906 2.90937 13 6.5 13C8.125 13 9.60938 12.4031 10.75 11.4187V11.8313C10.75 11.9313 10.7906 12.025 10.8594 12.0969L14.6531 15.8906C14.8 16.0375 15.0375 16.0375 15.1844 15.8906L15.8906 15.1844C16.0375 15.0375 16.0375 14.8 15.8906 14.6531ZM6.5 11.5C3.7375 11.5 1.5 9.2625 1.5 6.5C1.5 3.7375 3.7375 1.5 6.5 1.5C9.2625 1.5 11.5 3.7375 11.5 6.5C11.5 9.2625 9.2625 11.5 6.5 11.5Z"></path>
                            </svg>
                          </span>
                          <input
                            type="search"
                            class="form-control"
                            placeholder="Find Services"
                            onChange={(e) => this.search(e.target.value)}
                          />
                          <button class="btn-default">Search</button>
                        </form>
                        <div style={{ width: "50%" }} class="bg-white search-r">
                          {this.state.result.map((val, index) => (
                            <li>{val.title}</li>
                          ))}
                        </div>
                      </div>
                      <button
                        class="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                      >
                        <span class="navbar-toggler-icon"></span>
                      </button>

                      <div
                        class="collapse navbar-collapse"
                        id="navbarSupportedContent"
                      >
                        <ul
                          style={{
                            display: " -webkit-inline-box",
                            float: "right",
                          }}
                          class="navbar-nav ml-auto"
                        >
                          <Link href="/">
                            <li class="nav-item active">
                              <a class="nav-link">Home</a>
                            </li>
                          </Link>

                          <Link href="/explore">
                            <li class="nav-item">
                              <a class="nav-link">Explore</a>
                            </li>
                          </Link>
                          <Link href="/auth/SellerSignup/">
                            <li class="nav-item">
                              <a class="nav-link">Sell Your Services</a>
                            </li>
                          </Link>
                          {this.state.login_status == "unauthorize" ? (
                            <Link href="/auth/login/">
                              <li class="nav-item">
                                <a class="nav-link join-btn">
                                  Sign In/Register
                                </a>
                              </li>
                            </Link>
                          ) : this.state.admin == 0 ? (
                            <Link href="/dashboard/feed">
                              <li class="nav-item">
                                <a class="nav-link join-btn">Dashboard</a>
                              </li>
                            </Link>
                          ) : (
                            <Link href="/admin/">
                              <li class="nav-item">
                                <a class="nav-link join-btn">Dashboard</a>
                              </li>
                            </Link>
                          )}
                        </ul>
                      </div>
                      <div id="dl-menu" class="dl-menuwrapper">
                        <button onClick={this.toggle} class="dl-trigger">
                          Open Menu
                        </button>
                        <div class="clearfix"></div>
                        <ul class="dl-menu">
                          <Link href="/">
                            <li>
                              <a>Home</a>
                            </li>
                          </Link>

                          <Link href="/explore">
                            <li>
                              <a>Explore</a>
                            </li>
                          </Link>
                          <Link href="/auth/login/">
                            <li>
                              <a>Sell your services</a>
                            </li>
                          </Link>
                          <Link href="/auth/login/">
                            {this.state.login_status == "unauthorize" ? (
                              <Link href="/auth/login/">
                                <li class="nav-item">
                                  <a class="nav-link join-btn">
                                    Sign In/Register
                                  </a>
                                </li>
                              </Link>
                            ) : this.state.admin == 0 ? (
                              <Link href="/dashboard/feed">
                                <li class="nav-item">
                                  <a class="nav-link join-btn">Dashboard</a>
                                </li>
                              </Link>
                            ) : (
                              <Link href="/admin/">
                                <li class="nav-item">
                                  <a class="nav-link join-btn">Dashboard</a>
                                </li>
                              </Link>
                            )}
                          </Link>
                        </ul>
                      </div>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="header-bottom">
            <div class="container-fluid">
              <div class="row">
                <div class="col-12">
                  <div class="header-bottom-inner">
                    <ul>
                      {this.state.categories.map((item, key) => (
                        <Link href="/marketpalce/MarketplaceCategories">
                          <li>
                            <a
                              onClick={() => {
                                this.setState({ selecter_category: item._id });
                                this.hendalgetAllsellers(item._id);
                              }}
                              class={`${
                                this.state.selecter_category == item._id ||
                                this.props.category_filter == item._id
                                  ? "Primery_color"
                                  : ""
                              } pb-0`}
                            >
                              {item.title}
                            </a>
                          </li>
                        </Link>
                      ))}

                      {/* <li>
                        <a >Women’s Cut</a>
                      </li>
                      <li>
                        <a >Braids</a>
                      </li>
                      <li>
                        <a >Colour</a>
                      </li>
                      <li>
                        <a >Highlights</a>
                      </li>
                      <li>
                        <a >Face Treatments</a>
                      </li>
                      <li>
                        <a >
                          Tattoo <span>new</span>
                        </a>
                      </li>
                      <li>
                        <a >Hair Treatments</a>
                      </li>
                      <li>
                        <a >Hair Removal</a>
                      </li>
                      <li>
                        <a >Makeup</a>
                      </li> */}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      </>
    );
  }
}
function mapStateToProps(state, ownProps) {
  return {
    user_data: state.user_data,
    user_workinghours: state.user_workinghours,
    sellers_list: state.sellers_list,
    pagenate_count: state.pagenate_count,
    category_filter: state.category_filter,
    service_filter: state.category_filter,
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    _sellers_list: (data) => {
      dispatch({ type: "sellers_list", payload: data });
    },
    _pagenate_count: (data) => {
      dispatch({ type: "pagenate_count", payload: data });
    },
    _category_filter: (data) => {
      dispatch({ type: "category_filter", payload: data });
    },
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
