import mongoose from "mongoose";

const messageScheme = new mongoose.Schema(
  {
    converId: {
      type: String,
      required: true,
    },
    sender: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const message=mongoose.model('message',messageScheme)

export default message;