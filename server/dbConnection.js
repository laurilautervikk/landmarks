const mongoose = require("mongoose");

// Connecting to database
mongoose.connect(
    "mongodb+srv://hapukapsas:hapukapsas@cluster1.ckjul.mongodb.net/landmarksapp?retryWrites=true&w=majority", { useNewUrlParser: true }
);
const Schema = mongoose.Schema;

const LandmarkSchema = new Schema({
    id: { type: Number },
    title: { type: String },
    imageUrlSet: [{ type: String }],
    description: { type: String },
});

const Landmarks = mongoose.model("landmarks", LandmarkSchema);

module.exports = {
    Landmarks,
};