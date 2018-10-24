/*
 * Primary file for API
 *
 */

// Dependencies
var server = require('./lib/server');
var workers = require('./lib/workers');
var cli = require('./lib/cli');

// Declare the app
var app = {};

// Init function
app.init = function() {
  // Start the server
  server.init();

  // Start the workers
  workers.init();

  // Start the cli last
  setTimeout(function() {
    cli.init();
  }, 50);
};

// Execute
app.init();

// Export
module.exports = app;
