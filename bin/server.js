const app = require('../app');
const db = require('../db/index');
const path = require('path');
const fs = require('fs').promises;

const UPLOAD_DIR = path.join(process.cwd(), 'tmp');
const IMG_DIR = path.join(process.cwd(), 'public', 'avatars');

const isAccessible = path => {
  return fs
    .access(path)
    .then(() => true)
    .catch(() => false);
};

const createFolderIsNotExist = async folder => {
  if (!(await isAccessible(folder))) {
    await fs.mkdir(folder);
  }
};

const PORT = process.env.PORT || 3000;

db.then(() => {
  app.listen(PORT, async () => {
    createFolderIsNotExist(UPLOAD_DIR);
    createFolderIsNotExist(IMG_DIR);
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
}).catch(err => {
  console.log(`Server not running. Error message: ${err.message}`);
});