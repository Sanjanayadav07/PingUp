import multer from "multer";
import fs from "fs";
import path from "path";

// Ensure the uploads folder exists
const uploadPath = path.join(process.cwd(), "uploads"); // absolute path
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath); // folder where files will be saved
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // unique file name
  },
});

export const upload = multer({ storage });
