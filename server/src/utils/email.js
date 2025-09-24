const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "Gmail", // or use any SMTP service
    auth: {
        user: process.env.EMAIL_USER, // your email
        pass: process.env.EMAIL_PASS  // your email password or app password
    },
    tls: {
        rejectUnauthorized: false  // 💡 this bypasses self-signed certificate errors dont use in production
    }
});

const sendEmail = async (to, subject, text) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            text
        });
        console.log("Email sent: " + info.response);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

module.exports = sendEmail;
