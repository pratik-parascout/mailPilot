const express = require('express');
const upload = require('../middleware/uploadCSV');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  addContact,
  getContacts,
  updateContact,
  deleteContact,
  uploadCSV,
} = require('../controllers/contactController');

router.use(auth);
router.post('/', addContact);
router.get('/', getContacts);
router.put('/:id', updateContact);
router.delete('/:id', deleteContact);
router.post('/upload', upload.single('file'), uploadCSV);

module.exports = router;
