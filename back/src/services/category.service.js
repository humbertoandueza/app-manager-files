const { Category } = require('../models');

const createCategory = async (categoryBody) => {
  return Category.create(categoryBody);
};

const getCategories = async (filter, options) => {
  return Category.paginate(filter, options);
};

const getCategoryById = async (id) => {
  return Category.findById(id);
};

const updateCategoryById = async (id, updateBody) => {
  const category = await getCategoryById(id);
  Object.assign(category, updateBody);
  await category.save();
  return category;
};

const deleteCategoryById = async (id) => {
  const category = await getCategoryById(id);
  await category.remove();
  return category;
};

module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
};
