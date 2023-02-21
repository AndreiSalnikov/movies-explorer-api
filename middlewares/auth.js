const jwt = require('jsonwebtoken');
const config = require('../utils/config');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { BAD_TOKEN_TYPE, WRONG_TOKEN } = require('../utils/constants');

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new UnauthorizedError(BAD_TOKEN_TYPE);
    }

    const token = authorization.replace('Bearer ', '');
    req.user = jwt.verify(token, config.JWT_SECRET); // записываем пейлоуд в объект запроса
  } catch (err) {
    throw new UnauthorizedError(WRONG_TOKEN);
  }
  next(); // пропускаем запрос дальше
};
