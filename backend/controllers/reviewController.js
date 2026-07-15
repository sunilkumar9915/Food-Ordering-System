const Review = require("../models/Review");

// =========================
// ADD REVIEW
// =========================

exports.addReview = async(req, res) => {

    try {

        const { foodId, userName, rating, review } = req.body;

        const newReview = await Review.create({

            foodId,
            userName,
            rating,
            review

        });

        res.status(201).json({

            success: true,
            message: "Review Added Successfully",
            review: newReview

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};


// =========================
// GET REVIEWS OF ONE FOOD
// =========================

exports.getReviews = async(req, res) => {

    try {

        const reviews = await Review.find({

            foodId: req.params.foodId

        }).sort({ createdAt: -1 });

        let total = 0;

        reviews.forEach(item => {
            total += item.rating;
        });

        const averageRating =
            reviews.length > 0 ? (total / reviews.length).toFixed(1) : 0;

        res.status(200).json({

            success: true,

            reviews,

            totalReviews: reviews.length,

            averageRating

        });
    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};