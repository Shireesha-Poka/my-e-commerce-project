const nodeMailer = require("nodemailer");

const sendEmail = async(options) => {

    const transporter = nodeMailer.createTransport({
        service:process.env.SMTP_SERVICE,
        host: "smtp.gmail.com",
        port: 465,
        secure:true,
        auth:{
            type: 'OAuth2',
            user : process.env.SMTP_MAIL,
            pass : process.env.SMTP_PASSWORD,
            clientId: process.env.GMAIL_CLIENTID,
            clientSecret: process.env.GMAIL_CLIENTSECRET,
            refreshToken: process.env.GMAIL_RFRESHTOKEN,
            accessToken: process.env.GMAIL_ACCESSTOKEN
        }
    })

    const mailOptions = {
        from:process.env.SMTP_MAIL,
        to:options.email,
        subject:options.subject,
        text:options.message,
    }

    await transporter.sendMail(mailOptions);

};

module.exports = sendEmail;
