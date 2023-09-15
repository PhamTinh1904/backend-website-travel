"use strict";

const { Schema, model, ObjectId } = require("mongoose"); // Erase if already required

const DOCUMENT_NAME = "User";

// Declare the Schema of the Mongo model
var userSchema = new Schema(
  {
    firstName: {
      type: String,
     
    },
    lastName: {
      type: String,
     
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    
    },
    phoneNumber: {
      type: Number,
    },
    photo: {
      type: String,
    },
    role: {
      type: String,
      default: 'user'
    }
  },
  {
    collation: { locale: "en_US" },
    timestamps: true,
  }
);

//Export the model
module.exports = model(DOCUMENT_NAME, userSchema);
