const express = require('express');
const uploadController = require('../../controllers/upload.controller');
const upload = require('../../utils/upload');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('/', auth('create'), upload.single('image'), uploadController.uploadImage);

module.exports = router;
