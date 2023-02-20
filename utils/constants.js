const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;
const UNAUTHORIZED = 401;
const CONFLICT_ERROR = 409;
const FORBIDDEN = 403;

const BAD_REQUEST_MESSAGE = 'Переданы некорректные данные';
const NOT_FOUND_ID = 'Такого id нет в базе';
const WRONG_OWNER = 'Вы не можете удалить чужую карточку';
const WRONG_ID = 'Передан некорректный id';
const NOT_FOUND_PAGE = 'Такой страницы не существует';
const CONFLICT_ERROR_MESSAGE = 'Такой пользователь уже существует';
const BAD_TOKEN_TYPE = 'Должен быть токен типа Bearer Token ';
const WRONG_TOKEN = 'Неправильный токен';
const INTERNAL_SERVER_ERROR_MESSAGE = '';

module.exports = {
  FORBIDDEN,
  CONFLICT_ERROR,
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  UNAUTHORIZED,
  BAD_REQUEST_MESSAGE,
  NOT_FOUND_ID,
  WRONG_OWNER,
  WRONG_ID,
  NOT_FOUND_PAGE,
  CONFLICT_ERROR_MESSAGE,
  BAD_TOKEN_TYPE,
  WRONG_TOKEN,
  INTERNAL_SERVER_ERROR_MESSAGE,
};
