const OTP = require('../models/OTP');
const User = require('../models/User');
const sendOTP = require('../libs/otp');
const otpGenerator = require('otp-generator');

module.exports = {
    post: async (req, res) => {
        let { email } = req.body;
        let user = await User.findOne({ email });
        let otp = await OTP.findOne({ email });
    
        if (user !== null) {
            const otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                specialChars: false,
                lowerCaseAlphabets: false,
            });
    
            const newOtp = new OTP({
                email: email.toLowerCase(),
                otp,
            });
    
            await newOtp.save();
            sendOTP(email, otp);
            return res.json({
                message: 'OTP has been sent to your email',
                login: true,
            });
        }
    
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
    },

    verify: async (req, res) => {
        let { email, otp } = req.body;
        email = email.toLowerCase();
        const user = await User.findOne({ email });
        if (user !== null) {
            OTP.findOne({ email })
                .then((code) => {
                    if (code.otp === otp) {
                        const token = jwt.sign(email, process.env.TOKEN_SECRET);
                        code.remove();
                        return res.json({
                            access_token: token,
                            user: user,
                        });
                    }
                })
                .catch((err) => {
                    return res.status(403).json({ message: 'OTP is incorrect' });
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
    }
}