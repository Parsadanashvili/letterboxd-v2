const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: 'mail.firefly.com.ge',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL, // generated ethereal user
        pass: process.env.PASS, // generated ethereal password
    },
});

const sendMail = (mailOptions) => {
    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    });
};

module.exports = sendMail;
