import React from "react";
import Link from "next/link";
import config from "../../../../config";
import Comments from "../comments";
import CommentsHelper from "../../../../Helpers/CommentsHelper";
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
      toggle: false,
      comment: "",
      likes: this.props.data.likes,
      allComments: this.props.data.commentsDeatils,
      likeStatus: false,
      like_id: "",
    };
  }
  componentDidMount = async () => {
    this.likeverify();
  };
  commenthendal = async () => {
    let data = {
      text: this.state.comment,
      id: this.props.data._id,
    };
    await CommentsHelper.Create(data).then((resp) => {
      console.log("resp.data.data.commentsnew");
      console.log(resp.data.data.commentsnew);
      this.setState({
        allComments: [resp.data.data.commentsnew, ...this.state.allComments],
      });
    });
    console.log("this.state.allComments");
    console.log(this.state.allComments);
  };
  likehendal = async (id) => {
    this.setState({ likes: this.state.likes + 1, likeStatus: true });
    let data = {
      Activity_id: this.props.data._id,
      activity_type: "1",
    };
    await LikesHelper.Create(data).then((resp) => {
      this.setState({
        like_id: resp.data.data['likes']._id,
      })
    });
  };
  unlikehendal = async (id) => {
    this.setState({ likes: this.state.likes - 1, likeStatus: false });
    let data = {
      Activity_id: this.props.data._id,
      activity_type: "1",
      id: this.state.like_id,
    };
    await LikesHelper.Unlike(data).then((resp) => {});
  };
  likeverify = async (id) => {
    let data = {
      Activity_id: this.props.data._id,
      activity_type: "1",
      id: "60a38c29f1b5b618593e5a4f",
    };
    await LikesHelper.Varify(data).then((resp) => {
      console.log(resp.data.data.data.length);
      if (resp.data.data.data.length > 0) {
        this.setState({
          likeStatus: true,
          like_id: resp.data.data.data[0]._id,
        });
      }
    });
  };
  likeUnlike = (id) => {
    if (this.state.likeStatus) {
      return (
        <a  class="flex items-center space-x-2">
          <div onClick={this.unlikehendal} class="p-2 rounded-full text-black pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              width="22"
              height="22"
              class="dark:text-gray-100 Primery_color"
            >
              <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
            </svg>
          </div>
          <div> Like</div>
        </a>
      );
    } else {
      return (
        <a  class="flex items-center space-x-2">
          <div onClick={this.likehendal} class="p-2 rounded-full text-black pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              width="22"
              height="22"
              class="dark:text-gray-100"
            >
              <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
            </svg>
          </div>
          <div> Like</div>
        </a>
      );
    }
  };

  render() {
    return (
      <>
        <div class="bg-white shadow rounded-md dark:bg-gray-900 -mx-2 lg:mx-0">
          <div class="flex justify-between items-center px-4 py-3">
            <div class="flex flex-1 items-center space-x-4">
              <a >
                <div class="bg-gradient-to-tr from-yellow-600 to-pink-600 p-0.5 rounded-full">
                  <img
                    src={config.image_url + this.props.data.user.image}
                    class="bg-gray-200 border border-white rounded-full w-8 h-8"
                  />
                </div>
              </a>
              <span class="block capitalize font-semibold dark:text-gray-100">
                {this.props.data.user.name}
              </span>
            </div>
            <div>
              <a >
                <i class="icon-feather-more-horizontal text-2xl hover:bg-gray-200 rounded-full p-2 transition -mr-1 dark:hover:bg-gray-700"></i>
              </a>
              <div
                class="bg-white w-56 shadow-md mx-auto p-2 mt-12 rounded-md text-gray-500 hidden text-base border border-gray-100 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700"
                uk-drop="mode: hover;pos: top-right"
              >
                <ul class="space-y-1">
                  <li>
                    <a
                      
                      class="flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md dark:hover:bg-gray-800"
                    >
                      <i class="uil-share-alt mr-1"></i> Share
                    </a>
                  </li>
                  <li>
                    <a
                      
                      class="flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md dark:hover:bg-gray-800"
                    >
                      <i class="uil-edit-alt mr-1"></i> Edit Post
                    </a>
                  </li>
                  <li>
                    <a
                      
                      class="flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md dark:hover:bg-gray-800"
                    >
                      <i class="uil-comment-slash mr-1"></i> Disable comments
                    </a>
                  </li>
                  <li>
                    <a
                      
                      class="flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md dark:hover:bg-gray-800"
                    >
                      <i class="uil-favorite mr-1"></i> Add favorites
                    </a>
                  </li>
                  <li>
                    <hr class="-mx-2 my-2 dark:border-gray-800" />
                  </li>
                  <li>
                    <a
                      
                      class="flex items-center px-3 py-2 text-red-500 hover:bg-red-100 hover:text-red-500 rounded-md dark:hover:bg-red-600"
                    >
                      <i class="uil-trash-alt mr-1"></i> Delete
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div uk-lightbox>
            <a href="/images/post/img4.jpg">
              <img src={config.image_url + "" + this.props.data.media} alt="" />
            </a>
          </div>

          <div class="py-3 px-4 space-y-3">
            <div class="flex space-x-4 lg:font-bold">
              {this.likeUnlike(this.props.data._id)}
              <a  class="flex items-center space-x-2">
                <div class="p-2 rounded-full text-black">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    width="22"
                    height="22"
                    class="dark:text-gray-100"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <div> Comment</div>
              </a>
              <a
                
                class="flex items-center space-x-2 flex-1 justify-end"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  width="22"
                  height="22"
                  class="dark:text-gray-100"
                >
                  <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                </svg>
                <div> Share</div>
              </a>
            </div>
            <div class="flex items-center space-x-3">
              <div class="flex items-center">
                <img
                  src="/images/avatars/avatar-1.jpg"
                  alt=""
                  class="w-6 h-6 rounded-full border-2 border-white dark:border-gray-900"
                />
                <img
                  src="/images/avatars/avatar-4.jpg"
                  alt=""
                  class="w-6 h-6 rounded-full border-2 border-white dark:border-gray-900 -ml-2"
                />
                <img
                  src="/images/avatars/avatar-2.jpg"
                  alt=""
                  class="w-6 h-6 rounded-full border-2 border-white dark:border-gray-900 -ml-2"
                />
              </div>
              <div class="dark:text-gray-100">
                Liked <strong> Johnson</strong> and
                <strong> {this.state.likes} Others </strong>
              </div>
            </div>
            <div class="border-t pt-4 space-y-4 dark:border-gray-600">
              {this.state.allComments.map((item, key) => (
                <Comments data={item} />
              ))}
            </div>

            <div class="bg-gray-100 bg-gray-100 rounded-full rounded-md relative dark:bg-gray-800">
              <input
                onChange={(event) => {
                  this.setState({ comment: event.target.value });
                }}
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    this.commenthendal();
                  }
                }}
                type="text"
                placeholder="Add your Comment.."
                class="bg-transparent max-h-10 shadow-none"
              />
              <div class="absolute bottom-0 flex h-full items-center right-0 right-3 text-xl space-x-2">
                <a >
                  <i class="uil-image"></i>
                </a>
                <a >
                  <i class="uil-video"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
