const Category = require('../modules/category.js');
const cloudinary = require('../utility/cloudinary.js')

const getAllCategories = async (req,res) => {
    const categories = await Category.find();
    res.send(categories);
};

const getOneCategory = async (req,res) => {
    const category = await Category.findOne({ _id: req.params.id });
    res.send(category);
};

const postOneCategory = async (req, res) => {
  const { title, description } = req.body;
  const image = req.file; // This will contain the image file data

  if (!title || !description || !image) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const result = await cloudinary.uploader.upload(image.path, {
      folder: 'categories',
      // can add width and crop scale here
    });

    const newCategory = await Category.create({
      title,
      description,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });

    res.status(201).json({ msg: 'Category logged successfully', category: newCategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteCategory = async (req,res) => {
    const deletedCategory = await Category.deleteOne({ _id: req.params.id });
    res.send({ msg: "category deleted" });
};

const updateCategory = async (req,res) => {
    const updatedCategory = await Category.findByIdAndUpdate({ _id: req.params.id }, req.body);
    res.send({ msg: "category updated "});
};

module.exports = {
    getAllCategories,
    getOneCategory,
    postOneCategory,
    deleteCategory,
    updateCategory,
}