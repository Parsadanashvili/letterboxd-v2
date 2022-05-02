const sendMail = require('./mail');

const sendOTP = (email, otp) => {
    const mailOptions = {
        from: 'letterboxd.v2@gmail.com', // sender address
        to: [email], // list of receivers
        subject: 'Your one time password', // Subject line
        html: `<h1>${otp}</h1>`, // plain text body
    };
    sendMail(mailOptions);
};

module.exports = sendOTP;
