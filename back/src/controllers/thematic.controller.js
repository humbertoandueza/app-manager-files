const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { thematicService } = require('../services');
const pick = require('../utils/pick');

const createThematic = catchAsync(async (req, res) => {
  const thematic = await thematicService.createThematic(req.body);
  res.status(httpStatus.CREATED).send(thematic);
});

const getThematics = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  if (req.query.permissions) {
    const permissionsQuery = req.query.permissions.split(',');

    // Using $and to ensure all specified permissions are true
    filter.$and = permissionsQuery
      .map((permission) => {
        if (['videos', 'documents', 'images'].includes(permission)) {
          return { [`permissions.${permission}`]: true };
        }
        return null;
      })
      .filter((item) => item !== null);
  }

  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const thematics = await thematicService.getThematics(filter, options);
  res.send(thematics);
});

const getThematic = catchAsync(async (req, res) => {
  const thematic = await thematicService.getThematicById(req.params.thematicId);
  res.send(thematic);
});

const updateThematic = catchAsync(async (req, res) => {
  const thematic = await thematicService.updateThematicById(req.params.thematicId, req.body);
  res.send(thematic);
});

const deleteThematic = catchAsync(async (req, res) => {
  await thematicService.deleteThematicById(req.params.thematicId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createThematic,
  getThematics,
  getThematic,
  updateThematic,
  deleteThematic,
};
