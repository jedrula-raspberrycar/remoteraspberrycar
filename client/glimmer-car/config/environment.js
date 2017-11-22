'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'glimmer-car',
    environment
  };

  return ENV;
};

// use when fixed: https://github.com/glimmerjs/glimmer-application-pipeline/issues/89#issuecomment-341990772
// module.exports = function(environment) {
//   var ENV = {
//     modulePrefix: 'glimmer-car',
//     environment,

//     APP: {
//       API_SERVER_PROTOCOL: 'http',
//       API_WEBSOCKET_PROTOCOL: 'ws',
//       API_DOMAIN: 'localhost',
//       API_PORT: '80'
//     }
//   };

//   if (environment === 'lan') {
//     // TODO make this smarter! read qr code and determine dynamicaly ?
//     ENV.APP.API_DOMAIN = 'raspberrypi.local';
//   }

//   if (environment === 'production') {
//     ENV.APP.API_DOMAIN = 'jedrula.ddns.net';
//     ENV.APP.API_PORT = '7002'; // 7002 goes to my NAS and is reversed proxied to .202 pi
//   }

//   if (environment === 'resin') {
//     ENV.APP.API_DOMAIN = 'c88e016b1ddda096c9545e62c8a0a520.resindevice.io';
//   }


//   ENV.APP.API_HOST = `${ENV.APP.API_SERVER_PROTOCOL}://${ENV.APP.API_DOMAIN}:${ENV.APP.API_PORT}`;
//   ENV.APP.API_WS_HOST = `${ENV.APP.API_WEBSOCKET_PROTOCOL}://${ENV.APP.API_DOMAIN}:${ENV.APP.API_PORT}`;

//   return ENV;
// };
