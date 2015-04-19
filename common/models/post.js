var crypto = require("crypto")
  , moment = require('moment')
  , request = require('request');
var loopback = require('loopback');

module.exports = function(Post) {

  Post.getPosts = function(boardId,cb){
    Post.find({
      where: {
        boardId: boardId
      }
    }, function (err, posts) {
      if (err) {
        return cb(err);
      }
      for(var i in posts){
        var np = posts[i];
        np['drag'] = true;
      }
      cb(null,posts);
    });
  };

  Post.remoteMethod(
    'getPosts',
    {
      description: 'getPosts',
      accepts: [
        {arg: 'boardId', type: 'string', description: 'board Id of the user', required: true},
      ],
      returns: {arg: 'data', type: [Object], root: true},
      http: {verb: 'get', path: '/getPosts'}
    }
  );

};
