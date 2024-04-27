const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const CategoryType = {
  IMAGES: 'images',
  VIDEOS: 'videos',
  DOCUMENTS: 'documents',
};

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(CategoryType),
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

categorySchema.plugin(toJSON);
categorySchema.plugin(paginate);

const Category = mongoose.model('Category', categorySchema);

module.exports = {
  Category,
  CategoryType,
};
