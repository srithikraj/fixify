const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceProviderSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: "user", required: true }, // Reference to User model
    status: { type: String, enum: ["pending", "verified"], required: true },
    services: [{ type: Schema.Types.ObjectId, ref: "service" }], // References to Service model
    availability: {
        monday: { type: [String], default: [] },   // Example: ["09:00-13:00", "15:00-20:00"]
        tuesday: { type: [String], default: [] },
        wednesday: { type: [String], default: [] },
        thursday: { type: [String], default: [] },
        friday: { type: [String], default: [] },
        saturday: { type: [String], default: [] },
        sunday: { type: [String], default: [] }
    },
    ratings: { type: Number, min: 0, max: 5, default: 0 }, // Ratings between 0 and 5
    reviews_count: { type: Number, default: 0 } // Default is 0
}, { timestamps: true });

module.exports = mongoose.model("serviceProvider", serviceProviderSchema, "serviceProviders");
