const Product = require('../modules/product.js');
const cloudinary = require('../utility/cloudinary.js');
const uploadProductImages = require('../utility/multerProduct.js');

const getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.send(products);
};

const getOneProduct = async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });
  res.send(product);
};

const postOneProduct = async (req, res) => {
  uploadProductImages(req, res, async (err) => {
    if (err) {
      console.log('Error uploading files: ', err);
      return res.status(500).json({ error: 'File upload failed' });
    }

    try {
      const { title, description, price, technicalInformation, stockQuantity, categories } = req.body;
      const images = req.files;

      if (!title || !description || !price || !technicalInformation || !stockQuantity || !categories || images.length === 0) {
        console.log('Error missing required fields or images');
        return res.status(400).json({ error: 'Missing required fields or images' });
      }

      const uploadPromises = images.map((image) => cloudinary.uploader.upload(image.path, { folder: 'Products' }));
      const uploadedImages = await Promise.all(uploadPromises);

      const imageObjects = uploadedImages.map((result) => ({
        public_id: result.public_id,
        url: result.secure_url,
      }));

      const newProduct = await Product.create({
        title,
        description,
        price,
        technicalInformation,
        stockQuantity,
        categories,
        images: imageObjects,
      });

      res.status(201).json({ msg: 'Product created successfully', product: newProduct });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });
};

const deleteProduct = async (req, res) => {
  const deletedProduct = await Product.deleteOne({ _id: req.params.id });
  res.send({ msg: 'Product deleted' });
};

const updateProduct = async (req, res) => {
  uploadProductImages(req, res, async (err) => {
    if (err) {
      console.log('Error uploading files: ', err);
      return res.status(500).json({ error: 'File upload failed' });
    }

    try {
      const { title, description, price, technicalInformation, stockQuantity, categories } = req.body;
      const images = req.files;

      if (!title || !description || !price || !technicalInformation || !stockQuantity || !categories) {
        console.log('Error missing required fields');
        return res.status(400).json({ error: 'Missing required fields' });
      }

      let updatedProductData = {
        title,
        description,
        price,
        technicalInformation,
        stockQuantity,
        categories,
      };

      // Check if new images were uploaded
      if (images.length > 0) {
        const uploadPromises = images.map((image) => cloudinary.uploader.upload(image.path, { folder: 'Products' }));
        const uploadedImages = await Promise.all(uploadPromises);

        const imageObjects = uploadedImages.map((result) => ({
          public_id: result.public_id,
          url: result.secure_url,
        }));

        updatedProductData.images = imageObjects;
      }

      // Update the product in the database
      const updatedProduct = await Product.findByIdAndUpdate(
        { _id: req.params.id },
        updatedProductData,
        { new: true } // Return the updated product object
      );

      res.status(200).json({ msg: 'Product updated successfully', product: updatedProduct });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });
};

const getAllUserProducts = async (req, res) => {
  const userProducts = await Product.find({ userId: req.params.userId });
  res.send(userProducts);
};

module.exports = {
  getAllProducts,
  getOneProduct,
  postOneProduct,
  deleteProduct,
  updateProduct,
  getAllUserProducts,
};