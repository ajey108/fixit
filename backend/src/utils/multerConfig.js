import multer from "multer";
import path from "path";

// Storage in memory or disk
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = file.originalname.split(".")[0];
    cb(null, `${name}-${Date.now()}${ext}`);
  },
});

console.log("storage is", storage);
//filter file type
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  if (allowedTypes.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Only images are allowed"));
};

const upload = multer({ storage, fileFilter });

export default upload;
