const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const config = require('../utils/config');
const BadRequest = require('../errors/BadRequest');
const NotFound = require('../errors/NotFound');
const ConflictError = require('../errors/ConflictError');

const {
  NOT_FOUND_ID, WRONG_ID, CONFLICT_ERROR_MESSAGE, BAD_REQUEST_MESSAGE,
} = require('../utils/constants');

module.exports.getUsers = (req, res, next) => {
  User.find({}).then((users) => res.send(users))
    .catch(next);
};

module.exports.getMe = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id)
    .then((user) => {
      if (user === null) { throw new NotFound(NOT_FOUND_ID); }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest(WRONG_ID));
      } else {
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash, // записываем хеш в базу
    }))
    .then((user) => res.send({
      _id: user._id,
      name,
      email,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(CONFLICT_ERROR_MESSAGE));
      } else if (err.name === 'ValidationError') {
        next(new BadRequest(BAD_REQUEST_MESSAGE));
      } else { next(err); }
    });
};

module.exports.updateUser = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest(BAD_REQUEST_MESSAGE));
      } else if (err.name === 'CastError') { next(new BadRequest(WRONG_ID)); } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, config.JWT_SECRET, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      next(err);
    });
};
