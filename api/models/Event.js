const mongoose = require("mongoose");
const User = require("./User");

const EventSchema = new mongoose.Schema(
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
    location: {
      type: String,
      required: true,
    },
    max_particip: { 
      type: Number,
      required: false,
      default: 5
    },
    tags: {
      type: Array,
      default:[]
    }, 
    group: {
      type: Array,
      default: [],
    },
 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", EventSchema);
