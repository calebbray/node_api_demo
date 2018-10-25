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
var os = require('os');
var v8 = require('v8');
var _data = require('./data');
var _logs = require('./logs');
var helpers = require('./helpers');

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

  // Show each command, followed by its explanation
  for (var key in commands) {
    if (commands.hasOwnProperty(key)) {
      var value = commands[key];
      var line = '\x1b[33m' + key + '\x1b[0m';
      var padding = 60 - line.length;
      for (i = 0; i < padding; i++) {
        line += ' ';
      }

      line += value;
      console.log(line);
      cli.verticalSpace(1);
    }
  }

  cli.verticalSpace(1);

  // End with another horizontal line
  cli.horizontalLine();
};

// Creates a vertical space
cli.verticalSpace = function(lines) {
  lines = typeof lines == 'number' && lines > 0 ? lines : 1;

  for (i = 0; i < lines; i++) {
    console.log('');
  }
};

// Create a horizontal line
cli.horizontalLine = function() {
  // Get the available screen size
  var width = process.stdout.columns;
  var line = '';

  for (i = 0; i < width; i++) {
    line += '-';
  }

  console.log(line);
};

// Create centered text on the screen
cli.centered = function(string) {
  string =
    typeof string == 'string' && string.trim().length > 0 ? string.trim() : '';

  // Get the available screen size
  var width = process.stdout.columns;

  // Calculate the left padding there should be
  var leftPadding = Math.floor((width - string.length) / 2);

  // Put in the left padded spaces before the string
  var line = '';

  for (i = 0; i < leftPadding; i++) {
    line += ' ';
  }

  line += string;
  console.log(line);
};

// Exit
cli.responders.exit = function() {
  process.exit(0);
};

// stats
cli.responders.stats = function() {
  // Compile an object of stats
  var stats = {
    'Load Average': os.loadavg().join(' '),
    'CPU Count': os.cpus().length,
    'Free Memory': os.freemem(),
    'Current Malloced Memory': v8.getHeapStatistics().malloced_memory,
    'Peaked Malloced Memory': v8.getHeapStatistics().peak_malloced_memory,
    'Allocated Heap Used (%)': Math.round(
      (v8.getHeapStatistics().used_heap_size /
        v8.getHeapStatistics().total_heap_size) *
        100
    ),
    'Available Heap Allocated (%)': Math.round(
      (v8.getHeapStatistics().total_heap_size /
        v8.getHeapStatistics().heap_size_limit) *
        100
    ),
    Uptime: os.uptime() + ' Seconds'
  };

  // Create a header for the stats
  cli.horizontalLine();
  cli.centered('SYSTEM STATISTICS');
  cli.horizontalLine();
  cli.verticalSpace(2);

  // Show each command, followed by its explanation
  for (var key in stats) {
    if (stats.hasOwnProperty(key)) {
      var value = stats[key];
      var line = '\x1b[33m' + key + '\x1b[0m';
      var padding = 60 - line.length;
      for (i = 0; i < padding; i++) {
        line += ' ';
      }

      line += value;
      console.log(line);
      cli.verticalSpace(1);
    }
  }

  cli.verticalSpace(1);

  // End with another horizontal line
  cli.horizontalLine();
};

// List Users
cli.responders.listUsers = function() {
  _data.list('users', function(err, userIds) {
    if (!err && userIds && userIds.length > 0) {
      cli.verticalSpace();
      userIds.forEach(function(userId) {
        _data.read('users', userId, function(err, userData) {
          if (!err && userData) {
            var line = `Name: ${userData.firstName} ${
              userData.lastName
            } Phone: ${userData.phone} Checks: `;
            var numberOfChecks =
              typeof userData.checks == 'object' &&
              userData.checks instanceof Array &&
              userData.checks.length > 0
                ? userData.checks.length
                : 0;
            line += numberOfChecks;
            console.log(line);
            cli.verticalSpace();
          }
        });
      });
    }
  });
};

// more user info
cli.responders.moreUserInfo = function(string) {
  // Get the id from the string that is being provided
  var arr = string.split('--');
  var userId =
    typeof arr[1] == 'string' && arr[1].trim().length > 0
      ? arr[1].trim()
      : false;
  if (userId) {
    // Lookup the user
    _data.read('users', userId, function(err, userData) {
      if (!err && userData) {
        // Romove the hashed password
        delete userData.password;

        // Print the JSON with text highlighting
        cli.verticalSpace();
        console.dir(userData, { colors: true });
        cli.verticalSpace();
      } else {
        console.log('No account associated with the given phone number');
      }
    });
  }
};

// list checks
cli.responders.listChecks = function(string) {
  // List out the checks
  _data.list('checks', function(err, checkIds) {
    if (!err && checkIds && checkIds.length > 0) {
      checkIds.forEach(function(checkId) {
        _data.read('checks', checkId, function(err, checkData) {
          if (!err && checkData) {
            var includeCheck = false;
            var lowerString = string.toLowerCase();

            // Get the state of the check. Default to down
            var state =
              typeof checkData.state == 'string' ? checkData.state : 'down';
            // Get the state, default to unknown
            var stateOrUnknown =
              typeof checkData.state == 'string' ? checkData.state : 'unknown';

            // If the user has specified the state include check accordingly
            if (
              lowerString.indexOf(`--${state}`) > -1 ||
              (lowerString.indexOf('--down') == -1 &&
                lowerString.indexOf('--up') == -1)
            ) {
              var line = `ID: ${
                checkData.id
              } ${checkData.method.toUpperCase()} ${checkData.protocol}://${
                checkData.url
              } State: ${stateOrUnknown}`;
              console.log(line);
              cli.verticalSpace();
            }
          }
        });
      });
    }
  });
};

// More check info
cli.responders.moreCheckInfo = function(string) {
  // Get the id from the string that is being provided
  var arr = string.split('--');
  var checkId =
    typeof arr[1] == 'string' && arr[1].trim().length > 0
      ? arr[1].trim()
      : false;
  if (checkId) {
    // Lookup the user
    _data.read('checks', checkId, function(err, checkData) {
      if (!err && checkData) {
        // Print the JSON with text highlighting
        cli.verticalSpace();
        console.dir(checkData, { colors: true });
        cli.verticalSpace();
      } else {
        console.log('No check associated with the given ID');
      }
    });
  }
};

// list logs
cli.responders.listLogs = function() {
  _logs.list(true, function(err, fileNames) {
    if (!err && fileNames && fileNames.length > 0) {
      cli.verticalSpace();
      fileNames.forEach(function(fileName) {
        if (fileName.indexOf('-') > -1) {
          console.log(fileName);
          cli.verticalSpace();
        }
      });
    }
  });
};

// more logs info
cli.responders.moreLogInfo = function(string) {
  // Get the fileName from the string that is being provided
  var arr = string.split('--');
  var fileName =
    typeof arr[1] == 'string' && arr[1].trim().length > 0
      ? arr[1].trim()
      : false;
  if (fileName) {
    cli.verticalSpace();
    // Decompress log file
    _logs.decompress(fileName, function(err, stringData) {
      if (!err && stringData) {
        // Split into lines
        var arr = stringData.split('\n');
        arr.forEach(function(jsonString) {
          var logObject = helpers.parseJsonToObject(jsonString);
          if (logObject && JSON.stringify(logObject) !== '{}') {
            console.dir(logObject, { colors: true });
            cli.verticalSpace();
          }
        });
      }
    });
  }
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
