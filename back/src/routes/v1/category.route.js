const express = require('express');
const validate = require('../../middlewares/validate');
const categoryValidation = require('../../validations/category.validation');
const categoryController = require('../../controllers/category.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('/create', auth('create'), validate(categoryValidation.createCategory), categoryController.createCategory);
router.put(
  '/:categoryId/update',
  auth('update'),
  validate(categoryValidation.updateCategory),
  categoryController.updateCategory
);
router.get('/', auth('read'), categoryController.getCategories);
router.get('/:categoryId', auth('read'), validate(categoryValidation.getCategory), categoryController.getCategory);
router.delete(
  '/:categoryId/delete',
  auth('delete'),
  validate(categoryValidation.deleteCategory),
  categoryController.deleteCategory
);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Category management
 */

/**
 * @swagger
 * /category/create:
 *   post:
 *     summary: Create a new category
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - type
 *               - coverImage
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [TYPE1, TYPE2]  # Replace TYPE1, TYPE2 with actual types
 *               coverImage:
 *                 type: string
 *                 format: uri
 *                 description: URL of the cover image
 *     responses:
 *       "201":
 *         description: Category created
 *       "400":
 *         description: Bad request
 */

/**
 * @swagger
 * /category/{categoryId}:
 *   get:
 *     summary: Get a category by ID
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: OK
 *       "404":
 *         description: Category not found
 */

/**
 * @swagger
 * /category/{categoryId}/update:
 *   put:
 *     summary: Update a category
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [TYPE1, TYPE2]  # Replace TYPE1, TYPE2 with actual types
 *               coverImage:
 *                 type: string
 *                 format: uri
 *     responses:
 *       "200":
 *         description: Category updated
 *       "400":
 *         description: Bad request
 *       "404":
 *         description: Category not found
 */

/**
 * @swagger
 * /category/{categoryId}/delete:
 *   delete:
 *     summary: Delete a category
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "204":
 *         description: Category deleted
 *       "404":
 *         description: Category not found
 */
/**
 * @swagger
 * /category/:
 *   get:
 *     summary: List all categories
 *     tags: [Category]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter by name
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Filter by type
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Sort by field (e.g., name:asc, name:desc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Limit number of categories to return per page
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: The unique identifier of the category
 *                       name:
 *                         type: string
 *                       type:
 *                         type: string
 *                         enum: [TYPE1, TYPE2]  # Replace TYPE1, TYPE2 with actual types
 *                       coverImage:
 *                         type: string
 *                         format: uri
 *                         description: URL of the cover image
 *                 page:
 *                   type: integer
 *                   description: The current page of the query
 *                 limit:
 *                   type: integer
 *                   description: The number of items per page
 *                 totalPages:
 *                   type: integer
 *                   description: The total number of pages
 *                 totalResults:
 *                   type: integer
 *                   description: The total number of results
 *               example:
 *                 results:
 *                   - id: "5f78ae68734d1d0123466789"
 *                     name: "Nature"
 *                     type: "Environmental"
 *                     coverImage: "http://example.com/image.jpg"
 *                 page: 1
 *                 limit: 10
 *                 totalPages: 1
 *                 totalResults: 2
 *       "400":
 *         description: Bad request
 */
