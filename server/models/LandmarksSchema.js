const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

//const Schema = ;

const LandmarksSchema = new mongoose.Schema({
        title: { type: String, required: true },
        imageUrlSet: [{ type: String }],
        description: { type: String },
        comments: [{ userId: Number, userName: String, commentId: Number, commentBody: String },
            { timestamps: true }
        ], //comments inside this array
    }, { timestamps: true } //add timestamp for the whole landmark entry
);

LandmarksSchema.plugin(mongoosePaginate);

const Landmarks = mongoose.model("landmarks", LandmarksSchema);

//Landmarks.paginate().then({result}); // Usage


module.exports = {
    Landmarks,
};