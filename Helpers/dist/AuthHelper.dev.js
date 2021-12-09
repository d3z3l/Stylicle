"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactCookies = _interopRequireDefault(require("react-cookies"));

var _router = _interopRequireDefault(require("next/router"));

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import Cookies from "js-cookie";
var jwt = require('jsonwebtoken');

var Login = function Login(data) {
  return regeneratorRuntime.async(function Login$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", new Promise(function (resolve, reject) {
            var path = "users/login";
            var type = 'post';
            fetch(_config["default"].URL + path, {
              method: type,
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(data)
            }).then(function (res) {
              return res.json();
            }).then(function _callee(resjson) {
              return regeneratorRuntime.async(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      resolve({
                        status: true,
                        data: resjson
                      });

                    case 1:
                    case "end":
                      return _context.stop();
                  }
                }
              });
            })["catch"](function (err) {
              console.log("failed", err);
            });
          }));

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var Signup = function Signup(data) {
  return regeneratorRuntime.async(function Signup$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          return _context4.abrupt("return", new Promise(function (resolve, reject) {
            var path = "users/register";
            var type = 'post';
            fetch(_config["default"].URL + path, {
              method: type,
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(data)
            }).then(function (res) {
              return res.json();
            }).then(function _callee2(resjson) {
              return regeneratorRuntime.async(function _callee2$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      resolve({
                        status: true,
                        data: resjson
                      });

                    case 1:
                    case "end":
                      return _context3.stop();
                  }
                }
              });
            })["catch"](function (err) {
              console.log("failed", err);
            });
          }));

        case 1:
        case "end":
          return _context4.stop();
      }
    }
  });
};

var Varification = function Varification(data) {
  return regeneratorRuntime.async(function Varification$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          return _context5.abrupt("return", new Promise(function (resolve, reject) {
            var status = '';

            try {
              var Authenticated = jwt.verify(_reactCookies["default"].load('Tokken'), 'erger34I&IY&IYI&TUI&TU^&TT*&G*&G&^T');
              status = 'authorize';
            } catch (e) {
              status = 'unauthorize';
            }

            resolve({
              status: status
            });
          }));

        case 1:
        case "end":
          return _context5.stop();
      }
    }
  });
};

var Get = function Get() {
  return regeneratorRuntime.async(function Get$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          return _context7.abrupt("return", new Promise(function (resolve, reject) {
            var path = "users/";
            var type = 'get';
            fetch(_config["default"].URL + path, {
              method: type,
              headers: {
                "Content-Type": "application/json",
                "Authorization": _reactCookies["default"].load('Tokken')
              }
            }).then(function (res) {
              return res.json();
            }).then(function _callee3(resjson) {
              return regeneratorRuntime.async(function _callee3$(_context6) {
                while (1) {
                  switch (_context6.prev = _context6.next) {
                    case 0:
                      resolve({
                        status: true,
                        data: resjson
                      });

                    case 1:
                    case "end":
                      return _context6.stop();
                  }
                }
              });
            })["catch"](function (err) {
              console.log("failed", err);
            });
          }));

        case 1:
        case "end":
          return _context7.stop();
      }
    }
  });
};

var getAllsellers = function getAllsellers() {
  var category,
      page,
      type,
      _args9 = arguments;
  return regeneratorRuntime.async(function getAllsellers$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          category = _args9.length > 0 && _args9[0] !== undefined ? _args9[0] : '';
          page = _args9.length > 1 && _args9[1] !== undefined ? _args9[1] : '';
          type = _args9.length > 2 ? _args9[2] : undefined;
          return _context9.abrupt("return", new Promise(function (resolve, reject) {
            var path = "users/getAllsellers";
            console.log(type);

            if (category != '') {
              if (type != '') {
                path += '?service_id=' + category;
              } else {
                path += '?category_id=' + category;
              }
            }

            if (page != '') {
              path += '?page=' + page;
            } // console.log(path);


            var type = 'get';
            fetch(_config["default"].URL + path, {
              method: type,
              headers: {
                "Content-Type": "application/json"
              }
            }).then(function (res) {
              return res.json();
            }).then(function _callee4(resjson) {
              return regeneratorRuntime.async(function _callee4$(_context8) {
                while (1) {
                  switch (_context8.prev = _context8.next) {
                    case 0:
                      resolve({
                        status: true,
                        data: resjson
                      });

                    case 1:
                    case "end":
                      return _context8.stop();
                  }
                }
              });
            })["catch"](function (err) {
              console.log("failed", err);
            });
          }));

        case 4:
        case "end":
          return _context9.stop();
      }
    }
  });
};

var Get_by_id = function Get_by_id(id) {
  return regeneratorRuntime.async(function Get_by_id$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          return _context11.abrupt("return", new Promise(function (resolve, reject) {
            var path = "users/getUser_by_id/" + id;
            console.log(path);
            var type = 'get';
            fetch(_config["default"].URL + path, {
              method: type,
              headers: {
                "Content-Type": "application/json"
              }
            }).then(function (res) {
              return res.json();
            }).then(function _callee5(resjson) {
              return regeneratorRuntime.async(function _callee5$(_context10) {
                while (1) {
                  switch (_context10.prev = _context10.next) {
                    case 0:
                      resolve({
                        status: true,
                        data: resjson
                      });

                    case 1:
                    case "end":
                      return _context10.stop();
                  }
                }
              });
            })["catch"](function (err) {
              console.log("failed", err);
            });
          }));

        case 1:
        case "end":
          return _context11.stop();
      }
    }
  });
};

var Update = function Update(data) {
  return regeneratorRuntime.async(function Update$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          return _context13.abrupt("return", new Promise(function (resolve, reject) {
            var path = "users/";
            var type = 'PATCH';
            fetch(_config["default"].URL + path, {
              method: type,
              headers: {
                "Content-Type": "application/json",
                "Authorization": _reactCookies["default"].load('Tokken')
              },
              body: JSON.stringify(data)
            }).then(function (res) {
              return res.json();
            }).then(function _callee6(resjson) {
              return regeneratorRuntime.async(function _callee6$(_context12) {
                while (1) {
                  switch (_context12.prev = _context12.next) {
                    case 0:
                      resolve({
                        status: true,
                        data: resjson
                      });

                    case 1:
                    case "end":
                      return _context12.stop();
                  }
                }
              });
            })["catch"](function (err) {
              console.log("failed", err);
            });
          }));

        case 1:
        case "end":
          return _context13.stop();
      }
    }
  });
};

var _default = {
  Login: Login,
  Varification: Varification,
  Signup: Signup,
  Get: Get,
  Update: Update,
  Get_by_id: Get_by_id,
  getAllsellers: getAllsellers
};
exports["default"] = _default;