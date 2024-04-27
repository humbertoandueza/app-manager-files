const multer = require('multer');
const path = require('path');
const fs = require('fs');

const basePublic = 'public/uploads';

const uploadDir = path.join(__dirname, `../../${basePublic}`);

const storage = multer.diskStorage({
  destination(req, file, cb) {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    if (!fs.existsSync(uploadDir)) {
      // eslint-disable-next-line security/detect-non-literal-fs-filename
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  async filename(req, file, cb) {
    const filename = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`;
    const filePath = `${uploadDir}/${filename}`;

    req.body.file = `${basePublic}/${filename}`;
    req.body.fileMimetype = file.mimetype;
    req.body.filePath = filePath;
    cb(null, filename);
  },
});

const upload = multer({ storage });

module.exports = upload;
