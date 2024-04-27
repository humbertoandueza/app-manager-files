const httpStatus = require('http-status');
const categoryService = require('../services/category.service');

const isValidHttpUrl = (string) => {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === 'http:' || url.protocol === 'https:';
};
const validateContentType = async (req, res, next) => {
  const { category: categoryId, url } = req.body;
  if (url && url.length) {
    try {
      const category = await categoryService.getCategoryById(categoryId);

      if (!category) {
        return res.status(httpStatus.BAD_REQUEST).send({ message: 'Invalid category ID' });
      }

      switch (category.type) {
        case 'videos':
          if (!isValidHttpUrl(url)) {
            return res.status(httpStatus.BAD_REQUEST).send({ message: 'URL is required for video content' });
          }
          break;
        default:
          return res.status(httpStatus.BAD_REQUEST).send({ message: 'Unsupported category type' });
      }
      return next();
    } catch (error) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Server error during content validation' });
    }
  }
  return next();
};

module.exports = validateContentType;
