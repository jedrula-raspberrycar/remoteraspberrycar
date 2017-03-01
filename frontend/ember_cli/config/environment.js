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
    // ENV.APP.API_HOST = 'http://localhost:3000';
    ENV.APP.API_HOST = 'http://192.168.0.125:3000';
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
    ENV.APP.API_HOST = 'http://192.168.0.155:3001';
  }

  if (environment === 'production') {
    // steps i took to setup a https
    // 1. created a free domain at freenom
    // 2. registered the domain in cloudfare
    // 3. changed the nameservers in freenom from freenom's to cloudfare's
    // 4. waited and waited... lets see if it worked
    // ... maybe https will need to be added to nodejs?

    // I am trying to start with somthing like client -> cloudfare server -> raspberry
    // ENV.APP.API_HOST = 'https://78.88.255.144:3001';
    // https://www.cloudflare.com/a/crypto/raspberrycar.tk
    // https://my.freenom.com/clientarea.php?managedns=raspberrycar.tk&domainid=1025525855
    ENV.APP.API_HOST = 'https://www.raspberrycar.tk:3001';
  }

  return ENV;
};
