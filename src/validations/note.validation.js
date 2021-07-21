const Joi = require('joi');

const createNote = {
  body: Joi.object().keys({
    name: Joi.string().required().messages({
      'string.base': `name should be a type of text`,
      'string.empty': `name cannot be an empty field`,
      'any.required': `name is a required field`,
    }),
    title: Joi.string().required().messages({
      'string.base': `title should be a type of text`,
      'string.empty': `title cannot be an empty field`,
      'any.required': `title is a required field`,
    }),
    detail: Joi.string().required().messages({
      'string.base': `detail should be a type of text`,
      'string.empty': `detail cannot be an empty field`,
      'any.required': `detail is a required field`,
    }),
    tags: Joi.array()
      .items(
        Joi.string().messages({
          'string.base': `tag array should be type of string`,
        })
      )
      .optional()
      .messages({
        'string.base': `'tag' should be a type of array`,
      }),
  }),
};

const deleteNote = {
  body: Joi.object().keys({
    noteId: Joi.string(),
  }),
};

const updateNote = {
  params: Joi.object().keys({
    noteId: Joi.required(),
  }),
  body: Joi.object().keys({
    name: Joi.string().messages({
      'string.base': `name should be a type of text`,
      'string.empty': `name cannot be an empty field`,
    }),
    title: Joi.string().messages({
      'string.base': `title should be a type of text`,
    }),
    detail: Joi.string().messages({
      'string.base': `detail should be a type of text`,
    }),
    tags: Joi.array()
      .items(
        Joi.string().messages({
          'string.base': `tag array should be type of string`,
        })
      )
      .optional()
      .messages({
        'string.base': `'tag' should be a type of array`,
      }),
  }),
};

const viewSingleNote = {
  params: Joi.object().keys({
    noteId: Joi.required(),
  }),
};

module.exports = { createNote, deleteNote, updateNote, viewSingleNote };
