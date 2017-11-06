// http://wiringpi.com/pins/
let Gpio;
try {
  Gpio = require('pigpio').Gpio;
}
catch(err) {
  // TODO would be better of with some environment flag, no ?
  Gpio = function() {
    this.pwmWrite = function(x) {
      console.log('would pwm write: ' + x);
    }
  }
}

module.exports = {
  // change to pwmFactory or sth
  PWM(pinNumber) {
    // TODO not most robust ! improve when more time
    let pwmPin = new Gpio(pinNumber, {mode: Gpio.INPUT});

    return {
      getPinNumber: () => pinNumber,
      write(dutyCycle) {
        dutyCycle = parseInt(dutyCycle, 10);
        console.log('writing dutyCycle: ' + dutyCycle)
        pwmPin.pwmWrite(dutyCycle);
      }
    }
  }
};

/*

pwm = require('raspi-soft-pwm');pwmPin7 = new pwm.SoftPWM(`P1-7`);pwmPin11 = new pwm.SoftPWM(`P1-11`);
pwmPin11.write(0.15);pwmPin11.write(0);pwmPin7.write(0.15);pwmPin7.write(0);pwmPin7.write(0.14);

 */
