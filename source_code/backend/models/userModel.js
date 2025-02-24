const mongoose = require('mongoose')
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Store hashed password only
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    role: { type: String, enum: ["consumer", "provider", "admin"], required: true },
    address: {
        line1: { type: String, required: true },
        line2: { type: String }, // Optional
        unit_no: { type: String }, // Optional
        postal_code: { type: String, required: true },
        province: { type: String, required: true },
        country: { type: String, required: true },
        longitude: { type: Number, required: true },
        latitude: { type: Number, required: true }
    }
}, { timestamps: true });

userSchema.methods.isValidPassword = async function (password) {
	const user = this;
	const hash = await bcrypt.hash(password, 10);
	const compare = await bcrypt.compare(password, user.password);
	return compare;
  };

module.exports = mongoose.model("user", userSchema, "users");