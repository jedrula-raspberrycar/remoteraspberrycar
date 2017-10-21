// http://wiringpi.com/pins/
const raspi = require('raspi');
const pwm = require('raspi-pwm');

raspi.init(() => {
  const led = new pwm.PWM('P1-12');
  led.write(0.5); // 50% Duty Cycle, aka half brightness
});

module.exports = {
  PWM(pinNumber) {
    const pwm = new pwm.PWM(`P1-${pinNumber}`);
    return {
      getPinNumber: () => pinNumber,
      on() {
        console.log('lets gpio.write true on ' + pinNumber);
        pwm.write(1);
      },
      off() {
        console.log('lets gpio.write false on ' + pinNumber);
        pwm.write(0);
      }
      write(dutyCycle) {
        pwm.write(dutyCycle);
      }
    }
  }
}
