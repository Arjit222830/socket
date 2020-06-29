const express = require('express');
const router = express.Router();
const { Message } = require('../models/message');
const { User } = require('../models/user');

router.post('/', async (req, res) => {

    const user = await User.findById(req.header('id'));

    const message = new Message({
        text: req.body.text,
        user: user.name
    });

    await message.save();

    console.log(req.header('id'));

    res.send({ link: `/chat-${req.header('id')} #chat-messages` });
});

module.exports = router;