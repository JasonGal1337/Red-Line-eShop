const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());

const userRouter = require("./routers/userRouter");
const adminRouter = require("./routers/adminRouter");
const productRouter = require("./routers/productRouter");
const categoryRouter = require("./routers/categoryRouter");
const reviewRouter = require("./routers/reviewRouter");
const orderRouter = require("./routers/orderRouter");

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

app.listen(4000, () => {
    console.log("server is running on port 4000");
});