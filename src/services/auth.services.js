const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");

class AuthService {
  static Register = async (email, userName, password) => {
    const user = await userModel.findOne({ email }).lean();

    if (user) {
      return {
        success: false,
        message: "User already exists",
      };
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await console.log(passwordHash);

    const newUser = await userModel.create({
      password: passwordHash,
      email,
      userName,
    });

    try {
      if (!newUser) {
        return {
          success: false,
          message: "User created failed",
        };
      } else {
        const savedUser = await newUser.save();
        return {
          success: true,
          message: "Successfully created",
          data: savedUser,
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
}

module.exports = AuthService;
