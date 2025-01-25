const nodemailer = require('nodemailer');
const asyncErrorHandler = require('../utils/asyncErrorHandler')

const mailer = asyncErrorHandler( async (to, subject, text) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: to,
        subject: subject,
        text: text
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);

});

module.exports = mailer;