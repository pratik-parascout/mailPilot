const SmtpConfig = require('../models/smtpConfig');
const { encrypt, decrypt } = require('../utils/crypto');

exports.getSettingsForm = async (req, res) => {
  const config = await SmtpConfig.findOne({ userId: req.user });
  let decrypted = null;
  if (config) {
    decrypted = {
      ...config.toObject(),
      password: '', // never show password
    };
  }
  res.render('smtp-settings', {
    config: decrypted,
    success_msg: req.flash('success_msg'),
    error_msg: req.flash('error_msg'),
  });
};

exports.saveSettings = async (req, res) => {
  const { provider, host, port, email, password, tls } = req.body;
  try {
    let update = { provider: provider || 'default' };
    if (provider === 'custom') {
      update = {
        ...update,
        host,
        port: parseInt(port, 10),
        email,
        password: encrypt(password),
        tls: tls === 'on' || tls === true,
      };
    } else {
      // Clear custom fields if switching to default
      update = {
        ...update,
        host: undefined,
        port: undefined,
        email: undefined,
        password: undefined,
        tls: undefined,
      };
    }
    await SmtpConfig.findOneAndUpdate({ userId: req.user }, update, {
      upsert: true,
      new: true,
    });
    req.flash('success_msg', 'SMTP settings saved!');
    res.redirect('/smtp-settings');
  } catch (err) {
    req.flash('error_msg', 'Failed to save SMTP settings.');
    res.redirect('/smtp-settings');
  }
};
