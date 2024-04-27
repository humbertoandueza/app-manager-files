const Joi = require('joi');

const create = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    permissions: Joi.object().keys({
      images: Joi.boolean(),
      videos: Joi.boolean(),
      documents: Joi.boolean(),
    }),
  }),
};

const get = {
  params: Joi.object().keys({
    thematicId: Joi.string().required(),
  }),
};

const update = {
  params: Joi.object().keys({
    thematicId: Joi.string().required(),
  }),
  body: Joi.object().keys({
    name: Joi.string().required(),
    permissions: Joi.object().keys({
      images: Joi.boolean(),
      videos: Joi.boolean(),
      documents: Joi.boolean(),
    }),
    _id: Joi.string(),
  }),
};

const remove = {
  params: Joi.object().keys({
    thematicId: Joi.string().required(),
  }),
};

module.exports = {
  create,
  get,
  update,
  remove,
};
