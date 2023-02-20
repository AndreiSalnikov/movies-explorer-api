const Movie = require('../models/movie');
const BadRequest = require('../errors/BadRequest');
const NotFound = require('../errors/NotFound');
const Forbidden = require('../errors/Forbidden');

const {
  BAD_REQUEST_MESSAGE, NOT_FOUND_ID, WRONG_OWNER, WRONG_ID,
} = require('../utils/constants');

module.exports.createMovie = (req, res, next) => {
  Movie.create({ ...req.body, owner: req.user._id })
    .then((card) => card.populate(['owner']))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest(BAD_REQUEST_MESSAGE));
      } else {
        next(err);
      }
    });
};

module.exports.getMovies = (req, res, next) => Movie.find({ owner: req.user._id }).populate(['owner'])
  .then((cards) => res.send(cards))
  .catch(next);

module.exports.deleteMovie = (req, res, next) => Movie.findById(req.params.movieId).populate(['owner']).then((card) => {
  if (card === null) { throw new NotFound(NOT_FOUND_ID); }
  if (card.owner._id.toString() !== req.user._id) {
    throw new Forbidden(WRONG_OWNER);
  }
  return card.remove().then(() => res.send(card));
}).catch((err) => {
  if (err.name === 'CastError') { next(new BadRequest(WRONG_ID)); } else {
    next(err);
  }
});
