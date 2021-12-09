// import Cookies from "js-cookie";
import cookie from 'react-cookies'

import Router from 'next/router'
const jwt = require('jsonwebtoken');

import config from "../config";
const Login = async (data) => {
  return new Promise((resolve, reject) => {
    var path="users/login"
    var type='post'
    fetch(config.URL + path, {
      method: type,
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(data),
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
const Signup = async (data) => {
  return new Promise((resolve, reject) => {
    var path="users/register"
    var type='post'
    fetch(config.URL + path, {
      method: type,
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(data),
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
const Varification = async (data) => {
  return new Promise((resolve, reject) => {
    let status=''
    try {
      let Authenticated = jwt.verify(cookie.load('Tokken'),'erger34I&IY&IYI&TUI&TU^&TT*&G*&G&^T');
      status='authorize'
    } catch (e) {
      status='unauthorize'
    }

    resolve({
      status:status
    })
        
     
  });
};
const Get = async () => {
  return new Promise((resolve, reject) => {
    var path="users/"
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
const getAllsellers = async (category='',page='') => {

  return new Promise((resolve, reject) => {
    var path="users/getAllsellers"
    if (category!='') {
       path+='?category_id='+category
    }
    if (page!='') {
       path+='?page='+page
    }
    // console.log(path);
    var type='get'
    fetch(config.URL + path, {
      method: type,
      headers:{"Content-Type":"application/json"},
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
const Get_by_id = async (id) => {
  return new Promise((resolve, reject) => {
    var path="users/getUser_by_id/"+id
    console.log(path);
    var type='get'
    fetch(config.URL + path, {
      method: type,
      headers:{"Content-Type":"application/json"},
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
const Update = async (data) => {
  return new Promise((resolve, reject) => {
    var path="users/"
    var type='PATCH'
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
  Login,
  Varification,
  Signup,
  Get,
  Update,
  Get_by_id,
  getAllsellers
};
