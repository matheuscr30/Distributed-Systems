const dotenv  = require('dotenv');
const express = require('express');
const consign = require('consign');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

dotenv.config();

mongoose.connect('mongodb://localhost:27017/slack', {useNewUrlParser: true, autoIndex: false});

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

function verifyToken(req, res, next) {
  let token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, process.env.HASH_SECRET, function (err, decoded) {
      if (err) return res.status(403).json({auth: false, message: 'Failed to authenticate token.'});
      else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(401).send({auth: false, message: 'No token provided.'});
  }
}

const exceptionRoutes = [
  {url: '/users/', method: 'POST'},
  {url: '/login/', method: 'POST'}
];

app.use('/api', function (req, res, next) {
  if (req.method === 'OPTIONS') return next();

  let found = false;
  for (let route of exceptionRoutes) {
    if (route.url === req.url && route.method === req.method) {
      found = true;
      break;
    }
  }

  if(found) return next();
  else verifyToken(req, res, next);
});

consign()
  .include('app/routes')
  .then('app/models')
  .then('app/controllers')
  .into(app);

module.exports = app;
