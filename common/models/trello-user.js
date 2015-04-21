var crypto = require("crypto")
  , moment = require('moment')
  , request = require('request');
var loopback = require('loopback');

module.exports = function (TrelloUser) {

  TrelloUser.loginUser = function (email, password, cb) {
    TrelloUser.find({
      where: {
        and: [
          {email: email},
          {password: password}
        ]
      }
    }, function (err, users) {
      if (err) {
        return cb(err);
      }
      cb(null, users);
    });
  };

  TrelloUser.remoteMethod(
    'loginUser',
    {
      description: 'loginUser',
      accepts: [
        {arg: 'email', type: 'string', description: 'email of the user', required: true,http: {source: 'path'}},
        {arg: 'password', type: 'string', description: 'password of the user', required: true,http: {source: 'path'}},
      ],
      returns: {arg: 'data', type: [Object], root: true},
      http: {verb: 'get', path: '/loginUser/:email/:password'}
    }
  );
};
