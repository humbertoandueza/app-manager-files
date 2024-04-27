const catchAsync = require('../utils/catchAsync');

const uploadImage = catchAsync(async (req, res) => {
  const imageUrl = `/categories/${req.file.filename}`;
  res.send({ imageUrl });
});

module.exports = {
  uploadImage,
};
