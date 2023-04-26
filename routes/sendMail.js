const express = require("express");
const router = express.Router();
var nodemailer = require("nodemailer");

var code = "";
var sent = null;

function generateCode() {
    code = "";
    for (var i = 0; i < 6; i++) {
        code += Math.floor(Math.random() * 10);
    }
}

router.post("/", async (req, res) => {
    console.log(process.env.API_PASSWORD)
    if (req.body.apiPassword != process.env.API_PASSWORD) {
        return res.status(400).send({err:"Please provide a valid api password"});
    }

    generateCode();
    var transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS,
        },
    });
    var mailOptions = {
        from: process.env.USER,
        to: req.body.email,
        subject: code + " is your BBU account reset code",
        text:
            "hi we received a request to reset your password.Enter " +
            code +
            " to reset your password",
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.status(400).send(error);
        } else {
            console.log("Email sent: " + info.response);
            res.status(200).send({ code: code });
        }
    });
});

module.exports = router;
