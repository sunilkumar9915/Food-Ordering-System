const Food = require("../models/Food");
const Order = require("../models/Order");
const User = require("../models/User");
const cloudinary = require("../config/cloudinary");
const Review = require("../models/Review");

// ==========================
// Add Food
// ==========================
exports.addFood = async(req, res) => {
    try {
        console.log("========== ADD FOOD ==========");
        console.log("BODY:", req.body);
        console.log("FILE:", req.file);

        const { name, description, price, category } = req.body;

        let image = "";

        if (req.file) {
            console.log("Uploading image to Cloudinary...");

            const result = await new Promise((resolve, reject) => {

                const stream = cloudinary.uploader.upload_stream({ folder: "food-ordering" },
                    (error, result) => {

                        console.log("Cloudinary Error:", error);
                        console.log("Cloudinary Result:", result);

                        if (error) return reject(error);

                        resolve(result);

                    }
                );

                stream.end(req.file.buffer);

            });

            image = result.secure_url;

        }

        const food = await Food.create({
            name,
            description,
            price,
            category,
            image
        });

        res.status(201).json({
            success: true,
            message: "Food Added Successfully",
            food
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// ==========================
// Update Food
// ==========================
exports.updateFood = async(req, res) => {
    try {

        const { id } = req.params;

        const food = await Food.findById(id);

        if (!food) {
            return res.status(404).json({
                success: false,
                message: "Food not found"
            });
        }

        food.name = req.body.name;
        food.description = req.body.description;
        food.price = req.body.price;
        food.category = req.body.category;

        if (req.file) {

            const result = await new Promise((resolve, reject) => {

                const stream = cloudinary.uploader.upload_stream({
                        folder: "food-ordering"
                    },
                    (error, result) => {

                        if (error) return reject(error);

                        resolve(result);

                    }
                );

                stream.end(req.file.buffer);

            });

            food.image = result.secure_url;
        }

        await food.save();

        res.status(200).json({
            success: true,
            message: "Food updated successfully",
            food
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};
// ==========================
//Get All Foods 
// ==========================
// ==========================
// Get All Foods
// ==========================
exports.getAllFoods = async(req, res) => {

    console.log("🔥 GET ALL FOODS CALLED");

    try {

        const foods = await Food.find();

        console.log("Foods Found:", foods);

        res.status(200).json({
            success: true,
            count: foods.length,
            foods,
        });

    } catch (error) {

        console.log("❌ GET ALL FOODS ERROR:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};
// ==========================
// Delete Food
// ==========================
exports.deleteFood = async(req, res) => {
    try {

        const { id } = req.params;

        const food = await Food.findById(id);

        if (!food) {
            return res.status(404).json({
                success: false,
                message: "Food not found",
            });
        }

        await Food.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Food deleted successfully",
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
}; // ==========================
// ADMIN DASHBOARD
// ==========================

exports.getDashboard = async(req, res) => {

    try {

        const totalFoods = await Food.countDocuments();

        const totalOrders = await Order.countDocuments();

        const totalUsers = await User.countDocuments();

        const orders = await Order.find();

        let revenue = 0;

        orders.forEach(order => {
            revenue += order.totalAmount;
        });

        res.status(200).json({

            success: true,

            totalFoods,

            totalOrders,

            totalUsers,

            revenue

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

}; // ==========================
// RELATED FOODS
// ==========================

exports.getRelatedFoods = async(req, res) => {

    try {

        const food = await Food.findById(req.params.id);

        if (!food) {

            return res.status(404).json({
                success: false,
                message: "Food Not Found"
            });

        }

        const foods = await Food.find({

            category: food.category,

            _id: { $ne: food._id }

        }).limit(4);

        res.status(200).json({

            success: true,

            foods

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
// ==========================
// TOP RATED FOODS
// ==========================


exports.getTopRatedFoods = async(req, res) => {

    try {

        const foods = await Food.find();

        let result = [];

        for (let food of foods) {

            const reviews = await Review.find({ foodId: food._id });

            let avg = 0;

            if (reviews.length > 0) {

                let total = 0;

                reviews.forEach(r => total += r.rating);

                avg = total / reviews.length;

            }

            result.push({

                ...food._doc,

                averageRating: avg.toFixed(1),

                totalReviews: reviews.length

            });

        }

        result.sort((a, b) => b.averageRating - a.averageRating);

        res.status(200).json({

            success: true,

            foods: result.slice(0, 6)

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};