"use strict";

const { Schema, model } = require("mongoose"); // Erase if already required

const DOCUMENT_NAME = "Booking";

// Declare the Schema of the Mongo model
var bookingSchema = new Schema(
  {
    userId: {
      type: String,
    },
    userEmail: {
      type: String,
      required: true,
    },
    tourName: {
      type: String,
      required: true,
    },
    tourId: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    guestSize: {
      type: Number,
      required: true,
    },
    guestChild: {
      type: Number,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    bookAt: {
      type: Date,
      required: true,
    },
    pay1: {
      type: Boolean,
      default: false,
    },
    pay2: {
      type: Boolean,
      default: false,
    },
  },
  {
    collation: { locale: "vi" },
    timestamps: true,
  }
);

//Export the model
module.exports = model(DOCUMENT_NAME, bookingSchema);
