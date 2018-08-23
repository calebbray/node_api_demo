/*
 * file for storing and editing data 
 * 
 * 
 * 
 */

var fs = require('fs');
var path = require('path');

// Container for the Module
var lib = {};

// Base Directory of the data folder
lib.baseDir = path.join(__dirname, '/../.data/');

lib.create = function(dir, file, data, callback) {
  // Open the file for writing
  fs.open(lib.baseDir + dir + '/' + file + '.json', 'wx', function(
    err,
    fileDescriptor
  ) {
    if (!err && fileDescriptor) {
      // Convert Data to String
      var stringData = JSON.stringify(data);
      //Write to file and close it
      fs.writeFile(fileDescriptor, stringData, function(err) {
        if (!err) {
          fs.close(fileDescriptor, function(err) {
            if (!err) {
              callback(false);
            }
          });
        } else {
          callback('Error, writing to a new file');
        }
      });
    } else {
      callback('Could Not create new file.');
    }
  });
};

// Read data from a file
lib.read = function(dir, file, callback) {
  fs.readFile(lib.baseDir + dir + '/' + file + '.json', 'utf8', function(
    err,
    data
  ) {
    callback(err, data);
  });
};

// Update a file
lib.update = function(dir, file, data, callback) {
  fs.open(lib.baseDir + dir + '/' + file + '.json', 'r+', function(
    err,
    fileDescriptor
  ) {
    if (!err && fileDescriptor) {
      var stringData = JSON.stringify(data);
      // Truncate the content of the file before writing\
      fs.ftruncate(fileDescriptor, function(err) {
        if (!err) {
          // Write to the file and close it
          fs.writeFile(fileDescriptor, stringData, function(err) {
            if (!err) {
              fs.close(fileDescriptor, function(err) {
                if (!err) {
                  callback(false);
                } else {
                  callback('Error closing the file');
                }
              });
            } else {
              callback('Error writing to existing file');
            }
          });
        } else {
          callback('Error truncating file.');
        }
      });
    } else {
      callback('Could not open the file to update');
    }
  });
};

lib.delete = function(dir, filename, callback) {
  fs.unlink(lib.baseDir + dir + '/' + filename + '.json', function(err) {
    if (!err) {
      callback(false);
    } else {
      callback('Could not delete file');
    }
  });
};

// Export Module
module.exports = lib;
