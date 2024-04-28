const mongoose = require("mongoose");

const profileSchema = mongoose.Schema(
  {
    profile_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      default: "Gender",
    },
    DoB: {
      type: Date,
      required: true,
      default: Date.now,
    },
    address: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      data: Buffer,
      required: true,
      default:
        "https://w7.pngwing.com/pngs/419/473/png-transparent-computer-icons-user-profile-login-user-heroes-sphere-black-thumbnail.png",
    },
  },
  {
    timestamps: true,
  }
);

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
