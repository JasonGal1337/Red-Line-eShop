const express = require("express");
const cors = require("cors");
const app = express();

const db = require('./modules/connection.js');

app.use(express.json());

const userRouter = require("./routers/userRouter");
const adminRouter = require("./routers/adminRouter");
const productRouter = require("./routers/productRouter");
const categoryRouter = require("./routers/categoryRouter");
const reviewRouter = require("./routers/reviewRouter");
const orderRouter = require("./routers/orderRouter");
const stripeRouter = require("./utility/stripe");

app.use(
    cors({
        origin: "*",
    })
);

app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/product", productRouter);
app.use("/category", categoryRouter);
app.use("/review", reviewRouter);
app.use("/order", orderRouter);
app.use("/api/stripe", stripeRouter);

app.listen(4000, () => {
    console.log("server is running on port 4000");
});