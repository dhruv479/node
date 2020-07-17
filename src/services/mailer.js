const nodemailer = require('nodemailer');
const { EMAIL_PASS, EMAIL_USER } = require('../../config/keys');

const sendMail = async ({ to, subject, text, html }) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: '"Omni COE" <foo@example.com>',
    to: to,
    subject: subject,
    text: text,
    html: html,
  });
};

module.exports = { sendMail };
