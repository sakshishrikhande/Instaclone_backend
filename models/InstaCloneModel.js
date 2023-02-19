const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageSchema = new mongoose.Schema({
  name: String,
  image: { data: Buffer, contentType: String },
  someotherprop: String,
});

module.exports = mongoose.model("InstaClone", imageSchema);