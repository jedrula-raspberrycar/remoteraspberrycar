// move from frontend direcory!
const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);
require('express-ws')(app, server);
const raspividStream = require('raspivid-stream');
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

server.listen(8581, '0.0.0.0', () => {
  console.log(`listening on ${server.address().port}`);
});
