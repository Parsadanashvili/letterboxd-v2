const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    otp: {
        type: Number,
        createdAt: { type: Date, expires: 3600, default: Date.now },
    },
    avatar: { type: String },
});

module.exports = mongoose.model('User', userSchema);
