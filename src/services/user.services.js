const userModel = require("../models/user.model")

class UserServices {

  static getAllUsers = async (page) => {
    try {
      let Users = await userModel
        .find({})
        .skip(page * 8)
        .limit(8);

      if (!Users) {
        return {
          success: false,
          message: "Not found",
        };
      }
      return {
        success: true,
        count: Users.length,
        message: "Successful",
        data: Users,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error: " + error.message,
      };
    }
  };


  static getUserById = async (id) => {
    try {
      let User = await userModel.findById(id);

      if (!User) {
        return {
          success: false,
          message: "User not found",
        };
      }

      return {
        success: true,
        message: "Successfully",
        data: User,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error retrieving User",
      };
    }
  };

  static updateUser = async (data, id) => {
    try {
      let User = await userModel.findById(id);

      if (!User) {
        return {
          success: false,
          message: "User not found",
        };
      }

      await console.log("asdad");

      User.title = data.title;
      User.city = data.city;
      User.address = data.address;
      User.distance = data.distance;
      User.photo = data.photo;
      User.desc = data.desc;
      User.price = data.price;
      User.maxGroupSize = data.maxGroupSize;
      User.featured = data.featured;

      await User.save();

      return { success: true, message: "Updated User successfully" };
    } catch (error) {
      console.error(error);
    }
  };

  static deleteUserById = async (id) => {
    let deleteUser = await userModel.findByIdAndDelete(id);

    if (deleteUser) {
      return {
        success: true,
        message: "User deleted successfully",
      };
    }

    return { success: false, message: "User not found" };
  };

  
  static getUsersCount = async () => {
    try {
      const UserCount = await userModel.estimatedDocumentCount();

      if (!UserCount) {
        return {
          success: false,
          message: "Failed to fetch",
        };
      }

      return { success: true, data: UserCount };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  
}

module.exports = UserServices;
