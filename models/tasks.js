const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true

    },
    description: {
        type: String,
        required: true
    },
    assignee: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model('Task', taskSchema);