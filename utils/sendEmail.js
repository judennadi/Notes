const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const sendEmail = (options) => {
  const transporter = nodemailer.createTransport(
    sendgridTransport({
      auth: {
        api_key: process.env.API_KEY,
      },
    })
  );

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: options.to,
    subject: options.subject,
    html: options.text,
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      throw err;
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

module.exports = sendEmail;
