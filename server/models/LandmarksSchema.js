const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

//const Schema = ;

const LandmarksSchema = new mongoose.Schema({
        title: { type: String, required: true },
        imageUrlSet: [{ type: String }],
        description: { type: String },
<<<<<<< HEAD
        comments: [{ userId: Number, userName: String, userEmail: String, commentBody: String, createdAt: Date },
            {
                timestamps: {
                    createdAt: Date
                }
            }
=======
        comments: [{ userId: Number, userName: String, userEmail: String, commentBody: String },
            { timestamps: true }
>>>>>>> 4da1c905c25b5c7e542b822035032963f0c8eba1
        ], //comments inside this array
    }, { timestamps: true } //add timestamp for the whole landmark entry
);

LandmarksSchema.plugin(mongoosePaginate);

const Landmarks = mongoose.model("landmarks", LandmarksSchema);

//Landmarks.paginate().then({result}); // Usage


module.exports = {
    Landmarks,
};