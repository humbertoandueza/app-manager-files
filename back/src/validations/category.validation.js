const Joi = require('joi');
const { CategoryType } = require('../models/category.model');

const createCategory = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    type: Joi.string()
      .valid(...Object.values(CategoryType))
      .required(),
    coverImage: Joi.string().required(),
  }),
};

const getCategory = {
  params: Joi.object().keys({
    categoryId: Joi.string().required(),
  }),
};

const updateCategory = {
  params: Joi.object().keys({
    categoryId: Joi.string().required(),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    type: Joi.string().valid(...Object.values(CategoryType)),
    coverImage: Joi.string(),
    _id: Joi.string(),
  }),
};

const deleteCategory = {
  params: Joi.object().keys({
    categoryId: Joi.string().required(),
  }),
};

module.exports = {
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
};
