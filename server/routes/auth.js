const express = require('express');
const router = express.Router();
const User = require('../models/User');
const otpGenerator = require('otp-generator');

router.get('/users', async (req, res) => {
    const users = await User.find();
    res.json({ users: users });
});

const { body, validationResult } = require('express-validator');

router.post('/users', body('email').isEmail(), async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()[0].msg });
    }

    if ((await User.findOne({ email: req.body.email })) !== null) {
        return res.status(500).json({ message: 'User already exists' });
    } else {
        const { username, email, avatar } = req.body;

        const otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            specialChars: false,
            lowerCaseAlphabets: false,
        });

        const user = new User({
            username,
            email,
            otp,
            avatar,
        });

        await user.save();
        res.json({ user: user });
    }
});

module.exports = router;
