// import "./messenger.css";
import React from "react";
import cookies from "next-cookies";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { io } from "socket.io-client";
import cookie from "react-cookies";
const jwt = require("jsonwebtoken");
import config from "../../config";
import FollowersHelper from "../../Helpers/FollowersHelper";

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
      followers: [],
      arrivalMessage: null,
      user: this.props.user,
    };
    this.scrollRef = React.createRef();
  }
  componentDidMount = async () => {
    console.log(this.props);
    console.log(2323);
    let Authenticated = jwt.verify(
      cookie.load("Tokken"),
      "erger34I&IY&IYI&TUI&TU^&TT*&G*&G&^T"
    );
    this.setState({ user: Authenticated });

    this.socket = io("https://api.stylicle.com:8900");
    this.socket.on("getMessage", (data) => {
      console.log("data");
      console.log(data);

      this.arriveMassage(data);
    });
    this.socket.emit("addUser", Authenticated._id);
    this.socket.on("getUsers", (users) => {
      FollowersHelper.Get_by_id().then((resp) => {
        var data = resp.data.data.followers;
        data = this.filter(data).then((data) => {
          this.setState({ onlineuser: data });
        });
      });
    });
    this.getConversations(Authenticated._id);
  };
  filter = async (data) => {
    return new Promise((resolve) => {
      var users = ["617ff65712a7e802e77738f7"];
      try {
        var data2 = data.filter((f) => users.some((u) => u === f._id));
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
  getMessages = async (data) => {
    this.setState({ currentChat: data });
    try {
      const res = await axios.get(config.URL + "messages/" + data._id);
      this.setState({ messages: res.data });
    } catch (err) {
      console.log(err);
    }
  };

  handleSubmit = async (e) => {
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
      // setMessages([...messages, res.data]);
      // setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };
  arriveMassage = (data) => {
    // this.state.currentChat?.members.includes(data.sender) &&
    this.setState({ messages: [...this.state.messages, data] });
    this.scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  render() {
    return (
      <>
        <div className="messenger">
          <div className="chatMenu">
            <div className="chatMenuWrapper">
              <input
                placeholder="Search for friends"
                className="chatMenuInput"
              />
              {this.state.conversations.map((c) => (
                <div onClick={() => this.getMessages(c)}>
                  <Conversation
                    conversation={c}
                    currentUser={this.state.user}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="chatBox">
            <div className="chatBoxWrapper">
              {this.state.currentChat ? (
                <>
                  <div className="chatBoxTop">
                    {this.state.messages.map((m) => (
                      <div ref={this.scrollRef}>
                        <Message
                          message={m}
                          own={m.sender === this.state.user._id}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="chatBoxBottom">
                    <textarea
                      className="chatMessageInput"
                      placeholder="write something..."
                      onChange={(e) =>
                        this.setState({ newMessage: e.target.value })
                      }
                      value={this.state.newMessage}
                    ></textarea>
                    <button
                      className="chatSubmitButton"
                      onClick={this.handleSubmit}
                    >
                      Send
                    </button>
                  </div>
                </>
              ) : (
                <span className="noConversationText">
                  Open a conversation to start a chat.
                </span>
              )}
            </div>
          </div>
          <div className="chatOnline">
            <div className="chatOnlineWrapper">
              {this.state.user._id != undefined
                ? (console.log("this.state.onlineUsers"),
                  console.log(this.state.onlineuser),
                  (
                    <ChatOnline
                      onlineUsers={this.state.onlineuser}
                      currentId={this.state.user._id}
                      setCurrentChat={this.setCurrentChat}
                    />
                  ))
                : null}
            </div>
          </div>
        </div>
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
