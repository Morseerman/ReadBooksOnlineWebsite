const mongoose = require("mongoose");

const BookRequest = mongoose.model(
  "Book Reuqest",
  new mongoose.Schema(
    {
      title: String,
      author: String,
      date: String,
      amount: Number,
      isPaid: Boolean,
      user: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },
    { timestamps: true }
  )
);

module.exports = BookRequest;
