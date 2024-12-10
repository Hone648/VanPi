const mongoose = require('mongoose');

const currentUserSchema = new mongoose.Schema({
    id: String,
});

module.exports = mongoose.model('CurrentUser', currentUserSchema);
