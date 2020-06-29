const mongoose = require('mongoose');
const { User } = require('./user')

const Message = mongoose.model('messages', new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    user: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})
);

module.exports.Message = Message;