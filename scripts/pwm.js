const async = require('async');
const PWM = require('../gpio/pwm').PWM;
const one = PWM(13 || process.env.PIN1);
const two = PWM(15 || process.env.PIN2);


const waitOneSec = cb => setTimeout(cb, 1000);

/*


setTimeout(() => {
  console.log('pwm script');
  async.series([
    cb => { one.off(); two.off(); cb(); },
    waitOneSec,
    cb => { one.on(); two.off(); cb(); },
    waitOneSec,
    cb => { one.off(); two.off(); cb(); },
    waitOneSec,
    cb => { one.off(); two.on(); cb(); },
    waitOneSec,
    cb => { one.off(); two.off(); cb(); },
  ]);
}, 1000);
*/



function speedUp(first, second, cb) {
  first.off();
  second.off();
  increaseSpeed(0, first, cb)
}



function increaseSpeed(speed, pin, cb) {
  const newSpeed = speed + 0.05;
  if (newSpeed >= 1) {
      pin.off();
      cb();
    } else {
      pin.write(newSpeed);
      setTimeout(() => increaseSpeed(newSpeed, pin, cb), 600);
    }
}


setTimeout(() => {
  console.log('pwm script');
  async.series([
    cb => { speedUp(one, two, cb); },
    waitOneSec,
    cb => { speedUp(two, one, cb); },
    waitOneSec,
  ]);
}, 1000);
