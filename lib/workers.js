/*
 * Worker related tasks
 * 
 */

// Dependencies
var path = require('path');
var fs = require('fs');
var _data = require('./data');
var https = require('https');
var http = require('http');
var helpers = require('./helpers');
var url = require('url');

// Instantiate the object
var workers = {};

workers.gatherAllChecks = function() {
  // Get all the checks that exist in the function
  _data.list('checks', function(err, checks) {
    if (!err && checks && checks.length > 0) {
      checks.forEach(function(check) {
        // Read in the check data
        _data.read('checks', check, function(err, originalCheckData) {
          if (!err && originalCheckData) {
            // Pass the data to call the check validator
            workers.validateCheckData(originalCheckData);
          } else {
            console.log('Error reading one of the checks data');
          }
        });
      });
    } else {
      console.log('Error: Could not find any checks to process');
    }
  });
};

// Sanity checking the check data
workers.validateCheckData = function(originalCheckData) {
  originalCheckData =
    typeof originalCheckData == 'object' && originalCheckData !== null
      ? originalCheckData
      : {};

  originalCheckData.id =
    typeof originalCheckData.id == 'string' &&
    originalCheckData.id.trim().length == 20
      ? originalCheckData.id
      : false;

  originalCheckData.phone =
    typeof originalCheckData.phone == 'string' &&
    originalCheckData.phone.trim().length == 10
      ? originalCheckData.phone
      : false;

  originalCheckData.protocol =
    typeof originalCheckData.protocol == 'string' &&
    ['http', 'https'].indexOf(originalCheckData.protocol) > -1
      ? originalCheckData.protocol
      : false;

  originalCheckData.url =
    typeof originalCheckData.url == 'string' &&
    originalCheckData.url.trim().length == 0
      ? originalCheckData.url
      : false;

  originalCheckData.method =
    typeof originalCheckData.method == 'string' &&
    ['post', 'get', 'put', 'delete'].indexOf(originalCheckData.method) > -1
      ? originalCheckData.method
      : false;

  originalCheckData.successCodes =
    typeof originalCheckData.successCodes == 'object' &&
    originalCheckData.successCodes instanceof Array &&
    originalCheckData.successCodes.length > 0
      ? originalCheckData.successCodes
      : false;

  originalCheckData.timeoutSeconds =
    typeof originalCheckData.timeoutSeconds == 'number' &&
    originalCheckData.timeoutSeconds % 1 === 0 &&
    originalCheckData.timeoutSeconds > 1 &&
    originalCheckData.timeoutSeconds <= 5
      ? originalCheckData.timeoutSeconds
      : false;
};

// Timer to execute the worker process once per minute
workers.loop = function() {
  setInterval(function() {
    workers.gatherAllChecks();
  }, 60000);
};

// Initiate the workers
workers.init = function() {
  // Execute all the checks
  workers.gatherAllChecks();

  // Call the loop so checks continue on their own
  workers.loop();
};

// Export the module
module.exports = workers;
