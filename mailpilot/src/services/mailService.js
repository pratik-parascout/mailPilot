const nodemailer = require('nodemailer');
const SmtpConfig = require('../models/smtpConfig');
const { decrypt } = require('../utils/crypto');

async function getTransporter(userId, smtpProvider) {
  // If smtpProvider is explicitly set, use it
  if (smtpProvider === 'custom') {
    const config = await SmtpConfig.findOne({ userId });
    if (config && config.provider === 'custom') {
      return nodemailer.createTransport({
        host: config.host,
        port: config.port,
        secure: config.tls,
        auth: {
          user: config.email,
          pass: decrypt(config.password),
        },
        tls: config.tls ? { rejectUnauthorized: false } : undefined,
      });
    }
  }
  // fallback to default (env) if no user config or provider is default
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });
}

// Always require userId for sending
exports.sendEmailToList = async (
  subject,
  htmlBody,
  recipients,
  userId,
  smtpProvider
) => {
  if (!userId) throw new Error('User ID is required for sending emails');
  const transporter = await getTransporter(userId, smtpProvider);
  const sendPromises = recipients.map((email) => {
    return transporter
      .sendMail({
        from: transporter.options.auth.user,
        to: email,
        subject,
        html: htmlBody,
      })
      .then(() => ({ email, status: 'Sent' }))
      .catch((err) => ({ email, status: 'Failed', error: err.message }));
  });

  return Promise.all(sendPromises);
};
