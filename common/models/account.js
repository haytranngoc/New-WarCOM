'use strict';

module.exports = function (Account) {

  var app = require('../../server/server');

  Account.observe('after save', function (context, next) {

    if (context.isNewInstance) {

      var Role        = app.models.Role;
      var RoleMapping = app.models.RoleMapping;
      var profileInfo = context.instance;

      if (["admin", "user"].indexOf(profileInfo.role_name) >= 0) {

        Role.findOne({ where: { name: profileInfo.role_name }}, function (error, role) {
          role.principals.create({
            principalType: RoleMapping.USER,
            principalId: profileInfo.id
          });
        });

      }

    }

    next();

  });

};
