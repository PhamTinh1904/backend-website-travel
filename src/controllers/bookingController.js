const tourModel = require("../models/tour.model");
const TourServices = require("../services/tour.services");

class BookingController {
  static bookingTour = async (req, res, next) => {
    try {
      const result = await TourServices.bookingTour(req.body);
      if (!result.success) {
        return res.status(404).json(result);
      }

      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error,
      });
    }
  };

  static getBooking = async (req, res, next) => {
    const id = req.params.id;
    const result = await tourModel.getBookingById(id);
    try {
      if (!result.success) {
        return res.status(404).json({ result });
      }

      return res.status(200).json({ result });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Not found", error: error });
    }
  };

  static getAllBooking = async (req, res, next) => {
    const result = await tourModel.getAllBooking();
    try {
      if (!result.success) {
        return res.status(404).json({ result });
      }

      return res.status(200).json({ result });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Not found", error: error });
    }
  };

  static deleteTrip = async (req, res, next) => {
    let id = req.params.id;

    const resutl = await TourServices.deleteTrip(id);
    try {
      if (!resutl.success) {
        return res.status(404).json({ resutl });
      }

      return res.status(200).json({ resutl });
    } catch (err) {
      return res
        .status(500)
        .json({
          success: false,
          message: "Internal server error",
          error: error,
        });
    }
  };
}

module.exports = BookingController;
