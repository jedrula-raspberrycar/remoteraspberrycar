var express = require('express');
var router = express.Router();
var gpio;
try {
 gpio = require('rpi-gpio'); 
}
catch(err) {
 console.warn('gpio require failed, creating stub for os not supporting rpi-gpio');
 gpio = {
  write(pinNumber, value, cb) {
    console.log(`would normally write ${value} to ${pinNumber}`);
    setTimeout(cb, 1000);
  },
  setup(pinNumber) {
    console.log(`would normally setup on ${pinNumber}`);
  }
 }
}

function GpioOut(pinNumber) {
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

 
// gpio.setup(7, gpio.DIR_OUT, write);
// gpio.setup(8, gpio.DIR_OUT, write);
// gpio.setup(9, gpio.DIR_OUT, write);
 
var GpioOut7 = GpioOut(7);
var GpioOut11 = GpioOut(11);

router.get('/left', function(req, res, next) {
  console.log('turn left');
//TODO add async  
GpioOut7.on(() => res.json({'written' : GpioOut7.getPinNumber()}));
GpioOut11.off();
});

router.get('/right', function(req, res, next) {
  console.log('turn right');
//TODO add async
GpioOut7.off(() => res.json({'written' : GpioOut7.getPinNumber()}));
GpioOut11.on();
});

router.get('/off', function(req, res, next) {
  console.log('router get off')
   GpioOut7.off(() => res.json({'written off' : GpioOut7.getPinNumber()}));
  GpioOut11.off();
});
module.exports = router;
