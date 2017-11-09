// FIXME EPIPE error, probably connected to too many listeners, with wss it does not breake though (as it did with express-ws)
// move from frontend direcory!
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const raspividStream = require('raspivid-stream');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws, req) {
  console.log('Client connected');
  ws.send(JSON.stringify({
    action: 'init',
    width: '960',
    height: '540'
  }));

  const videoStream = raspividStream({ rotation: 180 });
  videoStream.on('data', (data) => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(data, { binary: true }, (error) => { if (error) console.error(error); });
    }
  });

  ws.on('close', () => {
    console.log('Client left');
    videoStream.removeAllListeners('data');
  });
});

server.listen(80, '0.0.0.0', () => {
  console.log(`listening on 80`);
});
