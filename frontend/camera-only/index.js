// move from frontend direcory!
const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);
const raspividStream = require('raspivid-stream');
app.ws('/video-stream', (ws, req) => {
    console.log('Client connected');

    ws.send(JSON.stringify({
      action: 'init',
      width: '960',
      height: '540'
    }));

    ws.on('close', () => {
        console.log('Client left');
    });
});

const videoStreamWss = expressWs.getWss('/a');

const videoStream = raspividStream({ rotation: 180 });
videoStream.on('data', (data) => {
  videoStreamWss.clients.forEach((client) => {
    client.send(data, { binary: true }, (error) => { if (error) console.error(error); });
  });
});

app.listen(80, '0.0.0.0', () => {
  console.log(`listening on 80`);
});
