// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const { generateToken } = require("../helpers/jwttoken");
const nodemailer = require("nodemailer");
const password = process.env.API_KEY;

function sendEmailRegister(req, res, next) {
  console.log("Masuk function send Email");
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.FROM_EMAIL,
      pass: password,
    },
  });
  generateToken(req.payload, (err, token) => {
    let user = req.payload;
    //   let link = `http://localhost:3005/api/auth/verify/${token}`;
    let link = `http://${req.headers.host}/api/auth/verify/${token}`;
    const mailOptions = {
      from: process.env.FROM_EMAIL,
      to: user.email,
      subject: "Account Verification",
      text: `Hi ${user.full_name} \n
                Please click on the following link ${link} to verify your account. \n\n 
                If you did not request this, please ignore this email.\n`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.status(500).json({ message: error.message, status: 500 });
      } else {
        res.status(202).json({
          message: "Email Verifikasi telah di kirim silahkan cek email anda ",
          status: 202,
        });
      }
    });
  });
}

module.exports = { sendEmailRegister };
