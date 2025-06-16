require('dotenv').config(); // Ensure .env is loaded

const crypto = require('crypto');

// console.log(process.env.CRYPTO_SECRET);
const ALGO = 'aes-256-cbc';
const secret = process.env.CRYPTO_SECRET;
if (!secret) {
  throw new Error(
    'CRYPTO_SECRET environment variable is not defined or not loaded. Check your .env file and dotenv config.'
  );
}
const key = Buffer.from(secret, 'hex');
const IV = Buffer.from(process.env.SMTP_SECRET_IV, 'hex');

exports.encrypt = (text) => {
  const cipher = crypto.createCipheriv(ALGO, key, IV);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
};

exports.decrypt = (encrypted) => {
  const decipher = crypto.createDecipheriv(ALGO, key, IV);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};
