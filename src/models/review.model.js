"use strict";

const { Schema, model, ObjectId } = require("mongoose"); // Erase if already required

const DOCUMENT_NAME = "Review";

// Declare the Schema of the Mongo model
var reviewSchema = new Schema(
  {
    userNameReview: {
      type: String,
      required: true,
    },
    reviewText: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
  },
  {
    collation: { locale: "en_US" },
    timestamps: true,
  }
);

//Export the model
module.exports = model(DOCUMENT_NAME, reviewSchema);
