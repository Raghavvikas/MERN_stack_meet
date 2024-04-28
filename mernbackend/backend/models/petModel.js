const mongoose = require("mongoose");

const petSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    category: { type: String, required: true },
    breed: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      data: Buffer,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;
