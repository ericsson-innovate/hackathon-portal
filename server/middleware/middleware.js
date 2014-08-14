/**
 * @module middleware
 *
 * Exposes the setMiddleware function, which sets up all of the middleware functionality for the
 * server.
 */

/**
 * Sets up middleware for the server.
 *
 * @param {Object} server
 */
exports.init = function (server) {
  attachExpressMiddleware(server);
  setUpStaticFiles(server);
};

/**
 * Sets up some common Express middleware logic. This includes middleware for:
 *
 *   - Convenient logging
 *
 * @param {Object} server
 */
function attachExpressMiddleware(server) {
  var morgan = require('morgan');

  server.use(morgan('dev', {immediate: true}));
}

/**
 * Serve static files.
 * @param {Object} server
 */
function setUpStaticFiles(server) {
  var config = require('../config/config'),
      mountPath, staticPath, serveStatic;

  serveStatic = require('serve-static'); // For serving static files

  // Set up the public files
  mountPath = '/';
  staticPath = config.publicPath;
  server.use(mountPath, serveStatic(staticPath));
  console.log('Serving static files: staticPath=' + staticPath + ', mountPath=' + mountPath);
}
