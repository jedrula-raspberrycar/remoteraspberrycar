// http://wiringpi.com/pins/
const raspi = require('raspi');
const pwm = require('raspi-soft-pwm');

module.exports = {
  PWM(pinNumber) {
    // TODO not most robust ! improve when more time
    let pwmPin;
    raspi.init(() => {
      pwmPin = new pwm.SoftPWM(`P1-${pinNumber}`);
    });

    return {
      getPinNumber: () => pinNumber,
      on() {
        console.log('lets gpio.write true on ' + pinNumber);
        pwmPin.write(1);
      },
      off() {
        console.log('lets gpio.write false on ' + pinNumber);
        pwmPin.write(0);
      },
      write(dutyCycle) {
        pwmPin.write(dutyCycle);
      }
    }
  }
};
