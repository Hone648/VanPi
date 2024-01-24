const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const settingsSchema = new Schema({
    mode: String,
    alternatorVisible: Boolean,
    GWAlarm: Number,
    GWDump: Number,
    BWAlarm: Number,
    BWDump: Number
})

module.exports = mongoose.model('Settings', settingsSchema);