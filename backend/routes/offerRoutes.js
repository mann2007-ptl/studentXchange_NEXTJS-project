const express = require('express');
const router = express.Router();
const {
  getOffers,
  createOffer,
  updateOfferStatus,
  deleteOffer,
} = require('../controllers/offerController');

router.get('/', getOffers);
router.post('/', createOffer);
router.put('/:id', updateOfferStatus);
router.delete('/:id', deleteOffer);

module.exports = router;
