var crypto = require("crypto")
  , moment = require('moment')
  , request = require('request');
var loopback = require('loopback');

module.exports = function(User) {

  User.loginUser = function(boardId,cb){
    List.find({
      where: {
        boardId: boardId
      }
    }, function (err, lists) {
      if (err) {
        return cb(err);
      }
      var j= 1;
      for(var i in lists){
        var np = lists[i];
        np['listArr'] = 'list'+j;
        j++;
      }
      cb(null,lists);
    });
  };

  List.remoteMethod(
    'loginUser',
    {
      description: 'loginUser',
      accepts: [
        {arg: 'boardId', type: 'string', description: 'boardId of the user', required: true},
      ],
      returns: {arg: 'data', type: [Object], root: true},
      http: {verb: 'get', path: '/loginUser'}
    }
  );
};
