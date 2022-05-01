const express = require('express');
const router = express.Router();
const User = require('../models/User');
const otpGenerator = require('otp-generator');
const { body, validationResult } = require('express-validator');
const sendMail = require('../libs/mail');
const jwt = require('jsonwebtoken');

const ensureToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
};

router.get('/users', ensureToken, async (req, res) => {
    jwt.verify(req.token, process.env.TOKEN_SECRET, (err, data) => {
        if (err) {
            res.sendStatus(403);
        } else {
            User.find().then((users) => {
                res.json({ users });
            });
        }
    });
});

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
        res.json({ message: 'Check your email for OTP' });

        const mailOptions = {
            from: 'letterboxd.v2@gmail.com', // sender address
            to: [email], // list of receivers
            subject: 'Your one time password', // Subject line
            html: `<h1>${otp}</h1>`, // plain text body
        };

        sendMail(mailOptions);
    }
});

router.post('/users/verifyOTP', (req, res) => {
    const { email, otp } = req.body;

    User.findOne({ email: email })
        .then((user) => {
            if (user.otp === otp) {
                const token = jwt.sign(
                    { _id: user._id },
                    process.env.TOKEN_SECRET
                );
                res.json({ message: 'OTP verified', token });
            } else {
                res.json({ message: 'OTP not verified' });
            }
        })
        .catch((err) => {
            res.json({ message: err });
        });
});

module.exports = router;
