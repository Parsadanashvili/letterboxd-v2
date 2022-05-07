const mongoose = require('mongoose');
const schema = mongoose.Schema;

const followingsSchema = new schema({
    from: {type: String, required: true},
    to: { type: String, required: true },
});

module.exports = mongoose.model('Followings', followingsSchema);
