const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    place_id: {
        type: String,
        required: [true, "Place ID must be filled"]
    }, 
    review: {
        type: String,
        default: "",
    },
    rate: {
        type: Number,
        default: 0,
    }
}, {
    versionKey: false,
    timestamps: {createdAt: "createdAt", updatedAt: "updatedAt"}
});

let Review = mongoose.model("Review", Schema);
module.exports = Review;