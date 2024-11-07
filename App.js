// server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./config");
const B10Data = require("./models/B10Data");

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Route to receive data from the wristband
app.post("/api/data", async (req, res) => {
  try {
    const { deviceId, dataType, data } = req.body;

    // Create a new data entry
    const newData = new B10Data({
      deviceId,
      dataType,
      data,
    });

    // Save to MongoDB
    await newData.save();
    res.status(201).json({ message: "Data saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving data" });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
