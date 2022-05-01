const mongoose = require('mongoose');
const schema = mongoose.Schema;

const tokenSchema = new schema({
    userId: { type: String, required: true },
    token: { type: String, required: true },
});

module.exports = mongoose.model('Token', tokenSchema);
