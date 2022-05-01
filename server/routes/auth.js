const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Otp = require('../models/OTP');
const Token = require('../models/Token');
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

const sendOTP = (email, otp) => {
    const mailOptions = {
        from: 'letterboxd.v2@gmail.com', // sender address
        to: [email], // list of receivers
        subject: 'Your one time password', // Subject line
        html: `<h1>${otp}</h1>`, // plain text body
    };
    sendMail(mailOptions);
};

router.post('/users', body('email').isEmail(), async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()[0].msg });
    }

    const { email } = req.body;
    const user = await User.findOne({ email: req.body.email });

    if (user !== null) {
        const newOtp = new Otp({
            email: email,
            otp: otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                specialChars: false,
                lowerCaseAlphabets: false,
                digits: true,
            }),
        });
        newOtp.save();
        sendOTP(email, newOtp.otp);
        res.json({ message: 'OTP has been sent' });
    } else {
        const newUser = new User({
            email,
        });
        await newUser.save();

        const otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            specialChars: false,
            lowerCaseAlphabets: false,
        });

        const newOtp = new Otp({
            email: email,
            otp: otp,
        });

        await newOtp.save();
        sendOTP(email, otp);
        res.json({ message: 'Check your email for OTP' });
    }
});

router.post('/users/verifyOTP', (req, res) => {
    const { email, otp } = req.body;

    User.findOne({ email: email }).then((user) => {
        if (user !== null) {
            Otp.findOne({ email: email })
                .then((OTP) => {
                    if (OTP.otp === otp) {
                        const token = jwt.sign(
                            { _id: user._id },
                            process.env.TOKEN_SECRET
                        );
                        res.json({ access_token: token, user });
                    } else {
                        res.status(403).json({ message: 'OTP is incorrect' });
                    }
                })
                .catch((err) => {
                    res.status(403).json({ message: 'OTP is incorrect' });
                });
        } else {
            res.status(404).json({ message: 'User does not exist' });
        }
    });
});

router.post('/users/setUsername', ensureToken, (req, res) => {
    let authorization = req.headers.authorization.split(' ')[1];

    let token = jwt.verify(authorization, process.env.TOKEN_SECRET);

    let userId = token._id;
    let user = User.findById(userId.toString());

    if (user !== null) {
        if (user.username === '') {
            let newUser = user.update({ username: req.body.username });

            return res.json({ message: 'Username has been set' });
        } else {
            return res.json({ message: 'Username has already been declared' });
        }
    }

    return res.status(401).json({ message: 'Unauthorized' });
});

module.exports = router;
