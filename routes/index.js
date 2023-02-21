const router = require('express').Router();
const auth = require('../middlewares/auth');
const NotFound = require('../errors/NotFound');
const authRouter = require('./auth');
const usersRouter = require('./users');
const moviesRouter = require('./movies');

const { NOT_FOUND_PAGE } = require('../utils/constants');

router.use('', authRouter);
router.use(auth);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
router.use('*', (req, res, next) => next(new NotFound(NOT_FOUND_PAGE)));

module.exports = router;
