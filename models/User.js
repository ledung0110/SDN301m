import mongoose, { ObjectId, Schema } from "mongoose";
import isEmail from "validator/lib/isEmail.js";

export const User = mongoose.model(
  "User",
  new Schema({
    id: { type: ObjectId },
    //model validation
    "name": {
      type: String,
      require: true,
      validate: {
        validator: (value) => value.length > 3,
        message: "Length of name > 3"
      }
    },
    "email": {
      type: String,
      require: true,
      validate: {
        validator: (value) => isEmail,
        message: "Incorrect format"
      }
    },
    "password": {
      type: String,
      require: true,
      validate: {
        validator: (value) => value.length > 8,
        message: "Length of name > 3"
      }
    },
    "phoneNumber": {
      type: String,
      reuqire: true,
    },
    "address": {
      type: String,
      require: false,
    },
  })
);