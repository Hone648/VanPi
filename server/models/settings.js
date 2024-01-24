const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const settingsSchema = new Schema({
    mode: {
        type: String,
        required: true,
    },
    alternatorVisible: {
        type: Boolean,
        required: true
    },
    GWAlarm: {
        type: Number,
        required: true
    },
    GWDump: {
        type: Number,
        required: true
    },
    BWAlarm: {
        type: Number,
        required: true
    },
    BWDump: {
        type: Number,
        required: true
    },
    createdAt:
    {
        type: Date,
        immutable: true,
        default: () => Date.now()
    },
    updatedAt: {
        type: Date,
        default: () => Date.now()
    }
})

module.exports = mongoose.model('Settings', settingsSchema);