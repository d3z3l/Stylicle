// import Cookies from "js-cookie";
import cookie from 'react-cookies'

import Router from 'next/router'

const jwt = require('jsonwebtoken');

import config from "../config";
const Create = async (data) => {
  return new Promise((resolve, reject) => {
    var path="services/"
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
const Get = async () => {
  return new Promise((resolve, reject) => {
    var path="services/"
    var type='GET'
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
const Get_search = async (data) => {
  return new Promise((resolve, reject) => {
    var path="services/"+data
    var type='GET'
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
const Update = async (id,data) => {
  return new Promise((resolve, reject) => {
    var path="services/"+id
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
const Popular_Services = async () => {
  return new Promise((resolve, reject) => {
    var path="services/Popular_Services"
    var type='GET'
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
const Delete = async (id,data) => {
  return new Promise((resolve, reject) => {
    var path="services/"+id
    var type='DELETE'
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
  Create,
  Get,
  Update,
  Popular_Services,
  Delete,
  Get_search
};
