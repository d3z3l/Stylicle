import React from "react";
import config from "../../config";
import Link from "next/link";

import Image from "next/image";
import CategoriesHelper from "../../Helpers/CategoriesHelper";
import { connect } from "react-redux";
import AuthHelper from "../../Helpers/AuthHelper";
import { faCar,faPlus,faStar,faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
 class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        toggle: false,
        categories:[],
        selecter_category:''
    };
}
componentDidMount=()=>{
  this.hendalGetCaterory()
}
hendalgetAllsellers = (cat='') => {
  var _type=''
  // if (this.props.service_filter!='') {
  //   type='service'
  //   cat=this.props.service_filter
  // }
  AuthHelper.getAllsellers(cat,0,_type).then((resp)=>{
    if (cat!='') {
      this.props._category_filter(cat)
    }
    // this.setState({Sellers:resp.data.data.user})
    this.props._pagenate_count(resp.data.data.user_count)
    this.props._sellers_list(resp.data.data.user)
    // console.log(resp.data.data.user);
  })
};
hendalGetCaterory = () => {
    let categories=''
    CategoriesHelper.Get().then((resp) => {
      // for (let i = 0; i < resp.data.data.categories.length; i++) {
        this.setState({categories:resp.data.data.categories})
      // }
    });
  };

  hendalgetAllsellers_service_filter = (filter) => {
    
      let type='service'
      let cat=filter
    AuthHelper.getAllsellers(cat,0,type).then((resp)=>{
    // AuthHelper.getAllsellers(this.props.category_filter,page).then((resp)=>{
      // this.setState({Sellers:resp.data.data.user})
      this.props._sellers_list(resp.data.data.user)
      this.props._pagenate_count(resp.data.data.user_count)
      console.log(this.props.pagenate_count);
    })
  };
  render() {
    return (
      <footer>
        
          <div class="container">
            <div class="row">
            {
              this.state.categories.map((item,key1)=>(
                key1<6?
                <Link href="/marketpalce/MarketplaceCategories" >
                  <div  class="col">
                    <h1 onClick={()=> {
                      this.setState({selecter_category:item._id})
                      this.hendalgetAllsellers(item._id)}} 
                    >{item.title}</h1>
                    <ul>
                    {
                      item.subcategories.map((item2,key2)=>(
                        key2<1?
                        item2.services.map((item3,key3)=>(
                          key3<7?
                          <li>
                              <a onClick={()=>[ this.props._service_filter(item3._id),this.hendalgetAllsellers_service_filter(item3._id) ]} href="#.">{item3.title}</a>
                          </li>
                          :null
                          
                        )):null
                      ))
                    }
                    </ul>
                  </div>
                </Link>
                :null
              ))
            }
              
              
            </div>
          </div>
          <div class="bottom_footer">
            <div class="container">
              <div class="row">
                <div class="col-md-6">
                  <ul class="footerlinks">
                    <li>
                      <Link href="/Pages/About" >
                          <a href="">About Us </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/Pages/Privacy" >
                            <a href="">Privacy Policy</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/Pages/TermsofService" >
                            <a href="">Terms of Service</a>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div class="col-md-6">
                  <div class="appbtn">
                    <a href="#.">
                      <Image
                        width={500}
                        height={500}
                        src="/images/IOS-App-Store-Icon.svg"
                        alt=""
                      />
                    </a>
                    <a href="#.">
                      <Image
                        width={500}
                        height={500}
                        src="/images/Android-App-Store-Icon.svg"
                        alt=""
                      />
                    </a>
                  </div>
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="col-md-6">
                  <p>
                    <Image
                      width={50}
                      height={50}
                      style={{ width: "50px" }}
                      src="/images/footerlogo.svg"
                      alt=""
                    />{" "}
                    <span>© Stylicle. {new Date().getFullYear()}</span>
                  </p>
                </div>
                <div class="col-md-6 footer_social">
                  <ol>
                    <li>
                      <a href="#.">
                      <svg xmlns="http://www.w3.org/2000/svg" id="Capa_1" enable-background="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512"><path d="m512 256c0-141.4-114.6-256-256-256s-256 114.6-256 256 114.6 256 256 256c1.5 0 3 0 4.5-.1v-199.2h-55v-64.1h55v-47.2c0-54.7 33.4-84.5 82.2-84.5 23.4 0 43.5 1.7 49.3 2.5v57.2h-33.6c-26.5 0-31.7 12.6-31.7 31.1v40.8h63.5l-8.3 64.1h-55.2v189.5c107-30.7 185.3-129.2 185.3-246.1z"/></svg>
                      </a>
                    </li>
                    <li>
                      <a href="#.">
                      <svg xmlns="http://www.w3.org/2000/svg" height="512pt" viewBox="0 0 512 512" width="512pt"><path d="m256 0c-141.363281 0-256 114.636719-256 256s114.636719 256 256 256 256-114.636719 256-256-114.636719-256-256-256zm116.886719 199.601562c.113281 2.519532.167969 5.050782.167969 7.59375 0 77.644532-59.101563 167.179688-167.183594 167.183594h.003906-.003906c-33.183594 0-64.0625-9.726562-90.066406-26.394531 4.597656.542969 9.277343.8125 14.015624.8125 27.53125 0 52.867188-9.390625 72.980469-25.152344-25.722656-.476562-47.410156-17.464843-54.894531-40.8125 3.582031.6875 7.265625 1.0625 11.042969 1.0625 5.363281 0 10.558593-.722656 15.496093-2.070312-26.886718-5.382813-47.140624-29.144531-47.140624-57.597657 0-.265624 0-.503906.007812-.75 7.917969 4.402344 16.972656 7.050782 26.613281 7.347657-15.777343-10.527344-26.148437-28.523438-26.148437-48.910157 0-10.765624 2.910156-20.851562 7.957031-29.535156 28.976563 35.554688 72.28125 58.9375 121.117187 61.394532-1.007812-4.304688-1.527343-8.789063-1.527343-13.398438 0-32.4375 26.316406-58.753906 58.765625-58.753906 16.902344 0 32.167968 7.144531 42.890625 18.566406 13.386719-2.640625 25.957031-7.53125 37.3125-14.261719-4.394531 13.714844-13.707031 25.222657-25.839844 32.5 11.886719-1.421875 23.214844-4.574219 33.742187-9.253906-7.863281 11.785156-17.835937 22.136719-29.308593 30.429687zm0 0"/></svg>
                      </a>
                    </li>
                    <li>
                      <a href="#.">
                      <svg xmlns="http://www.w3.org/2000/svg" height="512pt" viewBox="0 0 512 512" width="512pt"><path d="m256 0c-141.363281 0-256 114.636719-256 256s114.636719 256 256 256 256-114.636719 256-256-114.636719-256-256-256zm-74.390625 387h-62.347656v-187.574219h62.347656zm-31.171875-213.1875h-.40625c-20.921875 0-34.453125-14.402344-34.453125-32.402344 0-18.40625 13.945313-32.410156 35.273437-32.410156 21.328126 0 34.453126 14.003906 34.859376 32.410156 0 18-13.53125 32.402344-35.273438 32.402344zm255.984375 213.1875h-62.339844v-100.347656c0-25.21875-9.027343-42.417969-31.585937-42.417969-17.222656 0-27.480469 11.601563-31.988282 22.800781-1.648437 4.007813-2.050781 9.609375-2.050781 15.214844v104.75h-62.34375s.816407-169.976562 0-187.574219h62.34375v26.558594c8.285157-12.78125 23.109375-30.960937 56.1875-30.960937 41.019531 0 71.777344 26.808593 71.777344 84.421874zm0 0"/></svg>
                      </a>
                    </li>
                    <li>
                      <a href="#.">
                        <svg xmlns="http://www.w3.org/2000/svg" height="512pt" viewBox="0 0 512 512" width="512pt"><path d="m305 256c0 27.0625-21.9375 49-49 49s-49-21.9375-49-49 21.9375-49 49-49 49 21.9375 49 49zm0 0"/><path d="m370.59375 169.304688c-2.355469-6.382813-6.113281-12.160157-10.996094-16.902344-4.742187-4.882813-10.515625-8.640625-16.902344-10.996094-5.179687-2.011719-12.960937-4.40625-27.292968-5.058594-15.503906-.707031-20.152344-.859375-59.402344-.859375-39.253906 0-43.902344.148438-59.402344.855469-14.332031.65625-22.117187 3.050781-27.292968 5.0625-6.386719 2.355469-12.164063 6.113281-16.902344 10.996094-4.882813 4.742187-8.640625 10.515625-11 16.902344-2.011719 5.179687-4.40625 12.964843-5.058594 27.296874-.707031 15.5-.859375 20.148438-.859375 59.402344 0 39.25.152344 43.898438.859375 59.402344.652344 14.332031 3.046875 22.113281 5.058594 27.292969 2.359375 6.386719 6.113281 12.160156 10.996094 16.902343 4.742187 4.882813 10.515624 8.640626 16.902343 10.996094 5.179688 2.015625 12.964844 4.410156 27.296875 5.0625 15.5.707032 20.144532.855469 59.398438.855469 39.257812 0 43.90625-.148437 59.402344-.855469 14.332031-.652344 22.117187-3.046875 27.296874-5.0625 12.820313-4.945312 22.953126-15.078125 27.898438-27.898437 2.011719-5.179688 4.40625-12.960938 5.0625-27.292969.707031-15.503906.855469-20.152344.855469-59.402344 0-39.253906-.148438-43.902344-.855469-59.402344-.652344-14.332031-3.046875-22.117187-5.0625-27.296874zm-114.59375 162.179687c-41.691406 0-75.488281-33.792969-75.488281-75.484375s33.796875-75.484375 75.488281-75.484375c41.6875 0 75.484375 33.792969 75.484375 75.484375s-33.796875 75.484375-75.484375 75.484375zm78.46875-136.3125c-9.742188 0-17.640625-7.898437-17.640625-17.640625s7.898437-17.640625 17.640625-17.640625 17.640625 7.898437 17.640625 17.640625c-.003906 9.742188-7.898437 17.640625-17.640625 17.640625zm0 0"/><path d="m256 0c-141.363281 0-256 114.636719-256 256s114.636719 256 256 256 256-114.636719 256-256-114.636719-256-256-256zm146.113281 316.605469c-.710937 15.648437-3.199219 26.332031-6.832031 35.683593-7.636719 19.746094-23.246094 35.355469-42.992188 42.992188-9.347656 3.632812-20.035156 6.117188-35.679687 6.832031-15.675781.714844-20.683594.886719-60.605469.886719-39.925781 0-44.929687-.171875-60.609375-.886719-15.644531-.714843-26.332031-3.199219-35.679687-6.832031-9.8125-3.691406-18.695313-9.476562-26.039063-16.957031-7.476562-7.339844-13.261719-16.226563-16.953125-26.035157-3.632812-9.347656-6.121094-20.035156-6.832031-35.679687-.722656-15.679687-.890625-20.6875-.890625-60.609375s.167969-44.929688.886719-60.605469c.710937-15.648437 3.195312-26.332031 6.828125-35.683593 3.691406-9.808594 9.480468-18.695313 16.960937-26.035157 7.339844-7.480469 16.226563-13.265625 26.035157-16.957031 9.351562-3.632812 20.035156-6.117188 35.683593-6.832031 15.675781-.714844 20.683594-.886719 60.605469-.886719s44.929688.171875 60.605469.890625c15.648437.710937 26.332031 3.195313 35.683593 6.824219 9.808594 3.691406 18.695313 9.480468 26.039063 16.960937 7.476563 7.34375 13.265625 16.226563 16.953125 26.035157 3.636719 9.351562 6.121094 20.035156 6.835938 35.683593.714843 15.675781.882812 20.683594.882812 60.605469s-.167969 44.929688-.886719 60.605469zm0 0"/></svg>
                      </a>
                    </li>
                    
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </footer>
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
    _service_filter: (data) => {
      dispatch({ type: "service_filter", payload: data });
    },
  };
};


export default connect(mapStateToProps, mapDispatchToProps) (Footer);