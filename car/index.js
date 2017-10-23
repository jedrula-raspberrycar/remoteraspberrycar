var async = require('async');
function Wheel(pwm1, pwm2) {
  return {
    changeSpeed(speed) {
      if (speed > 0) {
        pwm2.write(0);
        pwm1.write(speed / 100);
      } else {
        pwm1.write(0);
        pwm2.write((-1 * speed) / 100);
      }
    },
    getGpiosStr: () => pwm1.getPinNumber() + ":" + pwm2.getPinNumber() + ":" + speed
  }
}

function Create(GpioOut1,GpioOut2,GpioOut3,GpioOut4) {
  const wheels = {
    one: Wheel(GpioOut1,GpioOut2),
    two: Wheel(GpioOut3,GpioOut4),
  }
  return {
    wheels
  }
}

module.exports = Create;
