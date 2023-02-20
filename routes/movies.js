const router = require('express').Router();
const { movieCreateValidation, movieDeleteValidation } = require('../middlewares/serverDataValidation');

const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

router.get('', getMovies);

router.post(
  '',
  movieCreateValidation,
  createMovie,
);

router.delete(
  '/:movieId',
  movieDeleteValidation,
  deleteMovie,
);

module.exports = router;
