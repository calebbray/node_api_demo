/*
 * Library that demonstrates something throwing when it's init() is calle
 * 
 * 
 */

var example = {};

// Init function
example.init = function() {
  // This is a function that intentionally throws an error
  var foo = bar;
};

module.exports = example;
