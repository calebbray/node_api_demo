/*
 * Primary file for API
 *
 */

// Dependencies
var server = require('./lib/server');
var workers = require('./lib/workers');
var cli = require('./lib/cli');
var exampleDebug = require('./lib/exampleDebuggingProblem');

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

  // Call the example init
  exampleDebug.init();
};

// Execute
app.init();

// Export
module.exports = app;
