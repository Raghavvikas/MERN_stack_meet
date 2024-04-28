const mongoose = require("mongoose");
const slugify = require("../slugify.js");
const slugSchema = mongoose.Schema({
  title: String,
  body: String,

  slugify: { type: String, slugify: "title" },
});

slugSchema.set("timestamps", true);
module.exports = mongoose.model("slug", slugSchema);
