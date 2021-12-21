import React from "react";
import Link from "next/link";
import config from "../../../../config";
import Comments from "../comments";
import CommentsHelper from "../../../../Helpers/CommentsHelper";
import LikesHelper from "../../../../Helpers/LikesHelper";
import NewsfeedsHelper from "../../../../Helpers/NewsfeedsHelper";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import the FontAwesomeIcon component
var moment = require("moment");

import {
  faSearch,
  faThumbsDown,
  faThumbsUp,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons"; // import the icons you need

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      comment: "",
      likes: this.props.data.likes,
      allComments: this.props.data.commentsDeatils,
      likeStatus: false,
      featuredStatus: false,
    };
  }
  componentDidMount = async () => {
    // var myString = "user-60e82ca25b798c0b8c41a849-1628606796145.mp4"
    // alert(myString.substring(myString.lastIndexOf(".")+1)=='mp4')
    this.likeverify();
  };
  commenthendal = async () => {
    // alert(this.props.type)
    // return false
    let data = {
      text: this.state.comment,
      id: this.props.data._id,
    };
    if (this.props.type != "ts") {
      await CommentsHelper.Create(data).then((resp) => {
        console.log("resp.data.data.commentsnew");
        console.log(resp.data.data.commentsnew);
        this.setState({
          allComments: [resp.data.data.commentsnew, ...this.state.allComments],
        });
      });
    } else {
      await CommentsHelper.Create_ts(data).then((resp) => {
        console.log("resp.data.data.commentsnew");
        console.log(resp.data.data.commentsnew);
        this.setState({
          allComments: [resp.data.data.commentsnew, ...this.state.allComments],
        });
      });
    }
    console.log("this.state.allComments");
    console.log(this.state.allComments);
  };
  reacthendal = async (text) => {
    // alert(this.props.type)
    // return false
    let data = {
      text: text,
      id: this.props.data._id,
    };
    if (this.props.type != "ts") {
      await CommentsHelper.Create(data).then((resp) => {
        console.log("resp.data.data.commentsnew");
        console.log(resp.data.data.commentsnew);
        this.setState({
          allComments: [resp.data.data.commentsnew, ...this.state.allComments],
        });
      });
    } else {
      await CommentsHelper.Create_ts(data).then((resp) => {
        console.log("resp.data.data.commentsnew");
        console.log(resp.data.data.commentsnew);
        this.setState({
          allComments: [resp.data.data.commentsnew, ...this.state.allComments],
        });
      });
    }
    console.log("this.state.allComments");
    console.log(this.state.allComments);
  };
  likehendal = async (id) => {
    this.setState({ likes: this.state.likes + 1, likeStatus: true });
    try {
      let data = {};
      if (this.props.type != "ts") {
        data = {
          Activity_id: this.props.data._id,
          activity_type: "1",
        };
      } else {
        data = {
          Activity_id: this.props.data._id,
          activity_type: "2",
        };
      }
      await LikesHelper.Create(data).then((resp) => {
        this.setState({
          like_id: resp.data.data["likes"]._id,
        });
      });
    } catch (error) {}
  };
  featuredhendal = async (id) => {
    if (this.props.user_data.role_id != "2") {
      return false;
    }
    this.setState({ featuredStatus: false });
    let data = {
      featured: "1",
      post_id: this.props.data._id,
    };
    await NewsfeedsHelper.Update_featured(data).then((resp) => {
      this.setState({
        featuredStatus: true,
      });
    });
  };
  un_featuredhendal = async (id) => {
    if (this.props.user_data.role_id != "2") {
      return false;
    }
    this.setState({ featuredStatus: false });
    let data = {
      featured: "0",
      post_id: this.props.data._id,
    };
    await NewsfeedsHelper.Update_featured(data).then((resp) => {
      this.setState({
        featuredStatus: false,
      });
    });
  };
  unlikehendal = async (id) => {
    this.setState({ likes: this.state.likes - 1, likeStatus: false });
    let data = {};
    if (this.props.type != "ts") {
      data = {
        Activity_id: this.props.data._id,
        activity_type: "1",
        id: this.state.like_id,
      };
    } else {
      data = {
        Activity_id: this.props.data._id,
        activity_type: "2",
        id: this.state.like_id,
      };
    }

    await LikesHelper.Unlike(data).then((resp) => {});
  };
  likeverify = async (id) => {
    let data = {};
    if (this.props.type != "ts") {
      data = {
        Activity_id: this.props.data._id,
        activity_type: "1",
        id: "60a38c29f1b5b618593e5a4f",
      };
    } else {
      data = {
        Activity_id: this.props.data._id,
        activity_type: "2",
        id: "60a38c29f1b5b618593e5a4f",
      };
    }

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
    if (this.state.likeStatus || id == "1") {
      return (
        <a
          onClick={() => {
            setTimeout(() => {
              this.unlikehendal();
            }, 1000);
          }}
          class="flex items-center space-x-2"
        >
          <div class="p-2 rounded-full text-black pointer">
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
        <a
          onClick={() => {
            setTimeout(() => {
              this.likehendal();
            }, 1000);
          }}
          class="flex items-center space-x-2"
        >
          <div class="p-2 rounded-full text-black pointer">
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
  featuredUnfeatured = (id) => {
    console.log(id);
    if (this.state.featuredStatus || id == "1") {
      return (
        <i
          onClick={() => this.featuredhendal()}
          class="icon-feather-heart Primery_color text-2xl hover:bg-gray-200 rounded-full p-2 transition -mr-1 dark:hover:bg-gray-700 pr"
        ></i>
      );
    } else {
      return (
        <i
          onClick={() => this.un_featuredhendal()}
          class="icon-feather-heart  text-2xl hover:bg-gray-200 rounded-full p-2 transition -mr-1 dark:hover:bg-gray-700 pr"
        ></i>
      );
    }
  };

  render() {
    return (
      <>
        <div class="bg-white shadow rounded-md dark:bg-gray-900 -mx-2 lg:mx-0">
          <div class="flex justify-between items-center px-4 py-3">
            <div class="flex flex-1 items-center space-x-4">
              <div class="bg-gradient-to-tr from-yellow-600 to-pink-600 p-0.5 rounded-full">
                <img
                  src={config.image_url + this.props.data.user.image}
                  class="bg-gray-200 border border-white rounded-full w-12 h-12"
                />
              </div>
              <span class="block capitalize font-semibold dark:text-gray-100">
                {this.props.data.user.name}
              </span>
              <div class="pt-0">
                {moment(new Date(this.props.data.time * 1000)).format(
                  "Do MMM YYYY - h:mm a"
                )}
              </div>
            </div>
            <div>
              <a>{this.featuredUnfeatured(this.props.data.featured)}</a>
              <div
                class="bg-white w-56 shadow-md mx-auto p-2 mt-12 rounded-md text-gray-500 hidden text-base border border-gray-100 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700"
                uk-drop="mode: hover;pos: top-right"
              >
                <ul class="space-y-1">
                  <li>
                    <a class="flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md dark:hover:bg-gray-800">
                      <i class="uil-share-alt mr-1"></i> Share
                    </a>
                  </li>
                  <li>
                    <a class="flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md dark:hover:bg-gray-800">
                      <i class="uil-edit-alt mr-1"></i> Edit Post
                    </a>
                  </li>
                  <li>
                    <a class="flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md dark:hover:bg-gray-800">
                      <i class="uil-comment-slash mr-1"></i> Disable comments
                    </a>
                  </li>
                  <li>
                    <a class="flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md dark:hover:bg-gray-800">
                      <i class="uil-favorite mr-1"></i> Add favorites
                    </a>
                  </li>
                  <li>
                    <hr class="-mx-2 my-2 dark:border-gray-800" />
                  </li>
                  <li>
                    <a class="flex items-center px-3 py-2 text-red-500 hover:bg-red-100 hover:text-red-500 rounded-md dark:hover:bg-red-600">
                      <i class="uil-trash-alt mr-1"></i> Delete
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="py-3 px-4 space-y-3">{this.props.data.text}</div>
          <div style={{ width: "100%", overflow: " hidden" }}>
            {this.props.data.media.substring(
              this.props.data.media.lastIndexOf(".") + 1
            ) == "mp4" ? (
              <>
                <video width="100%" max-height="auto" autoplay muted>
                  <source
                    src={config.image_url + this.props.data.media}
                    type="video/mp4"
                  />
                </video>
              </>
            ) : (
              <img
                style={{ width: "100%" }}
                src={config.image_url + "" + this.props.data.media}
                alt=""
              />
            )}
          </div>

          <div class="py-3 px-4 space-y-3">
            <div class="row">
              <div class="col-6 space-x-4 lg:font-bold">
                {this.likeUnlike(this.props.data._id)}
              </div>
              <div class="col-6 text-right">
                <div class="items-center space-x-3">
                  <div class="dark:text-gray-100">
                    Liked by
                    <strong> {this.state.likes} </strong>
                  </div>
                </div>
              </div>
            </div>

            {/* {this.props.data.text} */}

            <div class="border-t pt-4 space-y-4 dark:border-gray-600">
              {this.state.allComments.map((item, key) => (
                <Comments data={item} />
              ))}
            </div>
            {this.props.user_data.role_id == "1" && this.props.type == "ts" ? (
              <>
                <hr />
                <div class="d-flex justify-content-around m-10">
                  <button
                    onClick={() => this.reacthendal("Yes")}
                    type="button"
                    class="btn px-5 bg-gray-500 text-white rounded-lg"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => this.reacthendal("Can Try")}
                    type="button"
                    class="btn px-5 bg-gray-500 text-white rounded-lg"
                  >
                    Can Try
                  </button>
                  <button
                    onClick={() => this.reacthendal("No")}
                    type="button"
                    class="btn px-5 bg-gray-500 text-white rounded-lg"
                  >
                    No
                  </button>
                  {/* <button
                    onClick={() => this.reacthendal("Unfortunately")}
                    type="button"
                    class="btn btn-lg btn-primary Primery_color_bg px-5"
                  >
                    Unfortunately
                  </button> */}
                </div>
              </>
            ) : (
              <div class="bg-gray-100 bg-gray-100 rounded-full rounded-md relative dark:bg-gray-800">
                <input
                  onChange={(event) => {
                    this.setState({ comment: event.target.value });
                  }}
                  onKeyPress={(event) => {
                    if (
                      event.key === "Enter" &&
                      this.state.comment.length != 0
                    ) {
                      this.commenthendal();
                    }
                  }}
                  type="text"
                  placeholder="Add your Comment.."
                  class="bg-transparent max-h-10 shadow-none"
                />
                <div class="absolute bottom-0 flex h-full items-center right-0 right-3 text-xl space-x-2">
                  <a>
                    <FontAwesomeIcon
                      onClick={() => {
                        if (this.state.comment.length != 0) {
                          this.commenthendal();
                        }
                      }}
                      style={{
                        color:
                          this.state.comment.length != 0
                            ? config.primaryColor
                            : "#666666",
                        fontSize: "15px",
                        cursor: "pointer",
                      }}
                      icon={faPaperPlane}
                    />
                  </a>
                </div>
              </div>
            )}
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
    user_workinghours: state.user_workinghours,
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    _user_data: (data) => {
      dispatch({ type: "user_data", payload: data });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
