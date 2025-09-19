
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
service: 'gmail',
auth: {
user: 'kokila.dev.beleaf@gmail.com',
pass: 'Beleaf@001'
}
});

const sendMail = async (mailOptions) => {
try {
await transporter.sendMail(mailOptions);
console.log('Email sent');
} catch (error) {
console.error('Error sending email:', error);
}
};

module.exports = { sendMail };
