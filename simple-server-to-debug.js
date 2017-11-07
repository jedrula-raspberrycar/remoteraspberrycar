// server to debug fetch api
const express = require('express');
const cors = require('cors');
const app = new express();
app.use(cors());
const bodyParser = require('body-parser');
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.patch('/test', function(req, res, next) {
  console.log(req.body);
  res.json({
    wow: 'x'
  })
});

app.listen(8432);
