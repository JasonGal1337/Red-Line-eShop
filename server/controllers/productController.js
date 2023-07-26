const Product = require('../modules/product.js');

const getAllProducts = async (req,res) => {
    const products = await Product.find();
    res.send(products);
};

const getOneProduct = async (req,res) => {
    const product = await Product.findOne({ _id: req.params.id });
    res.send(product);
};

const postOneProduct = async (req,res) => {
    const newProduct = await Product.create(req.body);
    res.send({ msg: "product logged successfully" });
};

const deleteProduct = async (req,res) => {
    const deletedProduct = await Product.deleteOne({ _id: req.params.id });
    res.send({ msg: "product deleted" });
};

const updateProduct = async (req,res) => {
    const updatedProduct = await Product.findByIdAndUpdate({ _id: req.params.id }, req.body);
    res.send({ msg: "product updated "});
};

const getAllUserProducts = async (req,res) => {
    const userProducts = await Product.find({ userId: req.params.userId });
    res.send(userProducts);
};

module.exports = {
    getAllProducts,
    getOneProduct,
    postOneProduct,
    deleteProduct,
    updateProduct,
    getAllUserProducts
}