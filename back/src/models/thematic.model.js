const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const thematicSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    permissions: {
      videos: {
        type: Boolean,
        default: false,
      },
      documents: {
        type: Boolean,
        default: false,
      },
      images: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

thematicSchema.plugin(toJSON);
thematicSchema.plugin(paginate);

const Thematic = mongoose.model('Thematic', thematicSchema);

module.exports = Thematic;
