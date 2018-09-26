/*
 * Helpers for various tasks 
 * 
 * 
 * 
 */

// Dependencies
var crypto = require('crypto');
var config = require('./config');
var https = require('https');
var querystring = require('querystring');

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

// Send an SMS message via Twilio
helpers.sendTwilioSMS = function(phone, msg, callback) {
  // Validate parameters
  phone =
    typeof phone == 'string' && phone.trim().length == 10
      ? phone.trim()
      : false;
  msg =
    typeof msg == 'string' && msg.trim().length > 0 && msg.trim().length <= 1600
      ? msg.trim()
      : false;

  if (phone && msg) {
    // Configure the request payload
    var payload = {
      from: config.twilio.fromPhone,
      to: '+1' + phone,
      body: msg
    };

    // Stringify payload and configure request details
    var stringPayload = querystring.stringify(payload);

    var requestDetails = {
      protocol: 'https:',
      hostname: 'api.twilio.com',
      method: 'POST',
      path:
        '/2010-04-01/Accounts/' + config.twilio.accoundSid + '/Messages.json',
      auth: config.twilio.accountSid + ':' + config.twilio.authToken,
      headers: {
        'Content-Type': 'application/x-www-form-encoded',
        'Content-Length': Buffer.byteLength(stringPayload)
      }
    };

    // Instantiate the request object
    var req = https.request(requestDetails, function(res) {
      // Grab the status of the sent request
      var status = res.statusCode;
      // Callback successfully if the request went through
      if (status == 200 || status == 201) {
        callback(false);
      } else {
        callback('Status code returned was ' + status);
      }
    });

    // Bind to the error event so it doesn't get thrown
    req.on('error', function(e) {
      callback(e);
    });

    // Add the payload
    req.write(stringPayload);

    // End the request
    req.end();
  } else {
    callback('Given parameters were missing or invalid');
  }
};

module.exports = helpers;
