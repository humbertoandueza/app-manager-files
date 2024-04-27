const express = require('express');
const validate = require('../../middlewares/validate');
const thematicController = require('../../controllers/thematic.controller');
const thematicValidation = require('../../validations/thematic.validation');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('/create', auth('create'), validate(thematicValidation.create), thematicController.createThematic);
router.put('/:thematicId/update', auth('update'), validate(thematicValidation.update), thematicController.updateThematic);
router.get('/', auth('read'), thematicController.getThematics);
router.get('/:thematicId', auth('read'), validate(thematicValidation.get), thematicController.getThematic);
router.delete('/:thematicId/delete', auth('delete'), validate(thematicValidation.remove), thematicController.deleteThematic);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Thematic
 *   description: Thematic management
 */

/**
 * @swagger
 * /thematic/create:
 *   post:
 *     summary: Create a new thematic entity
 *     tags: [Thematic]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - permissions
 *             properties:
 *               name:
 *                 type: string
 *               permissions:
 *                 type: object
 *                 properties:
 *                   images:
 *                     type: boolean
 *                   videos:
 *                     type: boolean
 *                   documents:
 *                     type: boolean
 *     responses:
 *       "201":
 *         description: Created
 *       "400":
 *         description: Bad request
 */

/**
 * @swagger
 * /thematic/{thematicId}:
 *   get:
 *     summary: Get a thematic entity by ID
 *     tags: [Thematic]
 *     parameters:
 *       - in: path
 *         name: thematicId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: OK
 *       "404":
 *         description: Not found
 */

/**
 * @swagger
 * /thematic/{thematicId}/update:
 *   put:
 *     summary: Update a thematic entity
 *     tags: [Thematic]
 *     parameters:
 *       - in: path
 *         name: thematicId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - permissions
 *             properties:
 *               name:
 *                 type: string
 *               permissions:
 *                 type: object
 *                 properties:
 *                   images:
 *                     type: boolean
 *                   videos:
 *                     type: boolean
 *                   documents:
 *                     type: boolean
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
 * /thematic/{thematicId}/delete:
 *   delete:
 *     summary: Remove a thematic entity by ID
 *     tags: [Thematic]
 *     parameters:
 *       - in: path
 *         name: thematicId
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
 * /thematic/:
 *   get:
 *     summary: List all thematic entities
 *     tags: [Thematic]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter by name
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Sort by field (e.g., name:asc, name:desc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Limit number of thematic entities to return per page
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
 *                         description: The unique identifier of the thematic entity
 *                       name:
 *                         type: string
 *                       permissions:
 *                         type: object
 *                         properties:
 *                           images:
 *                             type: boolean
 *                           videos:
 *                             type: boolean
 *                           documents:
 *                             type: boolean
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
 *                     name: "string"
 *                     permissions:
 *                       images: true
 *                       videos: true
 *                       documents: true
 *                   - id: "662a771f52d64301f805c05f"
 *                     name: "string1"
 *                     permissions:
 *                       images: true
 *                       videos: true
 *                       documents: true
 *                 page: 1
 *                 limit: 10
 *                 totalPages: 1
 *                 totalResults: 2
 *       "400":
 *         description: Bad request
 */
