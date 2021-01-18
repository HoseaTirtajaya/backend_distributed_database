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
    name_place: {
        type: String,
        required: [true, "Place name is required"]
    },
    isDone: {
        type: Boolean,
        default: false
    },
    types: Array
}, {
    versionKey: false,
    timestamps: {createdAt: "createdAt", updatedAt: "updatedAt"}
});

const Wishlist = mongoose.model("Wishlist", Schema);
module.exports = Wishlist;