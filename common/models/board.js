var crypto = require("crypto")
  , moment = require('moment')
  , request = require('request');
var loopback = require('loopback');

module.exports = function(Board) {

  Board.getBoards = function(email,cb){
    Board.find({
      where: {users: {inq: [email]}},
    }, function (err, boards) {
      if (err) {
        return cb(err);
      }
      cb(null,boards);
    });
  };

  Board.remoteMethod(
    'getBoards',
    {
      description: 'getBoards',
      accepts: [
        {arg: 'email', type: 'string', description: 'email of the user', required: true},
      ],
      returns: {arg: 'data', type: [Object], root: true},
      http: {verb: 'get', path: '/getBoards'}
    }
  );

};
