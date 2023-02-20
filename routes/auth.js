const router = require('express').Router();
const { userRegistrationValidation, userLoginValidation } = require('../middlewares/serverDataValidation');
const {
  login, createUser,
} = require('../controllers/users');

router.post(
  '/signup',
  userRegistrationValidation,
  createUser,
);

router.post(
  '/signin',
  userLoginValidation,
  login,
);

module.exports = router;
