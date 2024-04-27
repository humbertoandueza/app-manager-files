const express = require('express');
const validate = require('../../middlewares/validate');
const contentController = require('../../controllers/content.controller');
const contentValidation = require('../../validations/content.validation');
const upload = require('../../utils/uploadContent');
const validateContentTypeUrl = require('../../middlewares/validateContentTypeUrl');
const validateContentTypeFile = require('../../middlewares/validateContentTypeFile');

const router = express.Router();

router.post(
  '/create',
  upload.single('file'),
  validateContentTypeUrl,
  validateContentTypeFile,
  validate(contentValidation.create),
  contentController.createContent
);
router.put('/:contentId/update', validate(contentValidation.update), contentController.updateContent);
router.get('/byThematic', contentController.getContentsByThematic);
router.get('/', contentController.getContents);
router.get('/:contentId', validate(contentValidation.get), contentController.getContent);
router.delete('/:contentId/delete', validate(contentValidation.remove), contentController.deleteContent);

module.exports = router;
/**
 * @swagger
 * tags:
 *   name: Content
 *   description: Content management
 */

/**
 * @swagger
 * /content/create:
 *   post:
 *     summary: Create a new content entry based on category type
 *     tags: [Content]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - category
 *               - thematic
 *             properties:
 *               title:
 *                 type: string
 *               category:
 *                 type: string
 *                 description: ID of the category, determines the content validation rules
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: File upload field, required for image or document type categories
 *               url:
 *                 type: string
 *                 format: uri
 *                 description: URL of the content, required for video type categories
 *               thematic:
 *                 type: string
 *                 description: ID of the thematic
 *     responses:
 *       "201":
 *         description: Content created successfully
 *       "400":
 *         description: Bad request, possibly due to missing or invalid inputs based on category type
 */

/**
 * @swagger
 * /content/{contentId}:
 *   get:
 *     summary: Get a content entry by ID
 *     tags: [Content]
 *     parameters:
 *       - in: path
 *         name: contentId
 *         required: true
 *         schema:
 *           type: string
 *           description: ObjectId of the content
 *     responses:
 *       "200":
 *         description: OK
 *       "404":
 *         description: Not found
 */

/**
 * @swagger
 * /content/{contentId}/update:
 *   put:
 *     summary: Update a content entry
 *     tags: [Content]
 *     parameters:
 *       - in: path
 *         name: contentId
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
 *               title:
 *                 type: string
 *               category:
 *                 type: string
 *               url:
 *                 type: string
 *                 format: uri
 *               createdBy:
 *                 type: string
 *               thematic:
 *                 type: string
 *     responses:
 *       "200":
 *         description: Updated
 *       "400":
 *         description: Bad request
 *       "404":
 *         description: Not found
 */

/**
 * @swagger
 * /content/{contentId}/delete:
 *   delete:
 *     summary: Remove a content entry by ID
 *     tags: [Content]
 *     parameters:
 *       - in: path
 *         name: contentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "204":
 *         description: No Content
 *       "404":
 *         description: Not found
 */

/**
 * @swagger
 * /content/:
 *   get:
 *     summary: List all content entries
 *     tags: [Content]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category
 *       - in: query
 *         name: thematic
 *         schema:
 *           type: string
 *         description: Filter by thematic
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Filter by title
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Sort by field (e.g., title:asc, title:desc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Limit number of content entries to return per page
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
 *                         description: The unique identifier of the content entry
 *                       title:
 *                         type: string
 *                       category:
 *                         type: string
 *                       url:
 *                         type: string
 *                         format: uri
 *                       createdBy:
 *                         type: string
 *                       thematic:
 *                         type: string
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
 *                   - id: "662a75def4a49800e7c66940"
 *                     title: "Amazing Nature"
 *                     category: "5f78ae68734d1d0123466789"
 *                     url: "http://example.com/nature"
 *                     createdBy: "5f78ae68734d1d0123466789"
 *                     thematic: "5f78ae68734d1d0123466789"
 *                 page: 1
 *                 limit: 10
 *                 totalPages: 1
 *                 totalResults: 2
 *       "400":
 *         description: Bad request
 */

/**
 * @swagger
 * /content/byThematic:
 *   get:
 *     summary: List all content entries
 *     tags: [Content]
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
 *                         description: The unique identifier of the content entry
 *                       title:
 *                         type: string
 *                       category:
 *                         type: string
 *                       url:
 *                         type: string
 *                         format: uri
 *                       createdBy:
 *                         type: string
 *                       thematic:
 *                         type: string
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
 *                   - id: "662a75def4a49800e7c66940"
 *                     title: "Amazing Nature"
 *                     category: "5f78ae68734d1d0123466789"
 *                     url: "http://example.com/nature"
 *                     createdBy: "5f78ae68734d1d0123466789"
 *                     thematic: "5f78ae68734d1d0123466789"
 *                 page: 1
 *                 limit: 10
 *                 totalPages: 1
 *                 totalResults: 2
 *       "400":
 *         description: Bad request
 */
