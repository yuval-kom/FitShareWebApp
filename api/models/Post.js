const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    likes: {
      type: Array,
      default: [],
    },
    tag: {
      type: String,
      default: "",
    },
    lan: {
      type: Number,
      default: true,
    },
    lat: {
      type: Number,
      default: true,
    },
    participents: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
