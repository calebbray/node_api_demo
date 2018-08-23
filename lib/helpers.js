/*
 * Helpers for various tasks 
 * 
 * 
 * 
 */

// Dependencies
var crypto = require('crypto');
var config = require('./config');

var helpers = {};

// Create a sha256 hash
helpers.hash = function(string) {
  if (typeof string == 'string' && string.length > 0) {
    var hash = crypto
      .createHmac('sha256', config.hashSecret)
      .update(string)
      .digest('hex');
    return hash;
  } else {
    return false;
  }
};

// Parse a json string to an object in all cases without throwing
helpers.parseJsonToObject = function(string) {
  try {
    var object = JSON.parse(string);
    return object;
  } catch (error) {
    return {};
  }
};

module.exports = helpers;
