const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Parent = require("./parentModel.js");

const userSchema = mongoose.Schema({
  parent_name: {
    type: String,
    required: true,
  },
  pet_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    default: "",
  },
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// will encrypt password everyTime its saved
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

// User.create({
//   parent_name: {
//     name: "Alex Merced",
//     DoB: "09/04/1992",
//     address: "abc, City, State, Country",
//   },
//   pet_name: "Fury",
//   email: "test@abc.com",
//   phone: "7777777777",
//   password: "Test@123",
// });

module.exports = User;
