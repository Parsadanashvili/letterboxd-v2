const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    otp: {
        type: Number,
    },
    avatar: { type: String },
});

module.exports = mongoose.model('User', userSchema);
