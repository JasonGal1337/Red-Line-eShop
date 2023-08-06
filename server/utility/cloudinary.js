const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// bulk delete categories or products folder on cloudinary to wipe all images

// function deleteImagesInFolder(folderName) {
//     const prefix = folderName + '/'; 
  
//     cloudinary.api.delete_resources_by_prefix(prefix, function(result) {
//       console.log(result);
//       // Handle the result here (e.g., check for errors or display success message)
//     });
//   }
  
//   // Call the function and pass the folder name from which you want to delete the images
//   deleteImagesInFolder('Products');

module.exports = cloudinary;