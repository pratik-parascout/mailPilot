const mongoose = require('mongoose');

const smtpConfigSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  provider: { type: String, enum: ['default', 'custom'], default: 'default' },
  host: { type: String },
  port: { type: Number },
  email: { type: String },
  password: { type: String }, // encrypted
  tls: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('SmtpConfig', smtpConfigSchema);
