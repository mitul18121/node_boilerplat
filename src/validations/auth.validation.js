const Joi = require('joi');
const { password } = require('./customevalidation');

const register = {
  body: Joi.object().keys({
    name: Joi.string().required().messages({
      'string.base': `name should be a type of text`,
      'string.empty': `name cannot be an empty field`,
      'any.required': `name is a required field`,
    }),
    phone: Joi.number().required().messages({
      'string.base': `Phone should be a type of number`,
      'string.empty': `Phone cannot be an empty field`,
      'any.required': `Phone is a required field`,
    }),
    email: Joi.string().required().messages({
      'string.base': `email should be a type of text`,
      'string.empty': `email cannot be an empty field`,
      'any.required': `email is a required field`,
    }),
    password: Joi.string().required().custom(password).messages({
      'string.base': `password should be a type of text`,
      'string.empty': `name cannot be an empty field`,
      'any.required': `name is a required field`,
    }),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required().messages({
      'string.base': `email should be a type of string`,
      'string.empty': `email cannot be an empty field`,
      'any.required': `email is a required field`,
    }),
    password: Joi.string().required().messages({
      'string.base': `password should be a type of string`,
      'string.empty': `password cannot be an empty field`,
      'any.required': `password is a required field`,
    }),
  }),
};

const logout = {
  body: Joi.object().keys({
    _id: Joi.string().required(),
  }),
};

module.exports = { register, login, logout };
