const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    consumer: { type: Schema.Types.ObjectId, ref: "user", required: true }, // Reference to User model
    provider: { type: Schema.Types.ObjectId, ref: "user", required: true }, // Reference to User model
    description: { type: String, trim: true, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 } // Ensures rating is between 1 and 5
}, { timestamps: true });

module.exports = mongoose.model("review", reviewSchema, "reviews");