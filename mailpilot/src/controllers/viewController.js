const Contact = require('../models/Contact');
const Campaign = require('../models/Campaign');

exports.renderDashboard = async (req, res) => {
  const contactCount = await Contact.countDocuments({ userId: req.user });
  const campaignCount = await Campaign.countDocuments({ userId: req.user });
  const recentCampaigns = await Campaign.find({ userId: req.user })
    .sort({ createdAt: -1 })
    .limit(5);
  res.render('dashboard', {
    contactCount,
    campaignCount,
    recentCampaigns,
    user: req.user,
  });
};

exports.renderContacts = async (req, res) => {
  const contacts = await Contact.find({ userId: req.user }).sort({
    createdAt: -1,
  });
  res.render('contacts', { contacts, user: req.user });
};

exports.renderCampaigns = async (req, res) => {
  const campaigns = await Campaign.find({ userId: req.user }).sort({
    createdAt: -1,
  });
  res.render('campaigns', {
    campaigns,
    user: req.user,
    success_msg: req.flash ? req.flash('success_msg') : undefined,
    error_msg: req.flash ? req.flash('error_msg') : undefined,
  });
};
