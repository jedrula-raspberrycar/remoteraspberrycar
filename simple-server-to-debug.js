// server to debug fetch api
const express = require('express');
const cors = require('cors');
const app = new express();
const PWM = require('./gpio/raspi-soft-pwm-wrapper/raspi-soft-pwm-wrapper').PWM;
app.use(cors());
const bodyParser = require('body-parser');
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

Promise.all([PWM(7), PWM(11), PWM(13), PWM(15)]).then((pwms) => {
  app.patch('/car', function(req, res, next) {
    // FIXME add security!
    const dutyCycles = req.body.pulseModulations;
    pulseModulations.forEach((pulseModulation, index) => {
      pwms[index].write(pulseModulation);
    });
    res.json({ wow: req.body });
  });
})


app.listen(8432);
