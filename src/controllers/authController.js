const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model")
const AuthServices = require("../services/auth.services");
const bcrypt = require('bcrypt')
require('dotenv').config();

class AuthController {
  static register = async (req, res, next) => {
    try {
      const {email, userName, password} = req.body;

      const result = await AuthServices.Register(email, userName, password);

      if (!result.success) {
        res.status(404).json(result);
      }

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  static Login = async (req, res, next) => {
    try {
      let email = req.body.email;

    const user = await userModel.findOne({ email });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const checkCorrectPassword = bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!checkCorrectPassword) {
      res.status(401).json({
        success: false,
        message: "Incorrect password or email",
      });
    }

    const { password, role, ...rest } = user._doc;

    // create jwt token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15d" }
    );

    res.cookie('accessToken', token, {
      httpOnly: true,
      expires: token.expiresIn
    }).status(200).json({
      success: true,
      message: "Login successful",
      token,
      data: {...rest},
      role,
    })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Login failed",
        error: error.message
      })
    }
    
  };
}

module.exports = AuthController;
