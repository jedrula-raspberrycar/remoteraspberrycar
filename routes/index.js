const JSONAPISerializer = require('jsonapi-serializer').Serializer;
const WheelSerializer = new JSONAPISerializer('wheels', {
  attributes: ['status']
});

const express = require('express');
const router = express.Router();

const GpioOut = require('../gpio/gpio').GpioOut;

const Car = require('../car/index');

const car = Car(
  GpioOut(7),
  GpioOut(11),
  GpioOut(13),
  GpioOut(15)
);

function triggerWheelAction(key, command, cb) {
  const logAction = `hit wheel ${key} with command ${command} `;
  console.log('lets try to ' + logAction);
  try {
    const wheel = car.wheels[key];
    wheel[command](() => cb(null, {'ok ' :  logAction + wheel.getGpiosStr()}));
  }
  catch(e) {
    cb({error: `probably wrong command ${command} sent or wheel with key ${key} does not exist`});//res.status(500).json({error: `probably wrong command ${command} sent or wheel with key ${key} does not exist`});
  }
}

router.patch('/wheels/:id', function(req, res, next) {
  const id = req.params.id;
  const status = req.body.data.attributes.status;
  triggerWheelAction(id, status, (err, data) => {
    if(err) {
      res.status(500).json(err);
    }
    else {
      res.status(204).send();
    }
  })
});

router.get('/wheels/:id', (req, res, next) => { //TODO read actual status from pins
  const data = WheelSerializer.serialize({
    id: req.params.id,
    status: 'stopped'
  });
  res.json(data);
});

module.exports = router;
