const Campaign = require('../models/Campaign');
const Contact = require('../models/Contact');
const { sendEmailToList } = require('../services/mailService');
const SmtpConfig = require('../models/smtpConfig');
const cron = require('node-cron');

exports.createCampaign = async (req, res) => {
  const { title, subject, body, tags } = req.body;
  try {
    // Get contacts with the selected tags
    const contacts = await Contact.find({
      userId: req.user,
      tags: { $in: tags },
    });

    const recipients = contacts.map((c) => c.email);

    const campaign = await Campaign.create({
      userId: req.user,
      title,
      subject,
      body,
      tags,
      recipientsCount: recipients.length,
    });

    // Send emails
    const result = await sendEmailToList(subject, body, recipients, req.user);
    const allSuccess = result.every((r) => r.status === 'fulfilled');

    campaign.status = allSuccess ? 'Sent' : 'Failed';
    campaign.sentAt = new Date();
    await campaign.save();

    res
      .status(201)
      .json({ msg: 'Campaign processed', status: campaign.status });
  } catch (err) {
    res
      .status(500)
      .json({ msg: 'Error creating campaign', error: err.message });
  }
};

exports.getCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find({ userId: req.user }).sort({
      createdAt: -1,
    });
    res.status(200).json(campaigns);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching campaigns' });
  }
};

exports.getNewForm = (req, res) => {
  res.render('campaigns/new');
};

exports.postCreateCampaign = async (req, res) => {
  const { title, subject, body, tags, schedule, smtpProvider } = req.body;
  let tagArr = [];
  if (tags && typeof tags === 'string') {
    tagArr = tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
  }

  try {
    // Check for SMTP config
    const smtpConfig = await SmtpConfig.findOne({ userId: req.user });

    // If user selected custom SMTP but has not saved credentials, redirect to SMTP settings
    if (smtpProvider === 'custom') {
      if (
        !smtpConfig ||
        smtpConfig.provider !== 'custom' ||
        !smtpConfig.host ||
        !smtpConfig.port ||
        !smtpConfig.email ||
        !smtpConfig.password
      ) {
        req.flash(
          'error_msg',
          'Please configure your custom SMTP settings before sending campaigns.'
        );
        return res.redirect('/smtp-settings');
      }
    } else {
      // If user selected default and has no config, create a default config if needed
      if (!smtpConfig) {
        await SmtpConfig.create({ userId: req.user, provider: 'default' });
      }
    }

    const campaign = await Campaign.create({
      userId: req.user,
      title,
      subject,
      body,
      tags: tagArr,
      recipientsCount: 0,
      status: schedule ? 'Pending' : 'Pending',
      recipients: [],
      createdAt: new Date(),
    });

    const sendCampaign = async () => {
      const contactQuery = { userId: req.user };
      if (tagArr.length > 0) {
        contactQuery.tags = { $in: tagArr };
      }
      const contacts = await Contact.find(contactQuery);
      const recipients = contacts.map((c) => c.email);

      if (recipients.length === 0) {
        campaign.status = 'Failed';
        await campaign.save();
        req.flash('error_msg', 'No recipients found for selected tags.');
        return res.redirect('/campaigns');
      }

      campaign.recipientsCount = recipients.length;
      // Send emails and track per-email status
      const result = await sendEmailToList(
        subject,
        body,
        recipients,
        req.user,
        smtpProvider // pass the selected provider
      );
      campaign.recipients = result.map((r) => ({
        email: r.email,
        status: r.status,
        error: r.error || undefined,
      }));
      const allSuccess = result.every((r) => r.status === 'Sent');
      campaign.status = allSuccess ? 'Sent' : 'Failed';
      campaign.sentAt = new Date();
      await campaign.save();

      req.flash(
        'success_msg',
        allSuccess
          ? 'Campaign created and sent successfully!'
          : 'Campaign sent with some failures.'
      );
      return res.redirect('/campaigns');
    };

    if (schedule) {
      // Schedule with node-cron
      const date = new Date(schedule);
      const cronTime = `${date.getMinutes()} ${date.getHours()} ${date.getDate()} ${
        date.getMonth() + 1
      } *`;
      cron.schedule(cronTime, async () => {
        await sendCampaign();
      });
      req.flash('success_msg', 'Campaign scheduled successfully!');
      return res.redirect('/campaigns');
    } else {
      return await sendCampaign();
    }
  } catch (err) {
    console.error('Campaign error:', err);
    req.flash('error_msg', 'Failed to send campaign.');
    res.redirect('/campaigns/new');
  }
};

// Resend failed recipients
exports.resendFailed = async (req, res) => {
  try {
    const campaign = await Campaign.findOne({
      _id: req.params.id,
      userId: req.user,
    });
    if (!campaign) {
      req.flash('error_msg', 'Campaign not found.');
      return res.redirect('/campaigns');
    }
    const failedRecipients = campaign.recipients.filter(
      (r) => r.status === 'Failed'
    );
    if (failedRecipients.length === 0) {
      req.flash('success_msg', 'No failed recipients to resend.');
      return res.redirect('/campaigns');
    }
    // Check for SMTP config
    const smtpConfig = await SmtpConfig.findOne({ userId: req.user });
    if (!smtpConfig) {
      req.flash(
        'error_msg',
        'Please configure your SMTP settings before resending.'
      );
      return res.redirect('/smtp-settings');
    }
    const result = await sendEmailToList(
      campaign.subject,
      campaign.body,
      failedRecipients.map((r) => r.email),
      req.user
    );
    // Update per-email status
    result.forEach((r) => {
      const idx = campaign.recipients.findIndex((rec) => rec.email === r.email);
      if (idx !== -1) {
        campaign.recipients[idx].status = r.status;
        campaign.recipients[idx].error = r.error || undefined;
      }
    });
    // Update campaign status
    const anyFailed = campaign.recipients.some((r) => r.status === 'Failed');
    campaign.status = anyFailed ? 'Failed' : 'Sent';
    campaign.sentAt = new Date();
    await campaign.save();

    req.flash('success_msg', 'Resend attempted for failed recipients.');
    res.redirect('/campaigns');
  } catch (err) {
    req.flash('error_msg', 'Error resending failed emails.');
    res.redirect('/campaigns');
  }
};
