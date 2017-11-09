const express = require('express');
const cors = require('cors');
const app = express();
require('express-ws')(app);
const raspividStream = require('raspivid-stream');
const PWM = require('./gpio/raspi-soft-pwm-wrapper/raspi-soft-pwm-wrapper').PWM;
app.use(cors());
const bodyParser = require('body-parser');
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

Promise.all([PWM(7), PWM(11), PWM(13), PWM(15)]).then((pwms) => {
  app.patch('/car', function(req, res, next) {
    // FIXME add security!
    const pulseModulations = req.body.pulseModulations;
    pulseModulations.forEach((pulseModulation, index) => {
      pwms[index].write(pulseModulation);
    });
    res.json({ wow: req.body });
  });
})

app.ws('/video-stream', (ws, req) => {
    console.log('Client connected');

    ws.send(JSON.stringify({
      action: 'init',
      width: '960',
      height: '540'
    }));

    const videoStream = raspividStream({ rotation: 180 });

    videoStream.on('data', (data) => {
        ws.send(data, { binary: true }, (error) => { if (error) console.error(error); });
    });

    ws.on('close', () => {
        console.log('Client left');
        videoStream.removeAllListeners('data');
    });
});

const port = parseInt(process.env.PORT || 80);
app.listen(port, '0.0.0.0', () => {
  console.log(`listening on ${port}`);
});
