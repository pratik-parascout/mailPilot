const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  createCampaign,
  getCampaigns,
  getNewForm, // add this
} = require('../controllers/campaignController');

router.use(auth);
router.get('/new', getNewForm);
router.post('/', createCampaign);
router.get('/', getCampaigns);

module.exports = router;
