const mongoose = require('mongoose');

const recipientSchema = new mongoose.Schema({
  email: { type: String, required: true },
  status: { type: String, enum: ['Sent', 'Failed'], default: 'Failed' },
  error: { type: String },
});

const campaignSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  subject: { type: String, required: true },
  body: { type: String, required: true },
  tags: [String],
  status: {
    type: String,
    enum: ['Pending', 'Sent', 'Failed'],
    default: 'Pending',
  },
  sentAt: Date,
  recipientsCount: Number,
  recipients: [recipientSchema],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Campaign', campaignSchema);
