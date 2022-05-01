const mongoose = require('mongoose');
const schema = mongoose.Schema;

const otpSchema = new schema({
    createdAt: { type: Date, expires: 120, default: Date.now },
    email: { type: String, required: true },
    otp: { type: Number, required: true },
    verified: { type: Boolean, default: false },
});

module.exports = mongoose.model('OTP', otpSchema);
