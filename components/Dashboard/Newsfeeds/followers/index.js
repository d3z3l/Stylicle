import React from "react";
import Link from "next/link";
import config from "../../../../config";
import Comments from "../comments";
import FollowersHelper from "../../../../Helpers/FollowersHelper";
import LikesHelper from "../../../../Helpers/LikesHelper";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import the FontAwesomeIcon component
import {
  faSearch,
  faThumbsDown,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons"; // import the icons you need

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      followers: [],
     
    };
  }
  componentDidMount=()=>{
    this.hendalFollowers_get()
  }
  hendalFollowers_get=()=>{
    FollowersHelper.Get_by_id().then((resp)=>{
      console.log(resp.data.data.followers);
      this.setState({followers:resp.data.data.followers})
    })
  }
  
  

  render() {
    return (
      <>
        <div class="lg:w-5/12">
                <div class="bg-white dark:bg-gray-900 shadow-md rounded-md overflow-hidden">
                  <div class="bg-gray-50 dark:bg-gray-800 border-b border-gray-100 flex items-baseline justify-between py-4 px-6 dark:border-gray-800">
                    <h3 class="font-semibold ">Followers</h3>
                    {/* <a href="#"> Refresh</a> */}
                  </div>

                  <div class="divide-gray-300 divide-gray-50 divide-opacity-50 divide-y px-4 dark:divide-gray-800 dark:text-gray-100">
                    {
                      this.state.followers.map((val,index)=>(
                        console.log(val),
                      <div class="flex items-center justify-between py-3">
                        <div class="flex flex-1 items-center space-x-4">
                          <a href="profile.html">
                            <img
                              src={config.image_url + "" + val.follower.image}
                              class="bg-gray-200 rounded-full w-10 h-10"
                            />
                          </a>
                          <div class="flex flex-col">
                            <span class="block capitalize font-semibold">
                             {val.follower.name}
                            </span>
                            <span class="block capitalize text-sm">
                            {val.follower.address}
                            </span>
                          </div>
                        </div>

                        {/* <a
                          href="#"
                          class="border border-gray-200 font-semibold px-4 py-1 rounded-full hover:bg-pink-600 hover:text-white hover:border-pink-600 dark:border-gray-800"
                        >
                          {" "}
                          Follow{" "}
                        </a> */}
                      </div>
                      ))
                    }
                   </div>
                </div>

                
              </div>

      </>
    );
  }
}
