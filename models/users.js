const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date
    }
});

module.exports = mongoose.model('User', taskSchema);