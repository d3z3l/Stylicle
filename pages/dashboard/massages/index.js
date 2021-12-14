// import "./messenger.css";
import React from "react";
import cookies from "next-cookies";
import Layout from "../../../components/Dashboard/Layout";

import Conversation from "../../../components/conversations/Conversation";
import Message from "../../../components/message/Message";
import ChatOnline from "../../../components/chatOnline/ChatOnline";
import axios from "axios";
import { io } from "socket.io-client";
import cookie from "react-cookies";
const jwt = require("jsonwebtoken");
import config from "../../../config";
import FollowersHelper from "../../../Helpers/FollowersHelper";
import AuthHelper from "../../../Helpers/AuthHelper";
import $ from "jquery";

export default class Messenger extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      conversations: [],
      currentChat: [],
      messages: [],
      newMessage: null,
      arrivalMessage: null,
      onlineuser: [],
      unchateduser: [],
      followers: [],
      arrivalMessage: null,
      user: this.props.user,
      create_conversation: false,
      selected_user: null,
      user_index_to_remove: null,
      recever_prof: {},
      user_prof: {},
    };
    this.scrollRef = React.createRef();
  }
  componentDidMount = async () => {
    await AuthHelper.Get().then((resp) => {
      this.setState({
        user_prof: {
          name: resp.data.data.user.name,
          image: resp.data.data.user.image,
        },
      });
    });
    this.socket = io("ws://localhost:8900");
    this.socket.on("getMessage", (data) => {
      this.arriveMassage(data);
    });
    this.getConversations(this.props.user._id);

    this.socket.emit("addUser", this.props.user._id);
    this.socket.on("getUsers", (users) => {
      FollowersHelper.Get_by_id().then((resp) => {
        var data = resp.data.data.followers;
        var data2 = this.filter(data, users).then((data) => {
          console.log("filter test");
          console.log(data);
          this.setState({ onlineuser: data });
        });
        var data3 = this.filter2(data, this.state.conversations).then(
          (data) => {
            console.log("filter2 test");
            console.log(data);
            this.setState({ unchateduser: data });
          }
        );
      });
    });
  };
  filter2 = async (data, users) => {
    users = users.reverse();
    return new Promise((resolve) => {
      try {
        var data2 = data.filter((f) => {
          let some = users.some((u) => {
            let data4 = u.members.find((m) => {
              return m === f.follower._id;
            });
            return data4 != undefined;
          });
          return some == false;
        });
        // var data2=  data.filter( (f) => {
        //   // console.log(22);
        //   console.log("==================="+f.follower._id);
        //   let some= false
        //   users.forEach((u) => {
        //   console.log("======="+u._id);
        //     let data4=u.members.find((m) => {

        //       console.log(m);
        //       // console.log(m);
        //       // console.log(f.follower._id);
        //       // console.log(m === f.follower._id);
        //       if (m === f.follower._id) {
        //         some=true
        //       }
        //       return m === f.follower._id
        //     })
        //   })
        //   // console.log(some);
        //   return some==false;
        // })
        resolve(data2);
      } catch (e) {
        console.log("Error");
      }
    });
  };
  filter = async (data, users) => {
    return new Promise((resolve) => {
      console.log(users);
      console.log(data);
      try {
        var data2 = data.filter((f) =>
          users.some((u) => u.userId === f.follower._id)
        );
        resolve(data2);
      } catch (e) {
        console.log("Error");
      }
      // setTimeout(() => {
      // }, 2000);
    });
  };
  getConversations = async (id) => {
    try {
      const res = await axios.get(config.URL + "conversations/" + id);
      console.log("fsadfdsgdsf");
      this.setState({ conversations: res.data });
      // setConversations(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  getMessages = async (data, user_Prof) => {
    this.setState({ recever_prof: user_Prof });

    this.state.create_conversation = false;
    this.setState({ currentChat: data });
    try {
      const res = await axios.get(config.URL + "messages/" + data._id);
      this.setState({ messages: res.data });
      this.scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    } catch (err) {
      console.log(err);
    }
  };

  handleSubmit = async (e) => {
    if (this.state.create_conversation) {
      try {
        let data = {
          senderId: this.state.user._id,
          receiverId: this.state.selected_user,
        };
        const res = await axios.post(config.URL + "conversations/", data);
        this.setState({
          currentChat: res.data,
          conversations: [res.data, ...this.state.conversations],
        });
      } catch (err) {
        console.log(err);
      }
      $("#unchat" + this.state.user_index_to_remove).remove();
    }

    // this.setState({unchateduser:this.state.unchateduser.splice(this.state.user_index_to_remove, 1)})

    e.preventDefault();
    const message = {
      sender: this.state.user._id,
      text: this.state.newMessage,
      conversationId: this.state.currentChat._id,
    };

    const receiverId = this.state.currentChat.members.find(
      (member) => member !== this.state.user._id
    );

    this.socket.emit("sendMessage", {
      senderId: this.state.user._id,
      receiverId,
      text: this.state.newMessage,
    });

    try {
      const res = await axios.post(config.URL + "messages/", message);
      this.setState({ messages: [...this.state.messages, res.data] });
    } catch (err) {
      console.log(err);
    }
    this.setState({ newMessage: "" });
    this.scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  arriveMassage = (data) => {
    this.setState({ messages: [...this.state.messages, data] });
    this.scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  conversation_create = (id, i, data) => {
    this.setState({
      recever_prof: data,
      create_conversation: true,
      selected_user: id,
      user_index_to_remove: i,
      messages: [],
    });
  };

  render() {
    return (
      <>
        <Layout>
          <div class="container m-auto pt-5">
            <h1 class="font-semibold lg:mb-6 mb-3 text-2xl my-5"> Messages</h1>

            <div class="lg:flex lg:shadow lg:bg-white lg:space-y-0 space-y-8 rounded-md lg:-mx-0 -mx-5 overflow-hidden lg:dark:bg-gray-800">
              <div class="lg:w-4/12 bg-white border-r overflow-hidden dark:bg-gray-800 dark:border-gray-600">
                <div class="border-b px-4 py-4 dark:border-gray-600">
                  <div class="bg-gray-100 input-with-icon rounded-md dark:bg-gray-700">
                    <input
                      id="autocomplete-input"
                      type="text"
                      placeholder="Search"
                      class="bg-transparent max-h-10 shadow-none"
                    />
                    <i class="icon-material-outline-search"></i>
                  </div>
                </div>

                <div class="pb-16 w-full">
                  <ul class="dark:text-gray-100">
                    {this.state.conversations.map((c) => (
                      <div>
                        <Conversation
                          onPress={this.getMessages.bind(this)}
                          conversation={c}
                          currentUser={this.state.user}
                        />
                      </div>
                    ))}

                    {this.state.user._id != undefined &&
                    this.state.unchateduser.length != 0
                      ? (console.log("this.state.onlineUsers"),
                        console.log(this.state.onlineuser),
                        (
                          <ChatOnline
                            onPress={this.conversation_create.bind(this)}
                            unchateduser={this.state.unchateduser}
                            onlineUsers={this.state.onlineuser}
                            currentId={this.state.user._id}
                            setCurrentChat={this.setCurrentChat}
                          />
                        ))
                      : null}
                  </ul>
                </div>
              </div>

              <div class="lg:w-8/12 bg-white dark:bg-gray-800">
                <div class="px-5 py-4 flex uk-flex-between">
                  <a href="#" class="flex items-center space-x-3">
                    <div class="w-10 h-10 rounded-full relative flex-shrink-0">
                      {this.state.recever_prof?.image ? (
                        <img
                          src={
                            this.state.recever_prof?.image
                              ? config.image_url + this.state.recever_prof.image
                              : config.image_url + "person/noAvatar.png"
                          }
                          alt=""
                          class="h-full rounded-full w-full"
                        />
                      ) : null}
                    </div>
                    <div class="flex-1 min-w-0 relative text-gray-500">
                      <h4 class="font-semibold text-black text-lg">
                        {this.state.recever_prof?.name}
                      </h4>
                    </div>
                  </a>
                </div>

                <div class="border-t dark:border-gray-600 chatBoxTop">
                  {/* dsfdfsdg */}

                  {this.state.messages.map((m) => (
                    <div ref={this.scrollRef}>
                      <Message
                        user_prof={this.state.user_prof}
                        recever_prof={this.state.recever_prof}
                        message={m}
                        own={m.sender === this.state.user._id}
                      />
                    </div>
                  ))}

                  {/* sdfdsfasdfasdf */}
                </div>
                <div class="border-t flex p-6 dark:border-gray-700">
                  <textarea
                    cols="1"
                    rows="1"
                    placeholder="Your Message.."
                    class="border-0 flex-1  min-h-0 resize-none min-w-0 shadow-none dark:bg-transparent"
                    onChange={(e) =>
                      this.setState({ newMessage: e.target.value })
                    }
                    value={this.state.newMessage}
                  ></textarea>
                  <div class="flex h-full space-x-2">
                    <button
                      onClick={this.handleSubmit}
                      type="submit"
                      class="bg-blue-600 font-semibold px-6 py-2 rounded-md text-white"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      </>
    );
  }
}

export async function getServerSideProps(context) {
  const c = cookies(context);
  const myAuthenticationCookie = c.Tokken;

  try {
    const Authenticated = jwt.verify(
      myAuthenticationCookie,
      process.env.APP_SECRET_KEY
    );
    return {
      props: {
        user: Authenticated,
      },
    };
  } catch (error) {
    const { res } = context;
    res.setHeader("location", "/auth/login");
    res.statusCode = 302;
    res.end();
    return;
  }
}
