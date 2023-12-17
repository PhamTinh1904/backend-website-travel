const express = require("express");
const BookingController = require("../../controllers/bookingController");
const router = express.Router();
const { verifyAdmin, verifyUser } = require("../../utils/verifyToken");

router.post("/booking/", verifyUser, BookingController.bookingTour);
router.get("/booking/:id", verifyUser, BookingController.getBooking);
router.get("/booking", verifyAdmin, BookingController.getAllBooking);
router.post("/booking/delete/:id", verifyUser, BookingController.deleteTrip)

module.exports = router;
