const express = require('express');
const router = express.Router();
const { User } = require('../models/user');

router.post('/', async (req, res) => {

    const unique = await User.findOne({ name: req.body.name });

    if (!unique) {
        const user = new User({
            name: req.body.name
        });
        await user.save();

        console.log(user._id);

        return res.redirect(`/chat-${user._id}`);
    }

    res.redirect(`/chat-${unique._id}`);


});

module.exports = router;