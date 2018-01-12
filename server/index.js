const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('../database/index.js');
const api = require('../client/helper/yelpHelpers.js')
const config = require('../config.js')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// serve static asset...
app.use(express.static(__dirname + '/../client/dist'));

app.post('/server/login', (req, res) => {
  db.getUserByUsername(req.body, (err, results) => {
    if (err) {
      res.status(400);
      res.end('Invalid User.');
    } else {
      res.status(201).json(results);
    }
  });
});

app.post('/server/signup', (req, res) => {
  db.postUser(req.body, (err, results) => {
    if (err) {
      res.status(400);
      res.end('Failed to Create User.');
    } else {
      res.status(201).json(results);
    }
  });
});

// when user search
app.get('/server/search/:query', (req, res) => {
  console.log(req.params.query)
  // api.searchBusinesses(req.params.query, (err, results) => {
  //   if (err) {
  //     res.status(400);
  //     res.end('Failed to Search.');
  //   } else {
  //     res.status(201).json(results);
  //   }
  // })
  // use below for test
  db.tempSearch(req.body, (err, results) => {
    if (err) {
      res.status(400);
      res.end('Failed to Search.');
    } else {
      //using fake data object mirroring API
      res.status(201).json(api.fakeData);
    }
  })
});

// when user clicks on a business
app.get('/server/business/:id', (req, res) => {
  console.log(req.params.id)
  res.status(200).json('ok');
});

// when user clicks on his/her profile
app.get('/profiles/:id', (req, res) => {
  res.status(200).json('ok');
});

const server = app.listen(process.env.PORT || 3000, () => {
  var port = server.address().port;
  console.log('Listening at port %s', port);
});

module.exports = server;
