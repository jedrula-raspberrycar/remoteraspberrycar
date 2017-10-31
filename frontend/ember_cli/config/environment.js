/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'ember-remoteraspberrycar',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      //API_HOST: 'http://localhost:3000'
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    ENV['ember-cli-mirage'] = {
      enabled: false
    }
    ENV.APP.API_HOST = 'http://localhost:3000';
    // ENV.APP.API_HOST = 'http://192.168.1.102:80';
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'lan') {
    // ENV.APP.API_HOST = 'http://192.168.0.150:3000';
    // ENV.APP.API_HOST = 'http://192.168.0.135:3000';
    // TODO make this smarter! read qr code and determine dynamicaly ?
    ENV.APP.API_HOST = 'http://raspberrypi.local:3001';
  }

  if (environment === 'production') {
    // ENV.APP.API_HOST = 'http://4de93a31a4324b5dfa4e5e7881681c56.resindevice.io';
    // ENV.APP.API_HOST = 'https://c88e016b1ddda096c9545e62c8a0a520.resindevice.io';
    // ENV.APP.API_HOST = 'http://c88e016b1ddda096c9545e62c8a0a520.resindevice.io';
    ENV.APP.API_HOST = 'http://jedrula.ddns.net:7002'; // 7002 goes to my NAS and is reversed proxied to .202 pi
  }

  return ENV;
};
