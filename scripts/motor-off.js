const GpioOut = require('../gpio/rpi-gpio-wrapper').GpioOut;
const one = GpioOut(7);
const two = GpioOut(11);
setTimeout(() => {
  console.log('seting off');
  one.off();
  two.off();
}, 1000)
