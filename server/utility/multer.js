const multer = require('multer');
const cloudinary = require('../utility/cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Categories', 
  },
});

// This file exports the upload middleware, which you can use in your routes to process and upload image files
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB
  },
}).single('selectedImage');

module.exports = upload;