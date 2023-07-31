const Category = require('../modules/category.js');
const cloudinary = require('../utility/cloudinary.js');
const upload = require('../utility/multer.js')

const getAllCategories = async (req, res) => {
  const categories = await Category.find();
  res.send(categories);
};

const getOneCategory = async (req, res) => {
  const category = await Category.findOne({ _id: req.params.id });
  res.send(category);
};

const postOneCategory = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.log("Error uploading file: ", err);
      return res.status(500).json({ error: 'File upload failed' });
    }

    try {
      const { title, description } = req.body;
      const { filename, path } = req.file;

      if (!title || !description || !filename) {
        console.log("Error missing title, description, or image");
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const result = await cloudinary.uploader.upload(path, { 
        folder: 'Categories',
      });

      const newCategory = await Category.create({
        title,
        description,
        image: {
          public_id: result.public_id,
          url: result.secure_url,
        },
      });

      res.status(201).json({ imageUrl: newCategory.image.url });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });
};

const deleteCategory = async (req, res) => {
  const deletedCategory = await Category.deleteOne({ _id: req.params.id });
  res.send({ msg: "Category deleted" });
};

const updateCategory = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.log("Error uploading file: ", err);
      return res.status(500).json({ error: 'File upload failed' });
    }

    try {
      const { title, description } = req.body;

      if (!title || !description) {
        console.log("Error missing title or description");
        return res.status(400).json({ error: 'Missing required fields' });
      }

      let updatedCategoryData = {
        title,
        description,
      };

      // Check if a new image was uploaded
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: 'Categories',
        });

        updatedCategoryData.image = {
          public_id: result.public_id,
          url: result.secure_url,
        };
      }

      // Update the category in the database
      const updatedCategory = await Category.findByIdAndUpdate(
        { _id: req.params.id },
        updatedCategoryData,
        { new: true } // Return the updated category object
      );

      res.status(200).json({ imageUrl: updatedCategory.image.url });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });
};

module.exports = {
  getAllCategories,
  getOneCategory,
  postOneCategory,
  deleteCategory,
  updateCategory,
};