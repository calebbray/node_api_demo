/*
 * CLI Related tasks 
 * 
 * 
 */

// Dependencies
var readline = require('readline');
var util = require('util');
var debug = util.debuglog('cli');
var events = require('events');

class Events extends events {}
var e = new Events();

// instantiate the cli
var cli = {};

// Input processor
cli.processInput = function(string) {
  string =
    typeof string == 'string' && string.trim().length > 0
      ? string.trim()
      : false;

  // Only process input if the user actually wrote something
  if (string) {
    // Cotify the unique strings
    var uniqueInputs = [
      'man',
      'help',
      'exit',
      'stats',
      'list users',
      'more user info',
      'list checks',
      'more check info',
      'list logs',
      'more log info'
    ];

    // Go through the possible inputs and emit an event
    var matchFound = false;
    var counter = 0;

    uniqueInputs.some(function(input) {
      if (string.toLowerCase().indexOf(input) > -1) {
        matchFound = true;
        // Emit an event for the matching input
        e.emit(input, string);
        return true;
      }
    });

    // If no match is found tell the user to try again
    if (!matchFound) {
      console.log('Sorry Try Again');
    }
  }
};

cli.init = function() {
  // Send the start message to the console in dark blue
  console.log('\x1b[94m%s\x1b[0m', 'The CLI running');

  // Start the interface
  var _interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> '
  });

  // Create an initial prompt
  _interface.prompt();

  // Handle each line of input
  _interface.on('line', function(str) {
    // Send to the input processor
    cli.processInput(str);

    // Reinitialize the prompt afterwards
    _interface.prompt();
  });

  // If the user kills the CLI, kill the process
  _interface.on('close', function() {
    process.exit(0);
  });
};

// Export the module
module.exports = cli;
