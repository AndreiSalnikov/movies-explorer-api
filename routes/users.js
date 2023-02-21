const router = require('express').Router();
const { userUpdateValidation } = require('../middlewares/serverDataValidation');

const {
  getMe, updateUser,
} = require('../controllers/users');

router.get('/me', getMe);

router.patch(
  '/me',
  userUpdateValidation,
  updateUser,
);

module.exports = router;
