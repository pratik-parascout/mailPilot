const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const templateController = require('../controllers/templateController');

router.use(auth);

router.get('/', templateController.listTemplates);
router.get('/new', templateController.getNewForm);
router.post('/new', templateController.createTemplate);
router.get('/:id/edit', templateController.getEditForm);
router.post('/:id/edit', templateController.updateTemplate);
router.post('/:id/delete', templateController.deleteTemplate);
router.get('/:id/use', templateController.useTemplate);
router.get('/builder', (req, res) => {
  res.render('templates/builder');
});
router.post('/builder/save', templateController.saveFromBuilder);

module.exports = router;
