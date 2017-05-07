'use strict';

var uploader = require('./api/upload');

module.exports = function (app) {

  var router = app.loopback.Router();

  router.post('/api/upload', function (req, res) {
    var photo = req.body.image;
    uploader.base64(photo, function (error, path) {
      if (error) {
        res.status(400).json(error);
      } else {
        res.json({
          url: path
        });
      }
    });
  });

  app.use(router);

};
