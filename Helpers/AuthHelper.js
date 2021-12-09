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
const Signup_group = async (data) => {
  return new Promise((resolve, reject) => {
    var path="users/register"
    var type='post'
    fetch(config.URL + path, {
      method: type,
      headers:{"Content-Type":"application/json","Authorization": cookie.load('Tokken')},
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
const getAllsellers = async (category='',page='',_type='',data ) => {
    // var type=type
  return new Promise((resolve, reject) => {
    var path="users/getAllsellers"
    console.log(_type);
    console.log(category!='');
    if (category!='') {
      if (_type=='service') {
        path+='?service_id='+category
      }else{
        path+='?category_id='+category
      }
    }
    if (page!='') {
       path+='?page='+page
    }
    console.log(path);
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
const getAllsellersAdmin = async (category='',page='',_type='' ) => {
    // var type=type
  return new Promise((resolve, reject) => {
    var path="users/getAllsellersAdmin"
    console.log(_type);
    if (page!='') {
       path+='?page='+page
    }
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
const getAllbuyersAdmin = async (category='',page='',_type='' ) => {
    // var type=type
  return new Promise((resolve, reject) => {
    var path="users/getAllbuyersAdmin"
    console.log(_type);
    if (page!='') {
       path+='?page='+page
    }
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
const Update_temp = async (data) => {
  return new Promise((resolve, reject) => {
    var path="users/"
    var type='PATCH'
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
const Update = async (data) => {
  return new Promise((resolve, reject) => {
    if (data.id!=undefined) {
      var path="users/"+data.id
    } else {
      var path="users/"
    }
   
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
const Update_by_id = async (id,data) => {
  return new Promise((resolve, reject) => {
    var path="users/"+id
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
const groups = async () => {
  return new Promise((resolve, reject) => {
    var path="users/groups"
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
        reject("Promise rejected");
      });
  });
};
const groups_tocken = async (data) => {
  return new Promise((resolve, reject) => {
    var path="users/groups_tocken"
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
        // reject("Promise rejected");
      });
  });
};
const ResetPass = async (data) => {
  return new Promise((resolve, reject) => {
    var path="users/password/"
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
        reject("Promise rejected");
      });
  });
};

export default {
  Login,
  Varification,
  Signup,
  Signup_group,
  Get,
  Update,
  Get_by_id,
  getAllsellers,
  getAllsellersAdmin,
  getAllbuyersAdmin,
  ResetPass,
  Update_temp,
  Update_by_id,
  groups,
  groups_tocken
};
