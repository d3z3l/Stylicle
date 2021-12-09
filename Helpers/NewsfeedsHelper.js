// import Cookies from "js-cookie";
import cookie from 'react-cookies'

import Router from 'next/router'
const jwt = require('jsonwebtoken');

import config from "../config";
const Get_all = async (data) => {
  return new Promise((resolve, reject) => {
    var path="newsfeeds_posts/allnewsfeeds"
    var type='get'
    fetch(config.URL + path, {
      method: type,
      headers:{"Content-Type":"application/json","Authorization": cookie.load('Tokken')},
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
const Upload = async (data) => {
  return new Promise((resolve, reject) => {
    var path="newsfeeds_posts/"
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

export default {
  Get_all,
  Upload,
};
