const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        minLength: 2,
        required: [true, "Name is required"],
        validate: {
            validator: function (value) {
                const nameRegex = /^[a-zA-Z\s]*$/;
                return nameRegex.test(value);
            },
            message: "Name must only contain alphanumeric characters."
        }
    },
    password: {
        type: String,
        trim: true,
        required: [true, "Password is required."]
    },
    access: {
        type: Boolean,
        required: true
    },
    settings: {
        mode: String,
        sidebar: Boolean,
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    },
    updatedAt: {
        type: Date,
        default: () => Date.now()
    }
});

module.exports = mongoose.model('User', userSchema);