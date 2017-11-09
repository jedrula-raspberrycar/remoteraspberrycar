const express = require('express');
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws');
const raspividStream = require('raspivid-stream');
const PWM = require('./gpio/raspi-soft-pwm-wrapper/raspi-soft-pwm-wrapper').PWM;

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

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

wss.on('connection', function connection(ws, req) {
  console.log('Client connected');
  ws.send(JSON.stringify({ action: 'init', width: '960', height: '540' }));

  const videoStream = raspividStream({ rotation: 180 });

  // buzy inspired by: https://github.com/131/h264-live-player/blob/master/lib/_server.js#L42

  videoStream.on('data', (data) => {
    if (!ws.buzy && ws.readyState === WebSocket.OPEN) {
      ws.buzy = true;
      ws.send(data, { binary: true }, (error) => {
        if (error) console.error(error);
        ws.buzy = false;
      });
    }
  });

  ws.on('close', () => {
    console.log('Client left');
    videoStream.removeAllListeners('data');
  });
});

const port = parseInt(process.env.PORT || 80);
server.listen(port, '0.0.0.0', () => {
  console.log(`listening on ${port}`);
});
