const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    type: { type: String, enum: ["plumbing", "electrician", "painting", "contractor"], required: true },
    description: { type: String, trim: true, required: true },
    hourly_rate: { type: Number, required: true, min: 0 }
}, { timestamps: true });

module.exports = mongoose.model("service", serviceSchema, "services");