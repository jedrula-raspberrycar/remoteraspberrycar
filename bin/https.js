require('greenlock-express').create({

  server: 'staging'

, email: 'john.doe@example.com'

, agreeTos: true

, approveDomains: [ 'example.com' ]

, app: require('express')().use('/', function (req, res) {
    res.end('Hello, World!');
  })

}).listen(80, 443);
