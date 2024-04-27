const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { contentService } = require('../services');
const pick = require('../utils/pick');

const createContent = catchAsync(async (req, res) => {
  if (req.body.file) {
    req.body.url = req.body.file;
  }
  req.body.createdBy = '662a87ae84aa060084c00ead' /* req.user._id */;
  const content = await contentService.createContent(req.body);
  res.status(httpStatus.CREATED).send(content);
});

const getContentsByThematic = catchAsync(async (req, res) => {
  const contents = await contentService.getContentByThematic();
  res.send(contents);
});

const getContents = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'thematic', 'category']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const contents = await contentService.getContents(filter, options);
  res.send(contents);
});

const getContent = catchAsync(async (req, res) => {
  const content = await contentService.getContentById(req.params.contentId);
  res.send(content);
});

const updateContent = catchAsync(async (req, res) => {
  const content = await contentService.updateContentById(req.params.contentId, req.body);
  res.send(content);
});

const deleteContent = catchAsync(async (req, res) => {
  await contentService.deleteContentById(req.params.contentId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createContent,
  getContents,
  getContentsByThematic,
  getContent,
  updateContent,
  deleteContent,
};
