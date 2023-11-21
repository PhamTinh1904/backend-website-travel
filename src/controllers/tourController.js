const TourServices = require("../services/tour.services");
// const tourModel = require("../models/tour.model");

class TourController {
  create = async (req, res, next) => {
    try {
      let result = await TourServices.createTour(req.body);

      if (!result.success) {
        return res.status(404).json(result);
      }

      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Create tour failed",
        error: error.message,
      });
    }
  };

  index = async (req, res) => {
    let page = req.query.page;

    try {
      let result = await TourServices.getAllTours(page);
      res.status(200).json({ result });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  getFeaturedTours = async (req, res) => {
    try {
      let result = await TourServices.getFeaturedTours()

      if (result.success) {
        res.status(200).json({ result});
      }

      res.status(404).json({ result});
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }

  getToursByUser = async (req, res) => {
    
    try {
      let userEmail = req.header('userEmail')
      console.log(userEmail);
      let result = await TourServices.getTripsByUser(userEmail);
      res.status(200).json({ result });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  update = async (req, res) => {
    try {
      let id = req.query.id;
      res.status(200).json(await TourServices.updateTour(req.body, id));
    } catch (error) {}
  };

  delete = async (req, res) => {
    try {
      let id = req.query.id;
      res.status(200).json(await TourServices.deleteTourById(id));
    } catch (err) {}
  };

  tourDetails = async (req, res) => {
    let id = req.params.id;
    try {
      const result = await TourServices.getTourById(id);

      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(404).json(result);
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };

  toursBySearch = async (req, res) => {
    try {
      let city = req.query.city;
      let distance = parseInt(req.query.distance);
      let maxGroupSize = parseInt(req.query.maxGroupSize);

      let result = await TourServices.getTourBySearch(
        city,
        distance,
        maxGroupSize
      );

      if (!result.success) {
        return res.status(404).json({ result });
      }

      return res.status(200).json({ result });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };

  getToursCount = async (req, res) => {
    try {
      const result = await TourServices.getToursCount()
      if(!result.success) {
        return res.status(404).json({ result });
      }

      return res.status(200).json({ result });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      })
    }
  }
}

module.exports = new TourController();
