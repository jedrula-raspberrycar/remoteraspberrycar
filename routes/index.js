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
    on: (cb) => gpio.write(pinNumber, true, cb) 
  }
}

 
// gpio.setup(7, gpio.DIR_OUT, write);
// gpio.setup(8, gpio.DIR_OUT, write);
// gpio.setup(9, gpio.DIR_OUT, write);
 
 GpioOut7 = GpioOut(7);



router.get('/write7', function(req, res, next) {
  console.log('router get')
   GpioOut7.on(() => res.json({'written' : GpioOut7.getPinNumber()}));
   
  //res.render('index', { title: 'Express' });
});

module.exports = router;
