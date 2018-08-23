/*
 * Create and export config variables
 *
 */

// Container for all environments
var environments = {};

// Staging (default) env
environments.staging = {
  httpPort: 3000,
  httpsPort: 3001,
  envName: 'staging',
  hashSecret: 'thisIsASecret'
};

// Production env
environments.production = {
  httpPort: 5000,
  httpsPort: 5001,
  envName: 'production',
  hashSecret: 'thisIsASecret'
};

// Determine which environment was passed as a command line argument
var current =
  typeof process.env.NODE_ENV == 'string'
    ? process.env.NODE_ENV.toLowerCase()
    : '';

// Check that the current environment is a listed environment
var exportEnv =
  typeof environments[current] == 'object'
    ? environments[current]
    : environments.staging;

module.exports = exportEnv;
