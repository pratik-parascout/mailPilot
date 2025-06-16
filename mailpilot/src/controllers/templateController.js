const Template = require('../models/Template');

// List all templates for the user
exports.listTemplates = async (req, res) => {
  const templates = await Template.find({ userId: req.user }).sort({
    createdAt: -1,
  });
  res.render('templates', {
    templates,
    user: req.user,
    success_msg: req.flash('success_msg'),
    error_msg: req.flash('error_msg'),
  });
};

// Render new template form
exports.getNewForm = (req, res) => {
  res.render('templates/new');
};

// Create a new template
exports.createTemplate = async (req, res) => {
  const { name, subject, body } = req.body;
  try {
    await Template.create({ userId: req.user, name, subject, body });
    req.flash('success_msg', 'Template saved!');
    res.redirect('/templates');
  } catch (err) {
    req.flash('error_msg', 'Failed to save template.');
    res.redirect('/templates/new');
  }
};

// Render edit form
exports.getEditForm = async (req, res) => {
  const template = await Template.findOne({
    _id: req.params.id,
    userId: req.user,
  });
  if (!template) {
    req.flash('error_msg', 'Template not found.');
    return res.redirect('/templates');
  }
  res.render('templates/edit', { template });
};

// Update template
exports.updateTemplate = async (req, res) => {
  const { name, subject, body } = req.body;
  try {
    await Template.findOneAndUpdate(
      { _id: req.params.id, userId: req.user },
      { name, subject, body }
    );
    req.flash('success_msg', 'Template updated!');
    res.redirect('/templates');
  } catch (err) {
    req.flash('error_msg', 'Failed to update template.');
    res.redirect('/templates');
  }
};

// Delete template
exports.deleteTemplate = async (req, res) => {
  try {
    await Template.findOneAndDelete({ _id: req.params.id, userId: req.user });
    req.flash('success_msg', 'Template deleted!');
    res.redirect('/templates');
  } catch (err) {
    req.flash('error_msg', 'Failed to delete template.');
    res.redirect('/templates');
  }
};

// Use template for new campaign
exports.useTemplate = async (req, res) => {
  const template = await Template.findOne({
    _id: req.params.id,
    userId: req.user,
  });
  if (!template) {
    req.flash('error_msg', 'Template not found.');
    return res.redirect('/templates');
  }
  // Render the new campaign form with template data pre-filled
  res.render('campaigns/new', {
    template,
    error_msg: undefined,
  });
};

// Save template from Unlayer builder
exports.saveFromBuilder = async (req, res) => {
  const { name, subject, html } = req.body;
  try {
    await Template.create({
      userId: req.user,
      name,
      subject,
      body: html,
    });
    req.flash('success_msg', 'Template saved from builder!');
    res.redirect('/templates');
  } catch (err) {
    req.flash('error_msg', 'Failed to save template from builder.');
    res.redirect('/templates/builder');
  }
};
