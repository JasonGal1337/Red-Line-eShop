const Order = require('../modules/order.js');

const getAllOrders = async (req,res) => {
    const orders = await Order.find();
    res.send(orders);
};

const getOneOrder = async (req,res) => {
    const order = await Order.findOne({ _id: req.params.id });
    res.send(order);
};

const postOneOrder = async (req,res) => {
    const newOrder = await Order.create(req.body);
    res.send({ msg: "order logged successfully" });
};

const deleteOrder = async (req,res) => {
    const deletedOrder = await Order.deleteOne({ _id: req.params.id });
    res.send({ msg: "order deleted" });
};

const updateOrder = async (req,res) => {
    const updatedOrder = await Order.findByIdAndUpdate({ _id: req.params.id }, req.body);
    res.send({ msg: "order updated "});
};

const getAllUserOrders = async (req,res) => {
    const userOrders = await Order.find({ userId: req.params.userId });
    res.send(userOrders);
};

module.exports = {
    getAllOrders,
    getOneOrder,
    postOneOrder,
    deleteOrder,
    updateOrder,
    getAllUserOrders
}