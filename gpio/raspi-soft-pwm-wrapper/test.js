const PWM = require('./raspi-soft-pwm-wrapper').PWM;
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

/*
const PWM = require('./raspi-soft-pwm-wrapper').PWM; let pwm7, pwm11; Promise.all([PWM(7), PWM(11)]).then(([pwm1, pwm2]) => { pwm7 = pwm1; pwm11 = pwm2;});
pwm7.write(0);pwm11.write(1);

let pwm13, pwm15; Promise.all([PWM(13), PWM(15)]).then(([pwm1, pwm2]) => { pwm13 = pwm1; pwm15 = pwm2;});

pwm13.write(0);pwm15.write(0);
pwm13.write(0);pwm15.write(1);setTimeout(() => { pwm13.write(0);pwm15.write(0); }, 100)
*/
