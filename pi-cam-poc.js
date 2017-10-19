const express = require('express');
const raspividStream = require('raspivid-stream');

const app = express();
const wss = require('express-ws')(app);


app.ws('/video-stream', (ws, req) => {
    console.log('Client connected');

    ws.send(JSON.stringify({
      action: 'init',
      width: '960',
      height: '540'
    }));

    var videoStream = raspividStream({ rotation: 180 });

    videoStream.on('data', (data) => {
        ws.send(data, { binary: true }, (error) => { if (error) console.error(error); });
    });

    ws.on('close', () => {
        console.log('Client left');
        updateLeds();
        videoStream.removeAllListeners('data');
    });
});


app.use(function (err, req, res, next) {
  console.error(err);
  next(err);
})

const port = parseInt(process.env.PORT || 80);

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
