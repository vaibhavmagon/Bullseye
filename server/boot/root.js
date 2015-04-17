var path = require('path');

module.exports = function(server) {
  // Install a `/` route that returns server status
  var router = server.loopback.Router();
  /*router.get('/', server.loopback.status());*/

  router.get('/',function (req, resp, next) {
    resp.sendFile(path.resolve(__dirname, '../../client/index.html'));
  });

  server.use(router);
};
