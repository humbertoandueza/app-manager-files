const fs = require('fs');
const httpStatus = require('http-status');
const categoryService = require('../services/category.service');

const isImageFile = (mimetype) => ['image/jpeg', 'image/png', 'image/gif'].includes(mimetype);

const isDocumentFile = (mimetype) =>
  [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ].includes(mimetype);

const validateContentType = async (req, res, next) => {
  const { category: categoryId } = req.body;
  if (req.body.filePath) {
    try {
      const category = await categoryService.getCategoryById(categoryId);

      if (!category) {
        return res.status(httpStatus.BAD_REQUEST).send({ message: 'Invalid category ID' });
      }
      switch (category.type) {
        case 'images':
          if (!req.body.filePath || !isImageFile(req.body.fileMimetype)) {
            fs.rmSync(req.body.filePath);
            return res.status(httpStatus.BAD_REQUEST).send({ message: 'An image file is required for image content' });
          }
          break;
        case 'documents':
          if (!req.body.filePath || !isDocumentFile(req.body.fileMimetype)) {
            fs.rmSync(req.body.filePath);
            return res.status(httpStatus.BAD_REQUEST).send({ message: 'A document file is required for document content' });
          }
          break;
        default:
          return res.status(httpStatus.BAD_REQUEST).send({ message: 'Unsupported category type' });
      }
      const { filePath, fileMimetype, ...newBody } = req.body;
      req.body = { ...newBody };
      return next();
    } catch (error) {
      console.log({ error });
      return res.status(httpStatus.BAD_REQUEST).send({ message: 'Server error during content validation' });
    }
  }

  return next();
};

module.exports = validateContentType;
