/**
 * @module routes
 *
 * Exposes the attachHandlers function, which attaches the route handlers.
 */

/**
 * Attaches the route handlers to the server.
 *
 * @param {Object} server
 */
exports.init = function (server) {
  server.route('/').get(handleHomeRequest);
  server.route('*').all(handleInvalidRequest);
};

/**
 * Handles requests for the home page.
 *
 * @param {Object} req
 * @param {Object} res
 */
function handleHomeRequest(req, res) {
  res.status(404).sendfile(config.publicPath + '/index.html');
}

/**
 * Handles un-matched requests.
 *
 * @param {Object} req
 * @param {Object} res
 */
function handleInvalidRequest(req, res) {
  res.status(404).send('No such route');
}
