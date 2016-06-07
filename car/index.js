var async = require('async');
function Wheel(gpiout1, gpiout2) {
  return {
    forward(cb) {//TODO first turn off both maybe it will help with forward->back or back->forward
      async.parallel([gpiout1.on, gpiout2.off], cb);
    },
    back(cb) {//TODO first turn off both maybe it will help with forward->back or back->forward
      async.parallel([gpiout1.off, gpiout2.on], cb);
    },
    stopped(cb) {
      async.parallel([gpiout1.off, gpiout2.off], cb);
    },
    getGpiosStr: () => gpiout1.getPinNumber() + ":" + gpiout2.getPinNumber()
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
