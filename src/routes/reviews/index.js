const express = require("express");
const ReviewController = require("../../controllers/reviewController");
const router = express.Router();




router.post("/review/:tourId", ReviewController.create);


module.exports = router;
