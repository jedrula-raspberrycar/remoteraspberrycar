  let gpio;

try {
  gpio = require('rpi-gpio');
  gpio.on('change', function(channel, value) {
    console.log('Channel ' + channel + ' value is now ' + value);
  });
}
catch(err) {
  // TODO would be better of with some environment flag, no ?
  console.warn('gpio require failed, creating stub for os not supporting rpi-gpio');
  gpio = require('../gpio/rpi-gpio-mock');
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
    gpio.setup(pinNumber, gpio.DIR_OUT, () => console.log('gpio set up on ' + pinNumber));
    return {
      getPinNumber: () => pinNumber,
      on: (cb) => {
        console.log('lets gpio.write true on ' + pinNumber);
        gpio.write(pinNumber, true, cb);
      },
      off: (cb) => {
        console.log('lets gpio.write false on ' + pinNumber);
        gpio.write(pinNumber, false, cb);
      }
    }
  }
}
