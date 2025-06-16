const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Create this folder if not exists
  },
  filename: function (req, file, cb) {
    cb(null, `contacts-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'text/csv') cb(null, true);
  else cb(new Error('Only CSV files are allowed'), false);
};

module.exports = multer({ storage, fileFilter });
