const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  name: {type: String},
  admin: {type: Boolean, default: false},
  createdDate: {type: Date, default: Date.now()},
});

userSchema.pre('save', function(next) {
  let user = this;

  if (!user.isModified('password')) return next();

  bcrypt.hash(user.password, salt, (err, hash) => {
    user.password = hash;
    next();
  });
});

userSchema.methods.verifyPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateToken = function() {
  return jwt.sign({id: this._id}, process.env.HASH_SECRET, {
    expiresIn: 60 * 60 * 24 * 7
  });
};

const User = mongoose.model('User', userSchema);

module.exports = () => User;
