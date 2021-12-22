// import Cookies from "js-cookie";
import cookie from 'react-cookies'

import Router from 'next/router'

const jwt = require('jsonwebtoken');

import config from "../config";
const Create = async (data) => {
  return new Promise((resolve, reject) => {
    var path="emploies/"
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
const Manual = async (data) => {
  return new Promise((resolve, reject) => {
    var path="service_time_slots/manual"
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
const Delete = async (id) => {
  return new Promise((resolve, reject) => {
    var path="emploies/"+id
    var type='Delete'
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
const Update = async (id,data) => {
  return new Promise((resolve, reject) => {
    var path="emploies/"+id
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
  Create,
  Update,
  Delete
};
