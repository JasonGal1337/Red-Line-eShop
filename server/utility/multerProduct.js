const multer = require('multer');
const cloudinary = require('../utility/cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Products', 
  },
});

const uploadProductImages = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB
  },
}).array('productImages', 10); // 10 = max upload image number size

module.exports = uploadProductImages;