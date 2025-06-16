const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const smtpController = require('../controllers/smtpController');

router.use(auth);

router.get('/', smtpController.getSettingsForm);
router.post('/', smtpController.saveSettings);

module.exports = router;
