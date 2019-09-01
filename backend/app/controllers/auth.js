const User = require('./../models/user')();

const { check, validationResult } = require('express-validator');

module.exports.login = function (application, req, res) {
  let body = req.body;
  check('username', 'Username is Required').not().isEmpty();
  check('password', 'Password is Required').not().isEmpty();

  let errors = validationResult(req).array();

  if (errors.length !== 0) {
    let errorText = errors[0].msg;
    return res.status(500).json({message: errorText});
  }

  User.findOne({ username: body['username'] }, function(err, user) {
    if (err) return res.status(500).json({ message: 'There was a problem with the login' });
    if (!user || !user.verifyPassword(body['password'])) return res.status(404).json({ message: 'Wrong Credentials' });

    let accessToken = user.generateToken();
    res.status(200).json({
      accessToken: accessToken,
      user: user
    });
  })
};
