var express = require('express');
var async = require('async');
var router = express.Router();
var gpio;
try {
  gpio = require('rpi-gpio'); 
  gpio.on('change', function(channel, value) {
    console.log('Channel ' + channel + ' value is now ' + value);
  });
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

function closePins(cb) {
    gpio.destroy(function() {
      console.log('All pins closed/destroyed');
	    cb();
    });
}
 
process.on('SIGTERM', gracefulExit); 
process.on('SIGINT', gracefulExit);

function gracefulExit() {
  console.log('About to exit.');
	closePins(process.exit);
}
 
var GpioOut7 = GpioOut(7);
var GpioOut11 = GpioOut(11);

function Wheel(gpiout1, gpiout2) {
  return {
    left(cb) {
      async.parallel([gpiout1.on, gpiout2.off], cb);
    },
    right(cb) {
      async.parallel([gpiout1.off, gpiout2.on], cb);
    },
    stop(cb) {
      async.parallel([gpiout1.off, gpiout2.off], cb);
    },
    getGpiosStr: () => gpiout1.getPinNumber() + ":" + gpiout2.getPinNumber()
  }
}

var wheel1 = Wheel(GpioOut7,GpioOut11);

router.get('/wheel1/left', function(req, res, next) {
  console.log('turn wheel1 left');
  wheel1.left(() => res.json({'turned wheel1 left' : wheel1.getGpiosStr()}))
});

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
