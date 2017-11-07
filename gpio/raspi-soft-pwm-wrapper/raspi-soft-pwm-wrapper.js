// http://wiringpi.com/pins/
let raspi, pwm;
try {
  raspi = require('raspi');
  pwm = require('raspi-soft-pwm');
}
catch(err) {
  // TODO would be better of with some environment flag, no ?
  raspi = {
    init(cb) {
      cb();
    }
  };

  pwm = {
    SoftPWM: function() {
      this.write = () => { console.log('fake writing ')}
    }
  }
}

module.exports = {
  // change to pwmFactory or sth
  PWM(pinNumber) {
    // TODO not most robust ! improve when more time
    let pwmPin;
    const promise = new Promise((resolve, reject) => {
      raspi.init(() => {
        pwmPin = new pwm.SoftPWM(`P1-${pinNumber}`);
        resolve({
          getPinNumber: () => pinNumber,
          write(dutyCycle) {
            console.log(`writing dutyCycle ${dutyCycle} to pinNumber: ${pinNumber}`, typeof dutyCycle, Number.isInteger(dutyCycle))
            pwmPin.write(dutyCycle);
          }
        });
      });
    });
    return promise;
  }
};
