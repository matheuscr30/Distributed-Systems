const User = require('./../models/user')();

const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

module.exports.get = function (application, req, res) {
  let token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, process.env.HASH_SECRET, function (err, decoded) {
      if (err) return res.status(403).json({message: 'Failed to authenticate token.'});
      else {
        User.findById(decoded.id, function (err, user) {
          return res.status(200).json({
            user: user
          });
        });
      }
    });
  } else {
    return res.status(401).send({message: 'No token provided.'});
  }
};

module.exports.post = function (application, req, res) {
  let body = req.body;
  check('username', 'Username is Required').not().isEmpty();
  check('password', 'Password is Required').not().isEmpty();

  let errors = validationResult(req).array();

  if (errors.length !== 0) {
    let errorText = errors[0].msg;
    return res.status(400).json({message: errorText});
  }

  let user = new User({
    name: body['name'],
    username: body['username'],
    password: body['password']
  });

  user.save(function (err, result) {
    if (err) {
      if (err.code === 11000) return res.status(409).json({message: 'Username already exists'})
    }

    let accessToken = user.generateToken();
    res.status(200).json({
      accessToken: accessToken,
      user: result
    });
  });
};

module.exports.put = function (application, req, res) {
  let id = req.params.id;
  if (id === '') return res.status(404).json({message: "The object you are looking for was not found"});

  let idFromToken = req.decoded.id;
  if (idFromToken !== id) return res.status(401).json({message: "You are not authorized to access this area"});

  let body = req.body;
  if (body === "") return res.status(400).json({message: "You need to pass something"});
  req.check('username', "Can't change username").isEmpty();

  let errors = validationResult(req);

  if (errors) {
    let errorText = errors[0].msg;
    return res.status(400).json({message: errorText});
  }

  User.findByIdAndUpdate(id, {
    name: body['name'],
    password: body['password']
  }, {new: true}, function (err, user) {
    if (err) {
      return res.status(400).json({message: "There was a problem updating the user."});
    } else {
      res.status(200).json({user});
    }
  });
};

module.exports.delete = function (application, req, res) {
  let id = req.params.id;
  if (id === '') return res.status(404).json({message: "The object you are looking for was not found"});

  let idFromToken = req.decoded.id;
  if (idFromToken !== id) return res.status(401).json({message: "You are not authorized to access this area"});

  User.findByIdAndRemove(id, function (err, user) {
    if (err) {
      res.status(400).json({message: "There was a problem deleting the user."});
    } else {
      res.status(200).json(user);
    }
  });
};
