// move from frontend direcory!
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const raspividStream = require('raspivid-stream');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// let counter = 0;
// const sockets = {};

wss.on('connection', function connection(ws, req) {
  console.log('Client connected');
  // counter++;
  // ws.counter = counter;
  // sockets[counter] = ws;
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
    // delete sockets[ws.counter];
    videoStream.removeAllListeners('data');
  });
});


// videoStream.on('data', (data) => {
//   const socketIds = Object.keys(sockets);
//   socketIds.forEach(function each(key) {
//     const client = sockets[key];
//     if (client.readyState === WebSocket.OPEN) {
//       client.send(data, { binary: true }, (error) => { if (error) console.error(error); });
//     }
//   });
// });

server.listen(80, '0.0.0.0', () => {
  console.log(`listening on 80`);
});
