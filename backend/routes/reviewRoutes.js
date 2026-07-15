const express = require("express");

const router = express.Router();

const {

    addReview,

    getReviews

} = require("../controllers/reviewController");


// Add Review
router.post("/", addReview);


// Get Reviews By Food Id
router.get("/:foodId", getReviews);


module.exports = router;