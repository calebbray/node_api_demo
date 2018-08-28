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

// Create a string of random alphanumeric characters of a given length
helpers.createRandomString = function(length) {
  length = typeof length == 'number' && length > 0 ? length : false;
  if (length) {
    // Define all possible characters
    var possibleCharacters = 'abcdefghijklmnopqrstuvwxyz1234567890';

    // Start the final string
    var string = '';

    for (i = 1; i <= length; i++) {
      // Get a random character from possible characters and append to string
      var randChar = possibleCharacters.charAt(
        Math.floor(Math.random() * possibleCharacters.length)
      );

      // Append the random character
      string += randChar;
    }

    return string;
  } else {
    return false;
  }
};

module.exports = helpers;
