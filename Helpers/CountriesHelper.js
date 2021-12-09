// import Cookies from "js-cookie";
import cookie from 'react-cookies'

import Router from 'next/router'

const jwt = require('jsonwebtoken');

import config from "../config";

const Get_regions = async () => {
  return new Promise((resolve, reject) => {
    var path="countries/"
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
const GetlatlngByid = async (id) => {
  return new Promise((resolve, reject) => {
    var path="countries/latlng/"+id
    var type='get'
    fetch( config.URL +path, {
      method: type,
      headers:{"Content-Type":"application/json",},
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
  Get_regions,
  GetlatlngByid,
  
};
