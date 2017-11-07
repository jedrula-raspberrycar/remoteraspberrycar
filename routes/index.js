const JSONAPISerializer = require('jsonapi-serializer').Serializer;
const WheelSerializer = new JSONAPISerializer('wheels', {
  attributes: ['speed']
});

const express = require('express');
const router = express.Router();

const PWM = require('../gpio/raspi-soft-pwm-wrapper').PWM;

const Car = require('../car/index');

Promise
  .all([PWM(7), PWM(11), PWM(13), PWM(15)])
  .then((pwms) => {
    console.log('initated car, setting up patch and get routes');
    const car = Car(...pwms);
    router.patch('/wheels/:id', function(req, res, next) {
      const id = req.params.id;
      const speed = req.body.data.attributes.speed;
      const wheel = car.wheels[id];
      // console.log('change wheel speed', speed);
      wheel.changeSpeed(speed);
      res.status(204).send();
    });

    router.get('/wheels/:id', (req, res, next) => { //TODO read actual speed from pins
      const data = WheelSerializer.serialize({
        id: req.params.id,
        speed: 0
      });
      res.json(data);
    });
  });

module.exports = router;
