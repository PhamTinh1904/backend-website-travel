const bookingModel = require("../models/booking.model");
const tourModel = require("../models/tour.model");

class TourServices {
  static createTour = async (data) => {
    const newTour = await tourModel.create(data);

    try {
      if (!newTour) {
        return {
          success: false,
          message: "Tour created failed",
        };
      } else {
        const savedTour = await newTour.save();
        return {
          success: true,
          message: "Successfully created",
          data: savedTour,
        };
      }
    } catch (error) {
      return {
        success: true,
        message: "Failed to created",
        error: error.message,
      };
    }
  };

  static getAllTours = async (page) => {
    try {
      let tours = await tourModel
        .find({})
        .populate("reviews")
        .skip(page * 8)
        .limit(8);

      if (!tours) {
        return {
          success: false,
          message: "Not found",
        };
      }
      return {
        success: true,
        count: tours.length,
        message: "Successful",
        data: tours,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error: " + error.message,
      };
    }
  };

  static getToursByCategory = async (category, page) => {
    try {
      let tours = await tourModel
        .find({ "category.url": category })
        .populate("reviews")
        .skip(page * 8)
        .limit(8);

      if (!tours) {
        return {
          success: false,
          message: "Not found",
        };
      }
      return {
        success: true,
        count: tours.length,
        message: "Successful",
        data: tours,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error: " + error.message,
      };
    }
  };

  static getTripsByUser = async (userEmail) => {
    try {
      let trips;
      userEmail === "all"
        ? (trips = await bookingModel.find({}))
        : (trips = await bookingModel.find({ userEmail }));
      await console.log(trips);
      if (!trips) {
        return {
          success: false,
          message: "Not found",
        };
      }
      return {
        success: true,
        count: trips.length,
        message: "Successful",
        data: trips,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error: " + error.message,
      };
    }
  };

  static getFeaturedTours = async () => {
    try {
      let tours = await tourModel
        .find({ featured: true })
        .populate("reviews")
        .limit(8);

      if (!tours) {
        return {
          success: false,
          message: "Not found",
        };
      }
      return {
        success: true,
        count: tours.length,
        message: "Successful",
        data: tours,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error: " + error.message,
      };
    }
  };
  static getTourById = async (id) => {
    try {
      let tour = await tourModel.findById(id).populate("reviews");

      if (!tour) {
        return {
          success: false,
          message: "Tour not found",
        };
      }

      return {
        success: true,
        message: "Successfully",
        data: tour,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error retrieving tour",
      };
    }
  };

  static updateTour = async (data, id) => {
    try {
      let tour = await tourModel.findById(id);

      if (!tour) {
        return {
          success: false,
          message: "Tour not found",
        };
      }

      await console.log("asdad");

      tour.title = data.title;
      tour.city = data.city;
      tour.address = data.address;
      tour.distance = data.distance;
      tour.photo = data.photo;
      tour.desc = data.desc;
      tour.price = data.price;
      tour.maxGroupSize = data.maxGroupSize;
      tour.featured = data.featured;

      await tour.save();

      return { success: true, message: "Updated tour successfully" };
    } catch (error) {
      console.error(error);
    }
  };

  static deleteTourById = async (id) => {
    let deleteTour = await tourModel.findByIdAndDelete(id);

    if (deleteTour) {
      return {
        success: true,
        message: "Tour deleted successfully",
      };
    }

    return { success: false, message: "Tour not found" };
  };

  static getTourBySearch = async (city, distance, maxGroupSize) => {
    try {
      const cityRegex = new RegExp(city, "i");
      const tours = await tourModel
        .find({
          city: cityRegex,
          distance: { $gte: distance },
          maxGroupSize: { $gte: maxGroupSize },
        })
        .populate("reviews");

      if (tours.length === 0) {
        return {
          success: false,
          message: "Tour not foundd",
        };
      } else {
        return {
          success: true,
          message: "Successfully",
          data: tours,
        };
      }
    } catch (error) {
      return { success: false, message: "Not Found" };
    }
  };

  static getToursCount = async () => {
    try {
      const tourCount = await tourModel.estimatedDocumentCount();

      if (!tourCount) {
        return {
          success: false,
          message: "Failed to fetch",
        };
      }

      return { success: true, data: tourCount };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  static bookingTour = async (data) => {
    const newBooking = await bookingModel.create(data);

    if (!newBooking) {
      return { success: false, message: "Book tour failed" };
    }

    const saveBooking = await newBooking.save();

    return { success: true, message: "Your tour is booked", data: saveBooking };
  };

  static getBookingById = async (id) => {
    const book = await bookingModel.findById(id);

    if (!book) {
      return { success: false, message: "Booking not found" };
    }

    return { success: true, message: "Successfully", data: book };
  };

  static getAllBooking = async () => {
    const book = await bookingModel.find();

    if (!book) {
      return { success: false, message: "Booking not found" };
    }

    return { success: true, message: "Successfully", data: book };
  };
}

module.exports = TourServices;
