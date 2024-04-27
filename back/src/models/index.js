const { Category, CategoryType } = require('./category.model');

module.exports.Token = require('./token.model');
module.exports.User = require('./user.model');

module.exports.Category = Category;
module.exports.CategoryType = CategoryType;
module.exports.Thematic = require('./thematic.model');
module.exports.Content = require('./content.model');
