const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));

const routes = require('./routes/index');
const users = require('./routes/users');

app.use(cors());
app.use('/', routes);
app.use('/users', users);



/*
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
*/

app.use(function (err, req, res, next) {
  console.error(err);
  next(err);
})

let counter = 0;
wss.on('connection', function connection(ws, req) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    ws.send('messageresponse to: ' + message);
  });

  ws.send('connected');
});

app.get('/fetchtest', (req, res) => {
  res.json({ messageresponse: 'to get request'});
})



const port = parseInt(process.env.PORT || 80);
server.listen(port, '0.0.0.0', () => {
  console.log(`listening on ${server.address().port}`);
});
