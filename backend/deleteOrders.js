const mongoose = require("mongoose");
require("dotenv").config();

const Order = require("./models/Order");

mongoose.connect(process.env.MONGO_URI)
    .then(async() => {
        const result = await Order.deleteMany({});
        console.log("Deleted Orders:", result.deletedCount);
        process.exit();
    })
    .catch(err => {
        console.log(err);
        process.exit();
    });