const { Thematic } = require('../models');

const createThematic = async (thematicBody) => {
  return Thematic.create(thematicBody);
};

const getThematics = async (filter, options) => {
  return Thematic.paginate(filter, options);
};

const getThematicById = async (id) => {
  return Thematic.findById(id);
};

const updateThematicById = async (id, updateBody) => {
  const thematic = await getThematicById(id);
  Object.assign(thematic, updateBody);
  await thematic.save();
  return thematic;
};

const deleteThematicById = async (id) => {
  const thematic = await getThematicById(id);
  await thematic.remove();
  return thematic;
};

module.exports = {
  createThematic,
  getThematics,
  getThematicById,
  updateThematicById,
  deleteThematicById,
};
