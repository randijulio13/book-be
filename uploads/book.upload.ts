import multer from "multer";
import path from "path";
import fs from "fs";

export const UPLOAD_PATH = "/public/img/";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const _dirName = path.resolve();
    const folderName = path.join(_dirName, UPLOAD_PATH);
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName);
    }
    cb(null, folderName);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
});
export const uploadBook = upload.single("image");
