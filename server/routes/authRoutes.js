const express = require('express');
const router = express.Router();
const otpGenerator = require('otp-generator');

const controller = require('../controllers/authController')



router.post('/auth', controller.post);

router.post('/auth/verify', controller.verify);

module.exports = router;
