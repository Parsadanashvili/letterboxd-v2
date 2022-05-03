const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    username: { type: String, required: false, default: '' },
    email: { type: String, required: true },
    avatar: { type: String, default: '/assets/images/avatar.png' },
});

module.exports = mongoose.model('User', userSchema);
