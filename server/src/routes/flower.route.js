'use strict';
const express = require('express');
const router = express.Router();
const flowerController = require('../controllers/flower.controller.js');

router.get('/', flowerController.getAll);
router.get('/:id', flowerController.getFlowerById);
router.post('/', flowerController.postFlower);
router.delete('/:id', flowerController.deleteFlowerById);

module.exports = router;

