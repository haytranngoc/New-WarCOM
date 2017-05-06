'use strict';

var async = require('async');

module.exports = function (server) {

  var app = require('../server');

  var Role = app.models.Role;

  Role.find({
    where: {
      or: [ { name: "admin" }, { name: "user" } ]
    }
  }, function (error, roles) {
    if (roles.length == 0) {
      async.parallel([
        function (callback) {
          Role.create({ name: "admin" }, function (error, role) {
            callback(error, role);
          });
        },
        function (callback) {
          Role.create({ name: "user" }, function (error, role) {
            callback(error, role);
          });
        }
      ], function (errors, results) {
        if (errors) {
          console.log(errors);
        } else {
          console.log(">>> ROLES CREATED:");
          results.map(function (item) { console.log(item); });
        }
      });
    } else {
      // console.log(">>> FOUND ROLES:");
      // console.log(roles);
    }
  })

};
