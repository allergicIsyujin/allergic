// image
const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');

router.post('/base64', imageController.processBase64Image);
router.get('/saveImage', imageController.saveImage);

module.exports = router;
