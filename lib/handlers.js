/*
 * These are the request handlers 
 * 
 * 
 */

// Dependencies
var _data = require('./data');
var helpers = require('./helpers');

// Define all the handlers
var handlers = {};

handlers.users = function(data, callback) {
  var acceptableMethods = ['post', 'get', 'put', 'delete'];
  if (acceptableMethods.indexOf(data.method) > -1) {
    handlers._users[data.method](data, callback);
  } else {
    callback(405);
  }
};

// Container for the users submethods
handlers._users = {};

// Users Post
// Required Data: firstName, Lastname, phone, password, tosAgreement
// Additional Data: False
handlers._users.post = function(data, callback) {
  // Check all required fields
  var { firstName, lastName, phone, password, tosAgreement } = data.payload;

  var fN =
    typeof firstName == 'string' && firstName.trim().length > 0
      ? firstName.trim()
      : false;

  var lN =
    typeof lastName == 'string' && lastName.trim().length > 0
      ? lastName.trim()
      : false;

  var ph =
    typeof phone == 'string' && phone.trim().length == 10
      ? phone.trim()
      : false;

  var pw =
    typeof password == 'string' && password.trim().length > 0
      ? password.trim()
      : false;

  var tA =
    typeof tosAgreement == 'boolean' && tosAgreement == true ? true : false;

  if (fN && lN && ph && pw && tA) {
    // Make sure the user does not already exist
    _data.read('users', ph, function(err, data) {
      if (err) {
        // Hash the password
        var hashPass = helpers.hash(pw);

        if (hashPass) {
          // Create the User Object
          var User = {
            firstName: fN,
            lastName: lN,
            phone: ph,
            password: hashPass,
            tosAgreement: true
          };

          // Store the User
          _data.create('users', phone, User, function(err) {
            if (!err) {
              callback(200);
            } else {
              console.log(err);
              callback(500, { error: 'Could not create the new user' });
            }
          });
        } else {
          callback(500, { error: 'could not hash password' });
        }
      } else {
        // User already exists
        callback(400, {
          error: 'A user with that phone number already exists'
        });
      }
    });
  } else {
    callback(400, { error: 'Missing required fields' });
  }
};

// Users Get
handlers._users.get = function(data, callback) {};

// Users Put
handlers._users.put = function(data, callback) {};

// Users Delete
handlers._users.delete = function(data, callback) {};

handlers.ping = function(data, callback) {
  callback(200);
};

// Not found handler
handlers.notFound = function(data, callback) {
  callback(404);
};

module.exports = handlers;
