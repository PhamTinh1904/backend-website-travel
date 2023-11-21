const express = require("express");
const TourController = require("../../controllers/tourController");
const router = express.Router();

const {verifyAdmin, verifyUser} = require("../../utils/verifyToken")

router.post("/tour/create", verifyAdmin, TourController.create);
router.put("/tour/update", verifyAdmin, TourController.update);
router.delete("/tour/delete", verifyAdmin, TourController.delete);
router.get("/tours", TourController.index);
router.get("/tour/:id", TourController.tourDetails);
router.get("/tours/search/getTourBySearch", TourController.toursBySearch);
router.get("/tours/search/getFeaturedTours", TourController.getFeaturedTours);
router.get("/tours/search/getToursCount", TourController.getToursCount);
router.get("/tours/trips", verifyUser,TourController.getToursByUser);


module.exports = router;
