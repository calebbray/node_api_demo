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
  hashSecret: 'thisIsASecret',
  maxChecks: 5,
  twilio: {
    accountSid: 'ACb32d411ad7fe886aac54c665d25e5c5d',
    authToken: '9455e3eb3109edc12e3d8c92768f7a67',
    fromPhone: '+15005550006'
  },
  templateGlobals: {
    appName: 'Uptime Checker',
    companyName: 'Calebs Co.',
    yearCreated: '2018',
    baseUrl: 'http://localhost:3000/'
  }
};

// Production env
environments.production = {
  httpPort: 5000,
  httpsPort: 5001,
  envName: 'production',
  hashSecret: 'thisIsASecret',
  maxChecks: 5,
  twilio: {
    accountSid: 'ACb32d411ad7fe886aac54c665d25e5c5d',
    authToken: '9455e3eb3109edc12e3d8c92768f7a67',
    fromPhone: '+15005550006'
  },
  templateGlobals: {
    appName: 'Uptime Checker',
    companyName: 'Calebs Co.',
    yearCreated: '2018',
    baseUrl: 'http://localhost:5000/'
  }
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
