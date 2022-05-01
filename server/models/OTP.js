const mongoose = require('mongoose');
const schema = mongoose.Schema;

const otpSchema = new schema({
    createdAt: { type: Date, expires: 120, default: Date.now },
    email: { type: String, required: true },
    otp: { type: Number, required: true },
});

module.exports = mongoose.model('OTP', otpSchema);
