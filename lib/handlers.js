/*
 * These are the request handlers 
 * 
 * 
 */

// Dependencies
var _data = require('./data');
var helpers = require('./helpers');
var config = require('./config');

// Define all the handlers
var handlers = {};

/*
 * HTML Handlers 
 * 
 * 
 */

// Index Handler
handlers.index = function(data, callback) {
  // Reject any request that isn't a GET
  if (data.method.toLowerCase() == 'get') {
    // Prepare data for interpolation
    var templateData = {
      'head.title': 'Uptime Monitoring - Made Simple',
      'head.description': 'Free, Simple monitoring for your site.',
      'body.class': 'index'
    };

    // Read in the index template as a string
    helpers.getTemplate('index', templateData, function(err, string) {
      if (!err && string) {
        // Add the universal header and footer
        helpers.addUniversalTemplates(string, templateData, function(
          err,
          string
        ) {
          if (!err && string) {
            // Return that page as html
            callback(200, string, 'html');
          } else {
            callback(500, undefined, 'html');
          }
        });
      } else {
        callback(500, undefined, 'html');
      }
    });
  } else {
    callback(405, undefined, 'html');
  }
};

// Create account
handlers.accountCreate = function(data, callback) {
  // Reject any request that isn't a GET
  if (data.method.toLowerCase() == 'get') {
    // Prepare data for interpolation
    var templateData = {
      'head.title': 'Create an Account',
      'head.description': 'Signup is easy and only takes a few seconds',
      'body.class': 'accountCreate'
    };

    // Read in the index template as a string
    helpers.getTemplate('accountCreate', templateData, function(err, string) {
      if (!err && string) {
        // Add the universal header and footer
        helpers.addUniversalTemplates(string, templateData, function(
          err,
          string
        ) {
          if (!err && string) {
            // Return that page as html
            callback(200, string, 'html');
          } else {
            callback(500, undefined, 'html');
          }
        });
      } else {
        callback(500, undefined, 'html');
      }
    });
  } else {
    callback(405, undefined, 'html');
  }
};

// Create Session
handlers.sessionCreate = function(data, callback) {
  // Reject any request that isn't a GET
  if (data.method.toLowerCase() == 'get') {
    // Prepare data for interpolation
    var templateData = {
      'head.title': 'Login',
      'head.description': 'Please enter your phone number and password',
      'body.class': 'sessionCreate'
    };

    // Read in the index template as a string
    helpers.getTemplate('sessionCreate', templateData, function(err, string) {
      if (!err && string) {
        // Add the universal header and footer
        helpers.addUniversalTemplates(string, templateData, function(
          err,
          string
        ) {
          if (!err && string) {
            // Return that page as html
            callback(200, string, 'html');
          } else {
            callback(500, undefined, 'html');
          }
        });
      } else {
        callback(500, undefined, 'html');
      }
    });
  } else {
    callback(405, undefined, 'html');
  }
};

// Delete Session
handlers.sessionDeleted = function(data, callback) {
  // Reject any request that isn't a GET
  if (data.method.toLowerCase() == 'get') {
    // Prepare data for interpolation
    var templateData = {
      'head.title': 'Logged Out',
      'head.description': 'You have been logged out of your account',
      'body.class': 'sessionDeleted'
    };

    // Read in the index template as a string
    helpers.getTemplate('sessionDeleted', templateData, function(err, string) {
      if (!err && string) {
        // Add the universal header and footer
        helpers.addUniversalTemplates(string, templateData, function(
          err,
          string
        ) {
          if (!err && string) {
            // Return that page as html
            callback(200, string, 'html');
          } else {
            callback(500, undefined, 'html');
          }
        });
      } else {
        callback(500, undefined, 'html');
      }
    });
  } else {
    callback(405, undefined, 'html');
  }
};

// Edit your account
handlers.accountEdit = function(data, callback) {
  // Reject any request that isn't a GET
  if (data.method.toLowerCase() == 'get') {
    // Prepare data for interpolation
    var templateData = {
      'head.title': 'Account Settings',
      'body.class': 'accountEdit'
    };

    // Read in the index template as a string
    helpers.getTemplate('accountEdit', templateData, function(err, string) {
      if (!err && string) {
        // Add the universal header and footer
        helpers.addUniversalTemplates(string, templateData, function(
          err,
          string
        ) {
          if (!err && string) {
            // Return that page as html
            callback(200, string, 'html');
          } else {
            callback(500, undefined, 'html');
          }
        });
      } else {
        callback(500, undefined, 'html');
      }
    });
  } else {
    callback(405, undefined, 'html');
  }
};

