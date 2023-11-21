"use strict";
const mongoose = require("mongoose");
const { Schema, model } = require("mongoose"); // Erase if already required

const DOCUMENT_NAME = "Tour";

// Declare the Schema of the Mongo model
var tourSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    startGate: {
      type: String,
      required: true,
    },  
    day: {
      type: Number,
      required: true,
    },
    night: {
      type: Number,
      required: true,
    },
    departureDay: {
      type: Date,
      required: true,
    },
    distance: {
      type: Number,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    lichtrinh: [
      {
        day: {
          type: Number,
        },
        chitiet: {
          type: String,
        }
      }
    ],
    price: {
      type: Number,
      required: true,
    },
    maxGroupSize: {
      type: Number,
      required: true,
    },
    reviews: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Review",
      },
    ],
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    collation: { locale: "en_US" },
    timestamps: true,
  }
);

//Export the model
module.exports = model(DOCUMENT_NAME, tourSchema);
