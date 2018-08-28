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
// Required Data: phone
// Optional: None
// @TODO Only let Auth users access their data
handlers._users.get = function(data, callback) {
  // Check for valid phone number
  var phone =
    typeof data.queryStringObject.phone == 'string' &&
    data.queryStringObject.phone.trim().length == 10
      ? data.queryStringObject.phone.trim()
      : false;
  if (phone) {
    _data.read('users', phone, function(err, data) {
      if (!err && data) {
        // Remove hashed password before returning it to the requester
        delete data.password;
        callback(200, data);
      } else {
        callback(404, { error: 'User not found' });
      }
    });
  } else {
    callback(400, { error: 'Missing required field' });
  }
};

// Users Put
// Required Data: Phone
// Optional Data: first name, last name, password
// At least one optional field needs to be specified
// @TODO Only let Auth users access their data
handlers._users.put = function(data, callback) {
  // Check for valid phone number
  var phone =
    typeof data.payload.phone == 'string' &&
    data.payload.phone.trim().length == 10
      ? data.payload.phone.trim()
      : false;

  // Check for optional fields
  var { firstName, lastName, password } = data.payload;

  var fN =
    typeof firstName == 'string' && firstName.trim().length > 0
      ? firstName.trim()
      : false;

  var lN =
    typeof lastName == 'string' && lastName.trim().length > 0
      ? lastName.trim()
      : false;

  var pw =
    typeof password == 'string' && password.trim().length > 0
      ? password.trim()
      : false;

  // if phone is not valid send back an error
  if (phone) {
    if (fN || lN || pw) {
      // Look up the user
      _data.read('users', phone, function(err, data) {
        if (!err && data) {
          // Update necessary fields
          if (fN) {
            data.firstName = fN;
          }

          if (lN) {
            data.lastName = lN;
          }

          if (pw) {
            data.password = helpers.hash(pw);
          }

          // Store new updates
          _data.update('users', phone, data, function(err) {
            if (!err) {
              callback(200);
            } else {
              console.log(err);
              callback(500, { error: 'Could not update user' });
            }
          });
        } else {
          callback(404, { error: 'User not found' });
        }
      });
    } else {
      callback(400, { error: 'Missing field to update' });
    }
  } else {
    callback(400, { error: 'Missing required field' });
  }
};

// Users Delete
// Required Data: phone
// @TODO: Only let auth user delete their object
// @TODO Cleanup any other files associated with this user
handlers._users.delete = function(data, callback) {
  // Check that the phone number is valid
  var phone =
    typeof data.queryStringObject.phone == 'string' &&
    data.queryStringObject.phone.trim().length == 10
      ? data.queryStringObject.phone.trim()
      : false;
  if (phone) {
    _data.read('users', phone, function(err, data) {
      if (!err && data) {
        // Remove hashed password before returning it to the requester
        _data.delete('users', phone, function(err) {
          if (!err) {
            callback(200);
          } else {
            callback(500, { error: 'Could not delete specified user' });
          }
        });
      } else {
        callback(400, { error: 'Specified user not found' });
      }
    });
  } else {
    callback(400, { error: 'Missing required field' });
  }
};

handlers.tokens = function(data, callback) {
  var acceptableMethods = ['post', 'get', 'put', 'delete'];
  if (acceptableMethods.indexOf(data.method) > -1) {
    handlers._tokens[data.method](data, callback);
  } else {
    callback(405);
  }
};

//Container for all token methods
handlers._tokens = {};

// Tokens - Post
// Required Data: Phone, Password
handlers._tokens.post = function(data, callback) {
  // Check all required fields
  var { phone, password } = data.payload;

  var ph =
    typeof phone == 'string' && phone.trim().length == 10
      ? phone.trim()
      : false;

  var pw =
    typeof password == 'string' && password.trim().length > 0
      ? password.trim()
      : false;

  if (ph && pw) {
    // Look up the user who matches the phone number
    _data.read('users', phone, function(err, data) {
      if (!err && data) {
        // Hash the sent password and compare to the stored hashed pass
        var hashPass = helpers.hash(pw);
        if (hashPass === data.password) {
          // If valid create new token with random name. Set expiration date for 1 hour in the future
          var tokenId = helpers.createRandomString(20);

          var expires = Date.now() + 1000 * 60 * 60;

          var tokenObject = {
            phone: phone,
            id: tokenId,
            expires: expires
          };

          _data.create('tokens', tokenId, tokenObject, function(err) {
            if (!err) {
              callback(200, tokenObject);
            } else {
              callback(500, { error: 'Could not create new token' });
            }
          });
        } else {
          callback(400, { error: 'Password Incorrect' });
        }
      } else {
        callback(404, { error: 'User not found' });
      }
    });
  } else {
    callback(400, { error: 'Missing required field' });
  }
};

// Tokens - Get
// Required: id
handlers._tokens.get = function(data, callback) {
  // Check that the ID sent is valid
  var id =
    typeof data.queryStringObject.id == 'string' &&
    data.queryStringObject.id.trim().length == 20
      ? data.queryStringObject.id.trim()
      : false;
  if (id) {
    _data.read('tokens', id, function(err, data) {
      if (!err && data) {
        callback(200, data);
      } else {
        callback(404, { error: 'Token not found' });
      }
    });
  } else {
    callback(400, { error: 'Missing required field' });
  }
};

// Tokens - Put
// Required: id, extend
handlers._tokens.put = function(data, callback) {
  var id =
    typeof data.payload.id == 'string' && data.payload.id.trim().length == 20
      ? data.payload.id.trim()
      : false;

  var extend =
    typeof data.payload.extend == 'boolean' && data.payload.extend == true
      ? true
      : false;

  if (id && extend) {
    _data.read('tokens', id, function(err, data) {
      if (!err && data) {
        if (data.expires > Date.now()) {
          // Set expiration an hour from now
          data.expires = Date.now() + 1000 * 3600;

          // Store new updates
          _data.update('tokens', id, data, function(err) {
            if (!err) {
              callback(200);
            } else {
              callback(500, { error: 'Could not update token' });
            }
          });
        } else {
          callback(400, { error: 'Token is already invalid' });
        }
      } else {
        callback(404, { error: 'Token does not exist' });
      }
    });
  } else {
    callback(400, { error: 'Missing required fields or fields invalid' });
  }
};

// Tokens - Delete
// Required - id
handlers._tokens.delete = function(data, callback) {
  // Check that the id is valid
  var id =
    typeof data.queryStringObject.id == 'string' &&
    data.queryStringObject.id.trim().length == 20
      ? data.queryStringObject.id.trim()
      : false;
  if (id) {
    _data.read('tokens', id, function(err, data) {
      if (!err && data) {
        // Remove hashed password before returning it to the requester
        _data.delete('tokens', id, function(err) {
          if (!err) {
            callback(200);
          } else {
            callback(500, { error: 'Could not delete specified user' });
          }
        });
      } else {
        callback(400, { error: 'Specified user not found' });
      }
    });
  } else {
    callback(400, { error: 'Missing required field' });
  }
};

handlers.ping = function(data, callback) {
  callback(200);
};

// Not found handler
handlers.notFound = function(data, callback) {
  callback(404);
};

module.exports = handlers;
