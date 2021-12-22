// import Cookies from "js-cookie";
import cookie from 'react-cookies'
import Router from 'next/router'
const jwt = require('jsonwebtoken');

import config from "../config";
const Get_by_id = async () => {
  return new Promise((resolve, reject) => {
    var path="followers/followers"
    var type='Get'
    fetch(config.URL + path, {
      method: type,
      headers:{"Content-Type":"application/json","Authorization": cookie.load('Tokken')},
      // body:JSON.stringify(data)
    })
      .then((res) => res.json())
      .then(async (resjson) => {
        resolve({
          status: true,
          data: resjson
        });
      })
      .catch((err) => {
        console.log("failed", err);
      });
  });
};
const CreateFollower = async (data) => {
  return new Promise((resolve, reject) => {
    var path="followers/"
    var type='POST'
    fetch(config.URL + path, {
      method: type,
      headers:{"Content-Type":"application/json","Authorization": cookie.load('Tokken')},
      body:JSON.stringify(data)
    })
      .then((res) => res.json())
      .then(async (resjson) => {
        resolve({
          status: true,
          data: resjson
        });
      })
      .catch((err) => {
        console.log("failed", err);
      });
  });
};
const Followersvarify = async (data) => {
  return new Promise((resolve, reject) => {
    var path="followers/followers_varify/"
    var type='POST'
    fetch(config.URL + path, {
      method: type,
      headers:{"Content-Type":"application/json","Authorization": cookie.load('Tokken')},
      body:JSON.stringify(data)
    })
      .then((res) => res.json())
      .then(async (resjson) => {
        resolve({
          status: true,
          data: resjson
        });
      })
      .catch((err) => {
        console.log("failed", err);
      });
  });
};
const Unfollow = async (data) => {
  return new Promise((resolve, reject) => {
    var path="followers/followers_varify/"
    var type='DELETE'
    fetch(config.URL + path, {
      method: type,
      headers:{"Content-Type":"application/json","Authorization": cookie.load('Tokken')},
      body:JSON.stringify(data)
    })
      .then((res) => res.json())
      .then(async (resjson) => {
        resolve({
          status: true,
          data: resjson
        });
      })
      .catch((err) => {
        console.log("failed", err);
      });
  });
};

export default {
  Get_by_id,
  CreateFollower,
  Followersvarify,
  Unfollow,
};
