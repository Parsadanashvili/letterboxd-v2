const express = require('express');
const router = express.Router();
const User = require('../models/User');
const otpGenerator = require('otp-generator');
const sendOTP = require('../libs/otp');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const OTP = require('../models/OTP');

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

router.get('/users', ensureToken, (req, res) => {
    jwt.verify(req.token, process.env.TOKEN_SECRET, (err) => {
        if (err) {
            res.sendStatus(403).json({ message: 'Forbidden' });
        }
        User.find().then((users) => {
            return res.json({ users });
        });
    });
});

router.post('/auth', async (req, res) => {
    let { email } = req.body;
    let user = await User.findOne({ email });
    let otp = await OTP.findOne({ email });

    user !== null && handleLogin();
    const handleLogin = () => {
        const otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            specialChars: false,
            lowerCaseAlphabets: false,
        });

        const newOtp = new OTP({
            email: email.toLowerCase(),
            otp,
        });

        newOtp.save();
        sendOTP(email, otp);
        return res.json({
            message: 'OTP has been sent to your email',
            login: true,
        });
    };

    if (otp) {
        return res.status(403).json({ message: 'OTP already sent' });
    } else {
        let otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            specialChars: false,
            lowerCaseAlphabets: false,
        });

        let code = new OTP({
            email: email.toLowerCase(),
            otp,
        });

        await code.save();
        sendOTP(email, otp);
        return res.json({ message: 'OTP has been sent to your email' });
    }
});

router.post('/auth/verify', async (req, res) => {
    let { email, otp } = req.body;
    email = email.toLowerCase();
    if ((await User.findOne({ email })) !== null) {
        OTP.findOne({ email })
            .then((code) => {
                if (code.otp === otp) {
                    const token = jwt.sign(email, process.env.TOKEN_SECRET);
                    code.remove();
                    return res.json({
                        access_token: token,
                    });
                }
            })
            .catch((err) => {
                res.status(403).json({ message: 'OTP is incorrect' });
            });
    } else {
        OTP.findOne({ email }).then((code) => {
            if (code.otp === otp) {
                const newUser = new User({
                    email,
                });
                newUser.save();
                const token = jwt.sign(email, process.env.TOKEN_SECRET);
                code.remove();
                return res.json({
                    access_token: token,
                    user: newUser,
                });
            }
        });
    }
});

router.put('/users/', ensureToken, async (req, res) => {
    const email = jwt.verify(req.token, process.env.TOKEN_SECRET);
    const user = await User.findOne({ email: email });

    if (user !== null) {
        await User.findOneAndUpdate({ email }, { username: req.body.username });
        return res.json({ message: 'Username has been updated' });
    } else {
        return res.status(404).json({ message: 'User not found' });
    }
});

module.exports = router;
