var fs = require('fs');
var path = require('path');
var async = require('async');
var guid = require('./guid');

var exports = {};

exports.getUploadPath = function () {
  return path.join(__dirname, '../../../client/static/images/');
};


exports.base64 = function (photo, callback) {
  var base64 = photo;

  // Get base64 encoded string
  // base64 = base64.replace(/^data:image\/jpeg+;base64,/, '');
  var index = base64.indexOf("base64,");
  base64 = base64.substring(index + "base64,".length);
  base64 = base64.replace(/ /g, '+');

  var uploadPath = exports.getUploadPath();

  console.log("PATH:", uploadPath);

  // Checking whether upload path is not existed
  // Create upload path
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
  }

  // Declare file path
  var filePath = '/images/' + guid() + '.jpg';
  var url = path.join(__dirname, '../../../client/static' + filePath);

  console.log("URL:", url);

  fs.writeFile(url, base64, 'base64', function (error) {
    if (!error) {
      callback(null, filePath);
    } else {
      callback(error);
    }
  });
};

module.exports = exports;
