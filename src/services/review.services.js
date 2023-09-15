const reviewModel = require("../models/review.model");
const tourModel = require("../models/tour.model");

class ReviewServieces {
  static createReview = async (data, tourId) => {
    try {
      const newReview = await reviewModel.create({ ...data });
      if (!newReview) {
        return {
          success: false,
          message: "Review saved failed",
        };
      }

      const saveReview = await newReview.save();
      await tourModel.findByIdAndUpdate(tourId, {
        $push: { reviews: saveReview._id },
      });

      return {
        success: true,
        message: "Reviews saved successfully",
        data: saveReview
      };  
    } catch (error) {
      return {
        success: false,
        message: "Failed to save review",
        err: error.message,
      };
    }
  };
}

module.exports = ReviewServieces;
