const GpioOut = require('../gpio/gpio').GpioOut;
const one = GpioOut(7);
const two = GpioOut(11);
setTimeout(() => {
  console.log('seting on');
  one.off();
  two.off();
}, 1000)