// Delete your account
handlers.accountDelete = function(data, callback) {
  // Reject any request that isn't a GET
  if (data.method.toLowerCase() == 'get') {
    // Prepare data for interpolation
    var templateData = {
      'head.title': 'Account Deleted',
      'head.description': 'Your account has been deleted',
      'body.class': 'accountEdit'
    };

    // Read in the index template as a string
    helpers.getTemplate('accountDelete', templateData, function(err, string) {
      if (!err && string) {
        // Add the universal header and footer
        helpers.addUniversalTemplates(string, templateData, function(
          err,
          string
        ) {
          if (!err && string) {
            // Return that page as html
            callback(200, string, 'html');
          } else {
            callback(500, undefined, 'html');
          }
        });
      } else {
        callback(500, undefined, 'html');
      }
    });
  } else {
    callback(405, undefined, 'html');
  }
};

// Create a new check
handlers.checksCreate = function(data, callback) {
  // Reject any request that isn't a GET
  if (data.method == 'get') {
    // Prepare data for interpolation
    var templateData = {
      'head.title': 'Create a New Check',
      'body.class': 'checksCreate'
    };
    // Read in a template as a string
    helpers.getTemplate('checksCreate', templateData, function(err, str) {
      if (!err && str) {
        // Add the universal header and footer
        helpers.addUniversalTemplates(str, templateData, function(err, str) {
          if (!err && str) {
            // Return that page as HTML
            callback(200, str, 'html');
          } else {
            callback(500, undefined, 'html');
          }
        });
      } else {
        callback(500, undefined, 'html');
      }
    });
  } else {
    callback(405, undefined, 'html');
  }
};

// Dashboard (view all checks)
handlers.checksList = function(data, callback) {
  // Reject any request that isn't a GET
  if (data.method == 'get') {
    // Prepare data for interpolation
    var templateData = {
      'head.title': 'Dashboard',
      'body.class': 'checksList'
    };
    // Read in a template as a string
    helpers.getTemplate('checksList', templateData, function(err, str) {
      if (!err && str) {
        // Add the universal header and footer
        helpers.addUniversalTemplates(str, templateData, function(err, str) {
          if (!err && str) {
            // Return that page as HTML
            callback(200, str, 'html');
          } else {
            callback(500, undefined, 'html');
          }
        });
      } else {
        callback(500, undefined, 'html');
      }
    });
  } else {
    callback(405, undefined, 'html');
  }
};

// Edit a Check
handlers.checksEdit = function(data, callback) {
  // Reject any request that isn't a GET
  if (data.method == 'get') {
    // Prepare data for interpolation
    var templateData = {
      'head.title': 'Check Details',
      'body.class': 'checksEdit'
    };
    // Read in a template as a string
    helpers.getTemplate('checksEdit', templateData, function(err, str) {
      if (!err && str) {
        // Add the universal header and footer
        helpers.addUniversalTemplates(str, templateData, function(err, str) {
          if (!err && str) {
            // Return that page as HTML
            callback(200, str, 'html');
          } else {
            callback(500, undefined, 'html');
          }
        });
      } else {
        callback(500, undefined, 'html');
      }
    });
  } else {
    callback(405, undefined, 'html');
  }
};

// Favicon
handlers.favicon = function(data, callback) {
  // Reject anything that is not a get request
  if (data.method == 'get') {
    // Read in the favicons data
    helpers.getStaticAsset('favicon.ico', function(err, data) {
      if (!err && data) {
        callback(200, data, 'favicon');
      } else {
        callback(500);
      }
    });
  } else {
    callback(405);
  }
};

