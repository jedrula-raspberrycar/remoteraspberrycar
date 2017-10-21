const async = require('async');
const GpioOut = require('../gpio/gpio').GpioOut;
const one = GpioOut(7 || process.env.PIN1);
const two = GpioOut(11 || process.env.PIN2);

const waitOneSec = cb => setTimeout(cb, 1000);

setTimeout(() => {
  console.log('seting off');
  async.series([
    cb => async.parallel([one.off, two.off], cb),
    waitOneSec,
    cb => async.parallel([one.on, two.off], cb),
    waitOneSec,
    cb => async.parallel([one.off, two.off], cb),
    waitOneSec,
    cb => async.parallel([one.off, two.on], cb),
    waitOneSec,
    cb => async.parallel([one.off, two.off], cb),
  ]);
}, 1000);
