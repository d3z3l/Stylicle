import React from "react";
import config from "../../../config";
import Layout from "../../../components/Dashboard/Layout";
import Newsfeeds from "../../../components/Dashboard/Newsfeeds/post";
import Followers from "../../../components/Dashboard/Newsfeeds/followers";
import NewsfeedsHelper from "../../../Helpers/NewsfeedsHelper";
import { faEye,faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import $ from 'jquery'
const jwt = require('jsonwebtoken');

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts:''
     
    };
  }
  componentDidMount = (prevProps) => {
    NewsfeedsHelper.Get_all().then((data)=>{
      let info=[]
      let array = data.data.data.newsfeeds_posts
      console.log(array);
      array.forEach((element,index) => {
        info.push(<Newsfeeds data={element}   />)
      });
      
      this.setState({posts:info})
    })
  };

  render() {
    return (
      <>
      <div
          class="modal fade"
          id="exampleModalCenter"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div
            class="modal-dialog modal-dialog-centered bookingmodal modal-lg"
            role="document"
          >
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalCenterTitle">
                  Powered by <img src="images/footerlogo.svg" alt="" />
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
               </div>
            </div>
          </div>
        </div>
        <Layout>
          <div class="container m-auto">
            <h1 class="lg:text-2xl text-lg font-extrabold leading-none text-gray-900 tracking-tight mb-5">
              {" "}
              Feed{" "}
            </h1>
            <div class="lg:flex justify-center lg:space-x-10 lg:space-y-0 space-y-5">
              <div class="space-y-5 flex-shrink-0 lg:w-7/12">
                 {this.state.posts}
                <div class="flex justify-center mt-6" id="toggle" hidden>
                  <a
                    href="#"
                    class="bg-white dark:bg-gray-900 font-semibold my-3 px-6 py-2 rounded-full shadow-md dark:bg-gray-800 dark:text-white"
                  >
                    Load more ..
                  </a>
                </div>
              </div>

              <Followers/>            
            </div>
          </div>
        </Layout>
      </>
    );
  }
}
