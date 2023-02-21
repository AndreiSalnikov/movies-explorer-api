const { Joi, celebrate } = require('celebrate');

const userRegistrationValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.empty': 'Поле "name" должно быть заполнено',
        'string.min': 'Поле "name" должно быть не менее 2 символов',
        'string.max': 'Поле "name" должно быть не более 30 символов',
        'any.required': 'Поле "name" обязательное для заполнения',
      }),
    email: Joi.string().required().email().messages({
      'string.empty': 'Поле "email" должно быть заполнено',
      'string.email': 'Поле "email" содержит некорректные данные',
      'any.required': 'Поле "email" обязательное для заполнения',
    }),
    password: Joi.string().required().messages({
      'string.empty': 'Поле "password" должно быть заполнено',
      'any.required': 'Поле "password" обязательное для заполнения',
    }),
  }),
});

const userLoginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'string.empty': 'Поле "email" должно быть заполнено',
      'string.email': 'Поле "email" содержит некорректные данные',
      'any.required': 'Поле "email" обязательное для заполнения',
    }),
    password: Joi.string().required().messages({
      'string.empty': 'Поле "password" должно быть заполнено',
      'any.required': 'Поле "password" обязательное для заполнения',
    }),
  }),
});

const userUpdateValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required()
      .messages({
        'string.empty': 'Поле "name" должно быть заполнено',
        'string.min': 'Поле "name" должно быть не менее 2 символов',
        'string.max': 'Поле "name" должно быть не более 30 символов',
        'any.required': 'Поле "name" обязательное для заполнения',
      }),
    email: Joi.string().email().required().messages({
      'string.empty': 'Поле "email" должно быть заполнено',
      'string.email': 'Поле "email" содержит некорректные данные',
      'any.required': 'Поле "email" обязательное для заполнения',
    }),
  }),
});

const movieCreateValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().messages({
      'string.empty': 'Поле "country" должно быть заполнено',
      'any.required': 'Поле "country" обязательное для заполнения',
    }),
    director: Joi.string().required().messages({
      'string.empty': 'Поле "director" должно быть заполнено',
      'any.required': 'Поле "director" обязательное для заполнения',
    }),
    duration: Joi.number().required().messages({
      'any.required': 'Поле "duration" обязательное для заполнения',
    }),
    year: Joi.string().required().messages({
      'string.empty': 'Поле "year" должно быть заполнено',
      'any.required': 'Поле "year" обязательное для заполнения',
    }),
    description: Joi.string().required().messages({
      'string.empty': 'Поле "description" должно быть заполнено',
      'any.required': 'Поле "description" обязательное для заполнения',
    }),
    image: Joi.string()
      .required()
      .uri({ scheme: ['http', 'https'] }).messages({
        'string.uriCustomScheme': 'Ссылка должна соответствовать шаблону http/https',
        'string.empty': 'Поле "image" должно быть заполнено',
        'any.required': 'Поле "image" обязательное для заполнения',
      }),
    trailerLink: Joi.string()
      .required()
      .uri({ scheme: ['http', 'https'] }).messages({
        'string.uriCustomScheme': 'Ссылка должна соответствовать шаблону http/https',
        'string.empty': 'Поле "trailerLink" должно быть заполнено',
        'any.required': 'Поле "trailerLink" обязательное для заполнения',
      }),
    thumbnail: Joi.string()
      .required()
      .uri({ scheme: ['http', 'https'] }).messages({
        'string.uriCustomScheme': 'Ссылка должна соответствовать шаблону http/https',
        'string.empty': 'Поле "thumbnail" должно быть заполнено',
        'any.required': 'Поле "thumbnail" обязательное для заполнения',
      }),
    movieId: Joi.number().required().messages({
      'any.required': 'Поле "movieId" обязательное для заполнения.',
    }),
    nameRU: Joi.string().required().messages({
      'string.empty': 'Поле "nameRU" должно быть заполнено',
      'any.required': 'Поле "nameRU" обязательное для заполнения',
    }),
    nameEN: Joi.string().required().messages({
      'string.empty': 'Поле "nameEN" должно быть заполнено',
      'any.required': 'Поле "nameEN" обязательное для заполнения',
    }),
  }),
});

const movieDeleteValidation = celebrate({
  params: Joi.object()
    .keys({
      movieId: Joi.string().length(24).hex().required()
        .messages({
          'string.length': '"movieId" должна быть длинной 24 символа',
        }),
    }),
});

module.exports = {
  userRegistrationValidation,
  userLoginValidation,
  userUpdateValidation,
  movieCreateValidation,
  movieDeleteValidation,
};
