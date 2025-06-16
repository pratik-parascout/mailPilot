const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  createCampaign,
  getCampaigns,
} = require('../controllers/campaignController');

router.use(auth);
router.post('/', createCampaign);
router.get('/', getCampaigns);

module.exports = router;
