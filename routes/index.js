var JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;
var jsonapiDeserializer = new JSONAPIDeserializer();

var JSONAPISerializer = require('jsonapi-serializer').Serializer;
var WheelSerializer = new JSONAPISerializer('wheels', {
  attributes: ['status']
});

var express = require('express');
var async = require('async');
var router = express.Router();
var gpio;
try {
  gpio = require('rpi-gpio');
  gpio.on('change', function(channel, value) {
    console.log('Channel ' + channel + ' value is now ' + value);
  });
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
    on: (cb) => {
      console.log('lets call gpio.write on ' + pinNumber);
      gpio.write(pinNumber, true, cb);
    },
    off: (cb) => {
      console.log('lets call gpio.write on ' + pinNumber);
      gpio.write(pinNumber, false, cb);
    }
  }
}

function closePins(cb) {
    gpio.destroy(function() {
      console.log('All pins closed/destroyed');
	    cb();
    });
}

process.on('SIGTERM', gracefulExit);
process.on('SIGINT', gracefulExit);

function gracefulExit() {
  console.log('About to exit.');
	closePins(process.exit);
}

var GpioOut7 = GpioOut(7);
var GpioOut11 = GpioOut(11);
var GpioOut13 = GpioOut(13);
var GpioOut15 = GpioOut(15);

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


const wheels = {
  one: Wheel(GpioOut7,GpioOut11),
  two: Wheel(GpioOut13,GpioOut15),
}

function triggerWheelAction(key, command, cb) {
  const logAction = `hit wheel ${key} with command ${command} `;
  console.log('lets try to ' + logAction);
  try {
    const wheel = wheels[key];
    wheel[command](() => cb(null, {'ok ' :  logAction + wheel.getGpiosStr()}));//() => res.json({'ok ' :  logAction + wheel.getGpiosStr()})
  }
  catch(e) {
    cb({error: `probably wrong command ${command} sent or wheel with key ${key} does not exist`});//res.status(500).json({error: `probably wrong command ${command} sent or wheel with key ${key} does not exist`});
  }
}
router.patch('/wheels/:id', function(req, res, next) {
  const id = req.params.id;
  const status = req.body.data.attributes.status;
  //console.log('req body', req.body, jsonapiDeserializer.deserialize(req.body));
  triggerWheelAction(id, status, (err, data) => {
    if(err) {
      res.status(500).json(err);
    }
    else {
      res.status(204).send();
    }
  })
});

router.get('/wheels/:id', (req, res, next) => {
  //TODO read actual status from pinsl
  var data = WheelSerializer.serialize({id: req.params.id, status: 'stopped'});
  console.log('hit', req.params.id,req.body, data);
  res.json(data);
});

router.post('/wheels/:command', function(req, res, next) {
  const command = req.params.command;
  async.parallel([
    (cb) => triggerWheelAction('one', command, cb),
    (cb) => triggerWheelAction('two', command, cb)
  ], 
  (err, data) => {
      console.log('/wheels/:command', err, data);
      if(err) {
        res.status(500).json(err);
      }
      else {
        res.json(data);
      }
  });
});

router.post('/off', function(req, res, next) {
  console.log('router get off')
   GpioOut7.off(() => res.json({'written off' : GpioOut7.getPinNumber()}));
  GpioOut11.off();
});
module.exports = router;
