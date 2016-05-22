var express = require('express');
var router = express.Router();
var gpio = require('rpi-gpio');
 
// gpio.setup(7, gpio.DIR_OUT, write);
// gpio.setup(8, gpio.DIR_OUT, write);
// gpio.setup(9, gpio.DIR_OUT, write);
 
function writeToPin(pinNumber) {
    gpio.write(pinNumber, true, function(err) {
        if (err) throw err;
        console.log('Written to pin' + pinNumber);
    });
}



router.get('/write7', function(req, res, next) {
   writeToPin(7);
   res.json({'written' : 7})
  //res.render('index', { title: 'Express' });
});

module.exports = router;
