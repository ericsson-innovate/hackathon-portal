/**
 * @module server
 *
 * This script instantiates the server and begins listening for requests.
 */

var config = require('./config/config');

// Specifying an address of '0.0.0.0' allows us to access the server from any computer on the
// local network
initServer().listen(config.hack.port, '0.0.0.0', function () {
  console.log('Express server listening over the local network on port ' + config.hack.port);
});

/**
 * Sets up the server.
 */
function initServer() {
  var server = require('express')(),
      middleware = require('./middleware/middleware'),
      routes = require('./routes/routes');

  middleware.init(server);
  routes.init(server);

  return server
}
