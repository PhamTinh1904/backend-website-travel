const UserServices = require("../services/user.services");
const AuthServices = require("../services/auth.services");

class UserController {
  create = async (req, res, next) => {
    try {
      let result = await AuthServices.Register(req.body);

      if (!result.success) {
        return res.status(404).json(result);
      }

      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Create User failed",
        error: error.message,
      });
    }
  };

  index = async (req, res) => {
    let page = req.query.page;

    try {
      let result = await UserServices.getAllUsers(page);
      res.status(200).json({ result });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  getFeaturedUsers = async (req, res) => {
    try {
      let result = await UserServices.getFeaturedUsers()

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

  update = async (req, res) => {
    try {
      let id = req.query.id;
      res.status(200).json(await UserServices.updateUser(req.body, id));
    } catch (error) {}
  };

  delete = async (req, res) => {
    try {
      let id = req.query.id;
      res.status(200).json(await UserServices.deleteUserById(id));
    } catch (err) {}
  };

  UserDetails = async (req, res) => {
    let id = req.query.id;
    try {
      const result = await UserServices.getUserById(id);

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

  UsersBySearch = async (req, res) => {
    try {
      let city = req.query.city;
      let distance = parseInt(req.query.distance);
      let maxGroupSize = parseInt(req.query.maxGroupSize);

      let result = await UserServices.getUserBySearch(
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

  getUsersCount = async (req, res) => {
    try {
      const result = await UserServices.getUsersCount()
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

module.exports = new UserController();
