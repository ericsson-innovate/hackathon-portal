/**
 * @module config
 *
 * Holds server-side configuration data for the app.
 */

var config, appRoot;

// Translates the relative root path to an absolute path
appRoot = require('path').resolve(__dirname + '/../..');

config = {};

config.hack = {};

config.publicPath = appRoot + '/';

config.hack.port = 3000;
config.hack.url = 'http://localhost:' + config.hack.port;

module.exports = config;
