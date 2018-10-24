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

// Input Handlers
e.on('man', function(string) {
  cli.responders.help();
});

e.on('help', function(string) {
  cli.responders.help();
});

e.on('exit', function(string) {
  cli.responders.exit();
});

e.on('stats', function(string) {
  cli.responders.stats();
});

e.on('list users', function(string) {
  cli.responders.listUsers();
});

e.on('more user info', function(string) {
  cli.responders.moreUserInfo(string);
});

e.on('list checks', function(string) {
  cli.responders.listChecks(string);
});

e.on('more check info', function(string) {
  cli.responders.moreCheckInfo(string);
});

e.on('list logs', function(string) {
  cli.responders.listLogs();
});

e.on('more log info', function(string) {
  cli.responders.moreLogInfo(string);
});

// Responders
cli.responders = {};

// Help / Man
cli.responders.help = function() {
  var commands = {
    man: 'Show this help',
    help: 'Alias for the man command',
    exit: 'Kill the CLI and the Application',
    stats:
      'Get statistics on the underlying operating system and resourse utilization',
    'list users': 'Show a list of all the registered users in the system',
    'more user info --{userId}': 'Show details of a specific user',
    'list checks --up --down':
      'List all active checks in the system including their state. Up and down flags optional',
    'more check info --{checkId}': 'Show details of a specified check',
    'list logs': 'Show a list of all the log files available to be read',
    'more log info --{filename}': 'Show details of a specified log file'
  };

  // Show a header for the help page that is as wide as the screen
  cli.horizontalLine();
  cli.centered('CLI MANUAL');
  cli.horizontalLine();
  cli.verticalSpace(2);
};

// Exit
cli.responders.exit = function() {
  process.exit(0);
};

// stats
cli.responders.stats = function() {
  console.log('You asked for stats');
};

// List Users
cli.responders.listUsers = function() {
  console.log('You asked for listUsers');
};

// more user info
cli.responders.moreUserInfo = function(string) {
  console.log('You asked for moreUserInfo', string);
};

// list checks
cli.responders.listChecks = function(string) {
  console.log('You asked for listChecks', string);
};

// More check info
cli.responders.moreCheckInfo = function(string) {
  console.log('You asked for moreCheckInfo', string);
};

// list logs
cli.responders.listLogs = function() {
  console.log('You asked for listLogs');
};

// more logs info
cli.responders.moreLogInfo = function(string) {
  console.log('You asked for moreLogsInfo', string);
};

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
