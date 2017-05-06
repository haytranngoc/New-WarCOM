'use strict';

var async = require('async');

module.exports = function (server) {

  var app = require('../server');

  var Account     = app.models.Account;
  var Role        = app.models.Role;
  var RoleMapping = app.models.RoleMapping;

  async.waterfall([
    function (callback) {
      Account.find({ where: { email: 'admin@admin.com' } }, function (error, users) {
        callback(error, users);
      });
    },
    function (users, callback) {
      if (users.length == 0) {
        var credential = {
          email: "admin@admin.com",
          password: "admin",
          role_name: "admin"
        };
        Account.create(credential, function (error, account) {
          callback(error, account);
          console.log
        });
      }
    },
    function (account, callback) {
      console.log(account);
      Role.findOne({ where: { name: "admin" } }, function (error, role) {
        role.principals.create({
          principalType: RoleMapping.USER,
          principalId: account.id
        });
      });
    }
  ], function (errors, results) {
    if (errors) console.error(errors);
    else console.log(results);
  });

};
