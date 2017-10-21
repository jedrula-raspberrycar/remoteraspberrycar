const async = require('async');
const PWM = require('../gpio/pwm').PWM;
const one = PWM(13 || process.env.PIN1);
const two = PWM(15 || process.env.PIN2);

const waitOneSec = cb => setTimeout(cb, 1000);

setTimeout(() => {
  console.log('seting off');
  async.series([
    cb => { one.off(); two.off(); cb() },
    waitOneSec,
    cb => { one.on(); two.off(); cb() }
    waitOneSec,
    cb => { one.off(); two.off(); cb() },
    waitOneSec,
    cb => { one.off(); two.on(); cb() },
    waitOneSec,
    cb => { one.off(); two.off(); cb() },
  ]);
}, 1000);
