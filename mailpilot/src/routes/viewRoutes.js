const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  renderDashboard,
  renderContacts,
  renderCampaigns,
} = require('../controllers/viewController');
const campaignController = require('../controllers/campaignController');
const templateRoutes = require('./templateRoutes');
const smtpRoutes = require('./smtpRoutes');

router.use(auth);
router.get('/dashboard', renderDashboard);
router.get('/contacts', renderContacts);
router.get('/campaigns', renderCampaigns);
router.get('/upload', (req, res) => res.render('upload'));
router.get('/campaigns/new', campaignController.getNewForm);
router.post('/campaigns', campaignController.postCreateCampaign);
router.post('/campaigns/:id/resend-failed', campaignController.resendFailed);
router.use('/templates', templateRoutes);
router.use('/smtp-settings', smtpRoutes);

module.exports = router;
