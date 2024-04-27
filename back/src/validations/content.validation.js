const Joi = require('joi');

const create = {
  body: Joi.object({
    title: Joi.string().required(),
    category: Joi.string().required(),
    url: Joi.string(),
    thematic: Joi.string().required(),
    file: Joi.any().meta({ swaggerType: 'file' }).description('File upload field'),
  }),
};

const get = {
  params: Joi.object().keys({
    contentId: Joi.string().required(),
  }),
};

const update = {
  params: Joi.object().keys({
    contentId: Joi.string().required(),
  }),
  body: Joi.object().keys({
    title: Joi.string().required(),
    category: Joi.string().required(),
    url: Joi.string().uri(),
    createdBy: Joi.string().required(),
    thematic: Joi.string().required(),
  }),
};

const remove = {
  params: Joi.object().keys({
    contentId: Joi.string().required(),
  }),
};

module.exports = {
  create,
  get,
  update,
  remove,
};
