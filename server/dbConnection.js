require("env2")(".env");
const mongoose = require("mongoose");
const { Landmarks } = require("./models/LandmarksSchema.js");
const { Users } = require("./models/UsersSchema.js");

// Connecting to database
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true });

module.exports = {
  Landmarks,
  Users,
};
