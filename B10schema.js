// models/B10Data.js
const mongoose = require("mongoose");

const B10DataSchema = new mongoose.Schema({
  deviceId: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  dataType: { type: String }, // e.g., 'buttonPress', 'acceleration'
  data: {
    x: Number,
    y: Number,
    z: Number,
    buttonState: String,
  },
});

module.exports = mongoose.model("B10Data", B10DataSchema);
