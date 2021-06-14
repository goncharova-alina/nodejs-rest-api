const path = require('path');
require('dotenv').config();
const multer = require('multer');
const { imageSizeLimit } = require('../config/rate-limit.json');

const UPLOAD_DIR = path.join(process.cwd(), 'tmp');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: imageSizeLimit },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes('image')) {
      cb(null, true);
      return;
    }
    cb(null, false);
  },
});

module.exports = upload;