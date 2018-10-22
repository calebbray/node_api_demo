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
var path = require('path');
var fs = require('fs');

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

// Get the string content of a template
helpers.getTemplate = function(templateName, data, callback) {
  templateName =
    typeof templateName == 'string' && templateName.length > 0
      ? templateName
      : false;

  data = typeof data == 'object' && data !== null ? data : {};

  if (templateName) {
    var templatesDir = path.join(__dirname, '/../templates/');
    fs.readFile(templatesDir + templateName + '.html', 'utf8', function(
      err,
      string
    ) {
      if (!err && string && string.length > 0) {
        // Do interpolation on the string
        var finalString = helpers.interpolate(string, data);
        callback(false, finalString);
      } else {
        callback('No template could be found');
      }
    });
  } else {
    callback('No valid template name given');
  }
};

// Add header and footer to a string to pass to templates
helpers.addUniversalTemplates = function(string, data, callback) {
  string = typeof string == 'string' && string.length > 0 ? string : '';
  data = typeof data == 'object' && data !== null ? data : {};

  // Get the header
  helpers.getTemplate('_header', data, function(err, headerString) {
    if (!err && headerString) {
      // Get the footer
      helpers.getTemplate('_footer', data, function(err, footerString) {
        if (!err && footerString) {
          // Add them all together
          var fullString = headerString + string + footerString;
          callback(false, fullString);
        } else {
          callback('Could not find the footer template');
        }
      });
    } else {
      callback('Could not find the header template');
    }
  });
};

// Take a given string and a data object and find / replace all the keys within it
helpers.interpolate = function(string, data) {
  string = typeof string == 'string' && string.length > 0 ? string : '';
  data = typeof data == 'object' && data !== null ? data : {};
  // Add the template data object
  for (var keyName in config.templateGlobals) {
    if (config.templateGlobals.hasOwnProperty(keyName)) {
      data['global.' + keyName] = config.templateGlobals[keyName];
    }
  }

  // For each key in the data object insert its value into the string
  for (var key in data) {
    if (data.hasOwnProperty(key) && typeof data[key] == 'string') {
      var replace = data[key];
      var find = '{' + key + '}';
      string = string.replace(find, replace);
    }
  }

  return string;
};

// Get the content of a static (public) asset
helpers.getStaticAsset = function(fileName, callback) {
  fileName =
    typeof fileName == 'string' && fileName.length > 0 ? fileName : false;
  if (fileName) {
    var publicDir = path.join(__dirname, '/../public/');
    fs.readFile(publicDir + fileName, function(err, data) {
      if (!err && data) {
        callback(false, data);
      } else {
        callback('No file could be found');
      }
    });
  } else {
    callback('A valid filename could not be found');
  }
};

module.exports = helpers;
