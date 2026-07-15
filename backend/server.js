console.log("🔥 SERVER FILE LOADED");
require("dotenv").config();

const mongoose = require("mongoose");
const app = require("./app");

const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅ MongoDB Connected");

        app.listen(PORT, () => {
            console.log(`🚀 Server Running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.log("❌ MongoDB Connection Error");
        console.log(err.message);
    });