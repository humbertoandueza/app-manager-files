const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const contentSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Category',
      required: true,
    },
    url: {
      type: String,
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    thematic: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Thematic',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

contentSchema.plugin(toJSON);
contentSchema.plugin(paginate);

const Content = mongoose.model('Content', contentSchema);

module.exports = Content;
