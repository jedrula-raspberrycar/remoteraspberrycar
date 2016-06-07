var gpio;

try {
  gpio = require('rpi-gpio');
  gpio.on('change', function(channel, value) {
    console.log('Channel ' + channel + ' value is now ' + value);
  });
}
catch(err) {
  console.warn('gpio require failed, creating stub for os not supporting rpi-gpio');
  gpio = require('../gpio/mock');
}

function closePins(cb) {
    gpio.destroy(function() {
      console.log('All pins closed/destroyed');
      cb();
    });
}

function gracefulExit() {
  console.log('About to exit.');
  closePins(process.exit);
}

process.on('SIGTERM', gracefulExit);
process.on('SIGINT', gracefulExit);


module.exports = {
  GpioOut(pinNumber) {
    gpio.setup(pinNumber, gpio.DIR_OUT, () => console.log('set up on ' + pinNumber));
    return {
      getPinNumber: () => pinNumber,
      on: (cb) => {
        console.log('lets call gpio.write on ' + pinNumber);
        gpio.write(pinNumber, true, cb);
      },
      off: (cb) => {
        console.log('lets call gpio.write on ' + pinNumber);
        gpio.write(pinNumber, false, cb);
      }
    }
  }
}
