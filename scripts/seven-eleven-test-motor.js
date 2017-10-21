const async = require('async');
const GpioOut = require('../gpio/gpio').GpioOut;
const one = GpioOut(7);
const two = GpioOut(11);

const waitOneSec = cb => setTimeout(cb, 1000);

setTimeout(() => {
  console.log('seting off');
  async.waterfall([
    cb => async.parallell(one.off, two.off, cb),
    waitOneSec,
    cb => async.parallell(one.on, two.off, cb),
    waitOneSec,
    cb => async.parallell(one.off, two.on, cb),
    waitOneSec,
    cb => async.parallell(one.off, two.off, cb),
  ]);
}, 1000);
