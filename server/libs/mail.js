const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config();

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'letterboxd.v2@gmail.com',
        pass: '123!123@',
    },
});
// const mailOptions = {
//     from: 'letterboxd.v2@gmail.com', // sender address
//     to: 'to@email.com', // list of receivers
//     subject: 'Subject of your email', // Subject line
//     html: '<p>Your html here</p>', // plain text body
// };

const sendMail = (mailOptions) => {
    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    });
};
