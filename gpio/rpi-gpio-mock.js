module.exports = {
  write(pinNumber, value, cb) {
    console.log(`would normally write ${value} to ${pinNumber}`);
    setTimeout(cb, 1000);
  },
  setup(pinNumber, inOrOut, cb) {
    console.log(`would normally setup on ${pinNumber}`);
    cb();
  },
  destroy(cb) {
    console.log('destroy gitgpios');
    cb();
  }
}
