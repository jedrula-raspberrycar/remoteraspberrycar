const express = require('express');

const app = express();
const cors = require('cors');
const wss = require('express-ws')(app);
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

app.listen(80, '0.0.0.0', () => {
  console.log(`listening on 80`);
});

// const port = 8085; // parseInt(process.env.PORT || 8080);

// app.listen(port, '0.0.0.0', () => {
//   console.log(`listening on ${port}`);
// });
