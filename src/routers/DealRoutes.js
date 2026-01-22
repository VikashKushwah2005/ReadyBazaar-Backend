const express = require('express');
const router = express.Router();
const DealController = require('../controller/DealController');

router.get('/', DealController.getAllDeals);
router.post('/', DealController.createDeal);
router.patch('/:id', DealController.updateDeal);
router.delete('/:id', DealController.deleteDeal);

module.exports = router;