import React from "react";
import Link from "next/link";
import AuthHelper from "../../../Helpers/AuthHelper";
import { connect } from "react-redux";
import cookie from 'react-cookies'

import config from "../../../config";
import CategoriesHelper from "../../../Helpers/CategoriesHelper";
import { faCar,faList,faTachometerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Router from 'next/router'
 class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      user_data:'',
      user_name:'',
      user_image:'',
      sub_menu:0,
      nav_effect:'/admin/'
    };
  }
  componentDidMount=()=>{
    this.setState({nav_effect:Router.asPath})
    console.log(Router.asPath);
          AuthHelper.Varification().then((data)=>{
            if (data.status=='unauthorize') {
              Router.push('/auth/login')
            } 
          })
          this.props._user_data(222)
          this.hendalGetCaterory()
          // setTimeout(() => {
          //   this.nightmode()
          // }, 5000);
          this.getUserHendal()
  }
  getUserHendal= async ()=>{
   await AuthHelper.Get().then((resp)=>{
    this.props._user_fname(resp.data.data.user.name.split(" ").slice(0, -1).join(" "))
    this.props._user_lname(resp.data.data.user.name.split(" ").slice(-1).join(" "))
    this.props._user_phone(resp.data.data.user.phone)
    this.props._user_image(resp.data.data.user.image)
    this.props._user_workinghours(resp.data.data.user.workinghours)
    this.props._user_data(resp.data.data.user);
      // this.setState({
      //   user_name:resp.data.data.user.name,
      //   user_image:resp.data.data.user.image,
      // })
    });    
  }
  nightmode = () => {
    document.documentElement.classList.toggle("dark");  
    if (document.documentElement.classList.contains("dark")) {
      localStorage.setItem("gmtNightMode", true);
      return;
    }
    localStorage.removeItem("gmtNightMode");

   

  }
  daymode = () => {
    setTimeout(() => {
      this.nightmode()
    }, 5000);
    document.documentElement.classList.toggle("dark");
    if (document.documentElement.classList.contains("dark")) {
      localStorage.setItem("gmtNightMode", true);
      return;
    }
    localStorage.removeItem("gmtNightMode");
    
  }
  hendalGetCaterory = () => {
    let categories=''
    CategoriesHelper.Get().then((resp) => {
      for (let i = 0; i < resp.data.data.categories.length; i++) {
        this.setState({categories:resp.data.data.categories})
      }
    });
  };


  count = () => {
    
    // setTimeout(() => {
    this.props._count('fiiidfd');
    // this.props._user_fname('fiiidfd');
    // }, 2000);
  };
  hendalLogout = () => {
    cookie.remove('Tokken', { path: '/' })
  };
  submenu = () => {

    if (this.state.sub_menu=='') {
      $('.active_menu').addClass('active-submenu')
      this.setState({sub_menu:'settinge'})
    } else {
      this.setState({sub_menu:''})
      $('.active-submenu').removeClass('active-submenu')
    }
  };


  render() {

    return (
      <>
        <div id="wrapper">
          <div class="sidebar sidebar_admin">
            <div class="sidebar_header border-b border-gray-200 from-gray-100 to-gray-50 uk-visible@s">
            <Link href="/" >
              <>
              <a >
                <img src="/images/Stylicle-Icon.svg" alt="" />
                <img src="/images/footerlogo.svg" class="logo_inverse" />
              </a>
              
              <h2 class="px-4 welcome" >Welcome <span>Admin</span></h2>
              </>
            </Link>
              {/* <a
              onClick={this.nightmode}
                
                id="night-mode"
                class="btn-night-mode"
                data-tippy-placement="left"
                title="Switch to dark mode"
              ></a> */}
            </div>
            <div class="border-b border-gray-20 flex justify-between items-center p-3 pl-5 relative uk-hidden@s">
              <h3 class="text-xl"> Navigation  </h3>
              <span
                class="btn-mobile"
                uk-toggle="target: #wrapper ; cls: sidebar-active"
              ></span>
            </div>
            <div class="sidebar_inner st_red_bg" data-simplebar>
             
                             
              <ul>
                {
                  this.props.user_data.role_id =='2'?(
                    <li onClick={()=>this.setState({nav_effect:"/admin"})} class={(this.state.nav_effect=="/admin" ? 'active' : '')} >
                    <Link href="/admin/" >
                      <a href="#.">
                        <FontAwesomeIcon
                              style={{
                                width:'16px',
                              }}
                              icon={faTachometerAlt}
                          />
                        <span>Dashboard</span>
                      </a>
                    </Link>
                  </li>
                    
                  ):null
                }
                              
                {
                this.props.user_data.role_id=='2'?(
                  <>
                  <li onClick={()=>this.setState({nav_effect:"/admin/categories"})} class={(this.state.nav_effect=="/admin/categories" ? 'active' : '')} >
                    <Link href="/admin/categories">
                      <a >
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
                  <li onClick={()=>this.setState({nav_effect:"/admin/subcategories"})} class={(this.state.nav_effect=="/admin/subcategories" ? 'active' : '')} >
                    <Link href="/admin/subcategories">
                      <a href="#.">
                      <i class="uil-store"></i>
                        <span>Sub Sategories</span>
                      </a>
                    </Link>
                  </li>
                  {/* <li>
                    <Link href="/admin/subcategories">
                      <a href="#.">
                      <i class="uil-store"></i>
                        <span>Sub Sategories</span>{" "}
                      </a>
                    </Link>
                  </li> */}
                  <li onClick={()=>this.setState({nav_effect:"/admin/services"})} class={(this.state.nav_effect=="/admin/services" ? 'active' : '')} >
                    <Link href="/admin/services" >
                      <a href="#.">
                        <FontAwesomeIcon
                              style={{
                                width:'16px',
                              }}
                              icon={faList}
                          />
                        <span>Service</span>{" "}
                      </a>
                    </Link>
                  </li>
                  
                  <li onClick={()=>this.setState({nav_effect:"/admin/profile"})} class={(this.state.nav_effect=="Profile" ? 'active' : '')} >
                    <Link href="/admin/profile">
                      <a href="#.">
                        <FontAwesomeIcon
                              style={{
                                width:'16px',
                              }}
                              icon={faList}
                          />
                        <span>Profile</span>
                      </a>
                    </Link>
                  </li>
                  <li class="active_menu">
                        <a onClick={()=>this.submenu()} > 
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>Users</span>
                        </a>
                        <ul>
                          <Link href="/admin/sellers" class="text-white" >
                          <li onClick={()=>this.setState({nav_effect:"/admin/sellers"})} class={(this.state.nav_effect=="/admin/sellers" ? 'active' : '')} >
                              <a >Sellers</a>
                            </li></Link>
                          <Link href="/admin/buyers">
                          <li onClick={()=>this.setState({nav_effect:"/admin/buyers"})} class={(this.state.nav_effect=="/admin/buyers" ? 'active' : '')} >
                              <a >Buyers</a>
                            </li></Link>
                        </ul>
                    </li>
                </>
                ):null
              }
                <li>
                  <hr class="my-2" />
                </li>
                <li onClick={this.hendalLogout} >
                  <Link  href="/auth/login">
                    <a >
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
                        <Link href="/dashboard/feed" >
                            <a >
                                <img src="assets/images/Stylicle-Icon.svg" alt=""/>
                                <img src="assets/images/footerlogo.svg" class="logo_inverse"/>
                            </a>
                          </Link>
                        </div>

                        <div class="triger" uk-toggle="target: #wrapper ; cls: sidebar-active">
                            <i class="uil-bars"></i>
                        </div>

                        <div class="header_search">
                            
                            <div class="icon-search">
                                {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg> */}
                            </div>
                        </div>
                       
                          <p><a href="http://www.stylicle.com/" target="blank" ><b>Visit Site</b></a></p>
                         
                
                    </div>
                    <div class="right-side lg:pr-4">
                        {/* <Link href="/dashboard/feed/upload">
                            <a href="#"
                                class="bg-pink-500 flex font-bold  hover:bg-pink-600 hover:text-white inline-block items-center lg:block  mr-4 px-4 py-2 rounded shado text-white">
                                <ion-icon name="add-circle" class="-mb-1
                                mr-1 opacity-90 text-xl uilus-circle"></ion-icon> Upload
                            </a>
                        </Link>
                        {
                          this.props.user_data.role_id !='1'?(
                            <Link href="/dashboard/TS/upload">
                                      <a href="#"
                                          class="bg-pink-500 flex font-bold  hover:bg-pink-600 hover:text-white inline-block items-center lg:block  mr-4 px-4 py-2 rounded shado text-white">
                                          <ion-icon name="add-circle" class="-mb-1
                                          mr-1 opacity-90 text-xl uilus-circle"></ion-icon> TS Upload
                                      </a>
                                  </Link>
                          ):null
                        } */}
                        
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
