// import Cookies from "js-cookie";
import cookie from 'react-cookies'

import Router from 'next/router'
const jwt = require('jsonwebtoken');

import config from "../config";
const get = async (data) => {
  return new Promise((resolve, reject) => {
    var path="orders/view/reservation"
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
const create = async (data) => {
  return new Promise((resolve, reject) => {
    var path="orders/reservation"
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
  get,
  create
};
