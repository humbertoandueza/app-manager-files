const { Content, Thematic } = require('../models');

const createContent = async (contentBody) => {
  return Content.create(contentBody);
};

const getContents = async (filter, options) => {
  return Content.paginate(filter, options);
};

const getContentById = async (id) => {
  return Content.findById(id);
};

const updateContentById = async (id, updateBody) => {
  const content = await getContentById(id);
  Object.assign(content, updateBody);
  await content.save();
  return content;
};

const deleteContentById = async (id) => {
  const content = await getContentById(id);
  await content.remove();
  return content;
};

const getContentByThematic = async () => {
  return Content.aggregate([
    {
      $group: {
        _id: {
          thematic: '$thematic',
          category: '$category',
        },
        count: { $sum: 1 },
      },
    },
    {
      $group: {
        _id: '$_id.thematic',
        categories: {
          $push: {
            category: '$_id.category',
            count: '$count',
          },
        },
        total: { $sum: '$count' },
      },
    },
    {
      $lookup: {
        from: 'thematics', // Asegúrate de usar el nombre correcto de la colección de temáticas
        localField: '_id',
        foreignField: '_id',
        as: 'thematicDetails',
      },
    },
    {
      $lookup: {
        from: 'categories', // Asegúrate de usar el nombre correcto de la colección de categorías
        let: { categories: '$categories.category' },
        pipeline: [
          {
            $match: {
              $expr: {
                $in: ['$_id', '$$categories'],
              },
            },
          },
        ],
        as: 'categoryDetails',
      },
    },
    {
      $project: {
        _id: 0,
        thematic: { $arrayElemAt: ['$thematicDetails', 0] },
        categories: {
          $map: {
            input: '$categories',
            as: 'category',
            in: {
              category: {
                $arrayElemAt: [
                  {
                    $filter: {
                      input: '$categoryDetails',
                      as: 'cat',
                      cond: { $eq: ['$$cat._id', '$$category.category'] },
                    },
                  },
                  0,
                ],
              },
              count: '$$category.count',
            },
          },
        },
        total: 1,
      },
    },
  ]);
};

module.exports = {
  getContentByThematic,
  createContent,
  getContents,
  getContentById,
  updateContentById,
  deleteContentById,
};
