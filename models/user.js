const mongoose = require('mongoose');

const User = mongoose.model('users', new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})
);

module.exports.User = User;