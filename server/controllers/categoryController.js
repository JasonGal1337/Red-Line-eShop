const Category = require('../modules/category.js');

const getAllCategories = async (req,res) => {
    const categories = await Category.find();
    res.send(categories);
};

const getOneCategory = async (req,res) => {
    const category = await Category.findOne({ _id: req.params.id });
    res.send(category);
};

const postOneCategory = async (req,res) => {
    const newCategory = await Category.create(req.body);
    res.send({ msg: "category logged successfully" });
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