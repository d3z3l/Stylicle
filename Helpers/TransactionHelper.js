// import Cookies from "js-cookie";
import cookie from 'react-cookies'

import Router from 'next/router'
const jwt = require('jsonwebtoken');

import config from "../config";
const create = async (data) => {
  return new Promise((resolve, reject) => {
    var path="transaction/"
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
const create_admin_temp = async (data) => {
  return new Promise((resolve, reject) => {
    var path="transaction/admin"
    var type='POST'
    fetch(config.URL + path, {
      method: type,
      headers:{"Content-Type":"application/json","Authorization": cookie.load('Tokken_temp')},
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
const create_admin = async (data) => {
  return new Promise((resolve, reject) => {
    var path="transaction/admin"
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
const create_admin_cash = async (data) => {
  return new Promise((resolve, reject) => {
    var path="transaction/admin_cash"
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
const update = async (data) => {
  return new Promise((resolve, reject) => {
    var path="workingHours/"+data._id
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
const get_by_users = async (data) => {
  return new Promise((resolve, reject) => {
    var path="transaction/get_by_users/"+data._id
    var type='GET'
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

export default {
  create,
  update,
  get_by_users,
  create_admin,
  create_admin_cash,
  create_admin_temp
};
