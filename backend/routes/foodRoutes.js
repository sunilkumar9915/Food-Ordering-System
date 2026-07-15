const express = require("express");
console.log("🔥 FOOD ROUTES LOADED");

const router = express.Router();
const upload = require("../middleware/upload");

const {
    addFood,
    getAllFoods,
    getRelatedFoods,
    getTopRatedFoods,
    getDashboard,
    updateFood,
    deleteFood
} = require("../controllers/foodController");

// ==========================
// ADD FOOD
// ==========================
router.post("/", upload.single("image"), addFood);

// ==========================
// ADMIN DASHBOARD
// ==========================
router.get("/dashboard", getDashboard);

// ==========================
// GET ALL FOODS
// ==========================
router.get("/", getAllFoods);

// ==========================
// TOP RATED FOODS
// ==========================
router.get("/top-rated", getTopRatedFoods);

// ==========================
// RELATED FOODS
// ==========================
router.get("/related/:id", getRelatedFoods);

// ==========================
// UPDATE FOOD
// ==========================
router.put("/:id", upload.single("image"), updateFood);

// ==========================
// DELETE FOOD
// ==========================
router.delete("/:id", deleteFood);

module.exports = router;