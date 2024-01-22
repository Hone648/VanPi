const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    password: String,
    createdAt: Date,
    updatedAt: Date
});

const User = mongoose.model('User', userSchema);

module.exports = User;