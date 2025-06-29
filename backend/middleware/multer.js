import multer from "multer";

// Set up storage engine
const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

// Create multer instance with the defined storage
const upload = multer({ storage });

// Export it as default
export default upload;