// Public Assets
handlers.public = function(data, callback) {
  // Reject anything that is not a get request
  if (data.method == 'get') {
    // Get the filename being requested
    var trimmedAssetName = data.trimmedPath.replace('public/', '').trim();
    if (trimmedAssetName.length > 0) {
      // Read in the assets data
      helpers.getStaticAsset(trimmedAssetName, function(err, data) {
        if (!err && data) {
          // Determine the content type and default to plain text
          var contentType = 'plain';

          if (trimmedAssetName.indexOf('.css') > -1) {
            contentType = 'css';
          }

          if (trimmedAssetName.indexOf('.png') > -1) {
            contentType = 'png';
          }

          if (trimmedAssetName.indexOf('.jpeg') > -1) {
            contentType = 'jpeg';
          }

          if (trimmedAssetName.indexOf('.ico') > -1) {
            contentType = 'favicon';
          }

          // Callback the data
          callback(200, data, contentType);
        } else {
          callback(404);
        }
      });
    } else {
      callback(405);
    }
  }
};

/*
 * JSON API Handlers
 * 
 * 
 */

// Example Error
handlers.exampleError = function(data, callback) {
  var error = new Error('This is an example error');
  throw error;
};

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
handlers._users.get = function(data, callback) {
  // Check for valid phone number
  var phone =
    typeof data.queryStringObject.phone == 'string' &&
    data.queryStringObject.phone.trim().length == 10
      ? data.queryStringObject.phone.trim()
      : false;
  if (phone) {
    // Get the token from the headers
    var token =
      typeof data.headers.token == 'string' ? data.headers.token : false;

    // Verify the given token is valid for the phone number
    handlers._tokens.verifyToken(token, phone, function(tokenIsValid) {
      if (tokenIsValid) {
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
        callback(403, {
          error: 'Missing required token in header or token is invalid.'
        });
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
      var token =
        typeof data.headers.token == 'string' ? data.headers.token : false;

      // Verify the given token is valid for the phone number
      handlers._tokens.verifyToken(token, phone, function(tokenIsValid) {
        if (tokenIsValid) {
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
          callback(403, {
            error: 'Missing required token in header or token is invalid.'
          });
        }
      });

      // Look up the user
    } else {
      callback(400, { error: 'Missing field to update' });
    }
  } else {
    callback(400, { error: 'Missing required field' });
  }
};

// Users Delete
// Required Data: phone
handlers._users.delete = function(data, callback) {
  // Check that the phone number is valid
  var phone =
    typeof data.queryStringObject.phone == 'string' &&
    data.queryStringObject.phone.trim().length == 10
      ? data.queryStringObject.phone.trim()
      : false;
  if (phone) {
    var token =
      typeof data.headers.token == 'string' ? data.headers.token : false;

    handlers._tokens.verifyToken(token, phone, function(tokenIsValid) {
      if (tokenIsValid) {
        _data.read('users', phone, function(err, data) {
          if (!err && data) {
            // Remove hashed password before returning it to the requester
            _data.delete('users', phone, function(err) {
              if (!err) {
                // Delete each of the checks associated with the user
                var userChecks =
                  typeof data.checks == 'object' && data.checks instanceof Array
                    ? data.checks
                    : [];

                var checksToDelete = userChecks.length;

                if (checksToDelete > 0) {
                  var checksDeleted = 0;
                  var deletionErrors = false;

                  // Loop through the checks
                  userChecks.forEach(function(checkId) {
                    // Delete the check
                    _data.delete('checks', checkId, function(err) {
                      if (err) {
                        deletionErrors = true;
                      }
                      checksDeleted++;
                      if (checksDeleted === checksToDelete) {
                        if (!deletionErrors) {
                          callback(200);
                        } else {
                          callback(500, {
                            error: 'Errors encountered while deleting checks'
                          });
                        }
                      }
                    });
                  });
                } else {
                  callback(200);
                }
              } else {
                callback(500, { error: 'Could not delete specified user' });
              }
            });
          } else {
            callback(400, { error: 'Specified user not found' });
          }
        });
      } else {
        callback(403, {
          error: 'Missing required token in header or token is invalid.'
        });
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

// Verify if a given id is currently valid for a given user
handlers._tokens.verifyToken = function(id, phone, callback) {
  // Lookup the token
  _data.read('tokens', id, function(err, data) {
    if (!err && data) {
      // Check that token is for the current user and is not expired
      if (data.phone == phone && data.expires > Date.now()) {
        callback(true);
      } else {
        callback(false);
      }
    } else {
      callback(false);
    }
  });
};

// Checks
handlers.checks = function(data, callback) {
  var acceptableMethods = ['post', 'get', 'put', 'delete'];
  if (acceptableMethods.indexOf(data.method) > -1) {
    handlers._checks[data.method](data, callback);
  } else {
    callback(405);
  }
};

// Checks Container
handlers._checks = {};

// Checks - Post
// Required: protocol, url, method, success codes, timeout seconds
handlers._checks.post = function(data, callback) {
  // Validate inputs
  var protocol =
    typeof data.payload.protocol == 'string' &&
    ['https', 'http'].indexOf(data.payload.protocol) > -1
      ? data.payload.protocol
      : false;

  var url =
    typeof data.payload.url == 'string' && data.payload.url.trim().length > 0
      ? data.payload.url.trim()
      : false;

  var method =
    typeof data.payload.method == 'string' &&
    ['post', 'get', 'put', 'delete'].indexOf(data.payload.method) > -1
      ? data.payload.method
      : false;

  var successCodes =
    typeof data.payload.successCodes == 'object' &&
    data.payload.successCodes instanceof Array &&
    data.payload.successCodes.length > 0
      ? data.payload.successCodes
      : false;

  var timeoutSeconds =
    typeof data.payload.timeoutSeconds == 'number' &&
    data.payload.timeoutSeconds % 1 === 0 &&
    data.payload.timeoutSeconds >= 1 &&
    data.payload.timeoutSeconds <= 5
      ? data.payload.timeoutSeconds
      : false;

  if (protocol && url && method && successCodes && timeoutSeconds) {
    // Get the token from the headers
    var token =
      typeof data.headers.token == 'string' ? data.headers.token : false;

    // Look up the user by reading the token
    _data.read('tokens', token, function(err, data) {
      if (!err && data) {
        var phone = data.phone;
        // Look up the user
        _data.read('users', phone, function(err, userData) {
          if (!err && userData) {
            var userChecks =
              typeof userData.checks == 'object' &&
              userData.checks instanceof Array
                ? userData.checks
                : [];

            if (userChecks.length < config.maxChecks) {
              // Create random ID for check
              var checkId = helpers.createRandomString(20);

              // Create check object
              var checkObject = {
                id: checkId,
                phone: phone,
                protocol: protocol,
                url: url,
                method: method,
                successCodes: successCodes,
                timeoutSeconds: timeoutSeconds
              };

              _data.create('checks', checkId, checkObject, function(err) {
                if (!err) {
                  // Add the check ID to the users object
                  userData.checks = userChecks;
                  userData.checks.push(checkId);

                  // Save the new user data
                  _data.update('users', phone, userData, function(err) {
                    if (!err) {
                      callback(200, checkObject);
                    } else {
                      callback(500, {
                        error: 'Could not update user with new check'
                      });
                    }
                  });
                } else {
                  callback(500, { error: 'The check could not be created' });
                }
              });
            } else {
              callback(400, {
                error: `The user already has the maximum checks. (${
                  config.maxChecks
                })`
              });
            }
          } else {
            callback(403);
          }
        });
      } else {
        callback(403);
      }
    });
  } else {
    callback(400, { error: 'Missing required inputs or inputs invalid' });
  }
};

// Checks - Get
// Required: id
handlers._checks.get = function(data, callback) {
  // // Check for valid id
  var id =
    typeof data.queryStringObject.id == 'string' &&
    data.queryStringObject.id.trim().length == 20
      ? data.queryStringObject.id.trim()
      : false;
  if (id) {
    // Look up the check
    _data.read('checks', id, function(err, checkData) {
      if (!err && checkData) {
        // Get the token from the headers
        var token =
          typeof data.headers.token == 'string' ? data.headers.token : false;

        // Verify the given token is valid for the id number
        handlers._tokens.verifyToken(token, checkData.phone, function(
          tokenIsValid
        ) {
          if (tokenIsValid) {
            // Return the check data
            callback(200, checkData);
          } else {
            callback(403);
          }
        });
      } else {
        callback(404, { error: 'Check not found' });
      }
    });
  } else {
    callback(400, { error: 'Missing required field' });
  }
};

// Checks - Put
// Required: id
// Optional: protocol, url, method, successCodes, timeoutSeconds (One must be sent)
handlers._checks.put = function(data, callback) {
  // Check for valid ID
  var id =
    typeof data.payload.id == 'string' && data.payload.id.trim().length == 20
      ? data.payload.id.trim()
      : false;

  // Validate inputs
  var protocol =
    typeof data.payload.protocol == 'string' &&
    ['https', 'http'].indexOf(data.payload.protocol) > -1
      ? data.payload.protocol
      : false;

  var url =
    typeof data.payload.url == 'string' && data.payload.url.trim().length > 0
      ? data.payload.url.trim()
      : false;

  var method =
    typeof data.payload.method == 'string' &&
    ['post', 'get', 'put', 'delete'].indexOf(data.payload.method) > -1
      ? data.payload.method
      : false;

  var successCodes =
    typeof data.payload.successCodes == 'object' &&
    data.payload.successCodes instanceof Array &&
    data.payload.successCodes.length > 0
      ? data.payload.successCodes
      : false;

  var timeoutSeconds =
    typeof data.payload.timeoutSeconds == 'number' &&
    data.payload.timeoutSeconds % 1 === 0 &&
    data.payload.timeoutSeconds >= 1 &&
    data.payload.timeoutSeconds <= 5
      ? data.payload.timeoutSeconds
      : false;

  if (id) {
    if (protocol || url || method || successCodes || timeoutSeconds) {
      _data.read('checks', id, function(err, checkData) {
        if (!err && checkData) {
          var token =
            typeof data.headers.token == 'string' ? data.headers.token : false;
          handlers._tokens.verifyToken(token, checkData.phone, function(
            tokenIsValid
          ) {
            if (tokenIsValid) {
              if (protocol) {
                checkData.protocol = protocol;
              }

              if (url) {
                checkData.url = url;
              }

              if (method) {
                checkData.method = method;
              }

              if (successCodes) {
                checkData.successCodes = successCodes;
              }

              if (timeoutSeconds) {
                checkData.timeoutSeconds = timeoutSeconds;
              }

              // Store updates
              _data.update('checks', id, checkData, function(err) {
                if (!err) {
                  callback(200);
                } else {
                  callback(500, { error: 'Could not update the check' });
                }
              });
            }
          });
        } else {
          callback(404, { error: 'Check not found' });
        }
      });
    } else {
      callback(400);
    }
  } else {
    callback(400, { error: 'Missing required field' });
  }
};

// Checks - delete
// Required: Check Id
handlers._checks.delete = function(data, callback) {
  // Check that the  number is valid
  var id =
    typeof data.queryStringObject.id == 'string' &&
    data.queryStringObject.id.trim().length == 20
      ? data.queryStringObject.id.trim()
      : false;
  if (id) {
    // Look up the check we want to delete
    _data.read('checks', id, function(err, checkData) {
      if (!err && checkData) {
        var token =
          typeof data.headers.token == 'string' ? data.headers.token : false;

        handlers._tokens.verifyToken(token, checkData.phone, function(
          tokenIsValid
        ) {
          if (tokenIsValid) {
            // Delete the check data
            _data.delete('checks', id, function(err) {
              if (!err) {
                _data.read('users', checkData.phone, function(err, userData) {
                  if (!err && userData) {
                    var userChecks =
                      typeof userData.checks == 'object' &&
                      userData.checks instanceof Array
                        ? userData.checks
                        : [];

                    // Remove deleted check from list of checks

                    var checkPosition = userChecks.indexOf(id);

                    if (checkPosition > -1) {
                      userChecks.splice(checkPosition, 1);
                      // ENTIRE USER IS BEING DELETED
                      userData.checks = userChecks;
                      _data.update('users', checkData.phone, userData, function(
                        err
                      ) {
                        if (!err) {
                          callback(200);
                        } else {
                          callback(500, {
                            error: 'Could not update specified user'
                          });
                        }
                      });
                    } else {
                      callback(500, {
                        error: "Check not found in list of user's checks"
                      });
                    }
                  } else {
                    callback(500, { error: 'Specified user not found' });
                  }
                });
              } else {
                callback(500, { error: 'Could not delete check data' });
              }
            });
          } else {
            callback(403, {
              error: 'Missing required token in header or token is invalid.'
            });
          }
        });
      } else {
        callback(400, { error: 'The specified id does not exist' });
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
