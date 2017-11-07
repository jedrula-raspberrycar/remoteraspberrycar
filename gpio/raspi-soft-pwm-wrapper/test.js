const wrapper = require('./raspi-soft-pwm-wrapper');
const { PWM } = wrapper;
const waitOneSec = cb => setTimeout(cb, 1000);

Promise
  .all([PWM(7), PWM(11)])
  .then(([pwm7, pwm11]) => {
    pwm7.write(0.8);
    pwm11.write(0);
  })
  .then(waitOneSec)
  .then(() => {
    pwm7.write(0);
    pwm11.write(0);
  })
  .then(waitOneSec)
  .then(() => {
    pwm7.write(1);
    pwm11.write(0);
  })
  .then(() => {
    pwm7.write(0);
    pwm11.write(0);
  })
