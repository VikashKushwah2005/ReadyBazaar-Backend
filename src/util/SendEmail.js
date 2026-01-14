const nodemailer = require('nodemailer');

async function sendVerificationEmail(to, subject, body) {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "vikashkushwah2005@gmail.com",      // your full email
                pass: "Vikash@2005"   // 16-char app password
            }
        });

        const mailOptions = {
            from: "vikashkushwah2005@gmail.com",
            to,
            subject,
            html: body
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Failed to send email");
    }
}

module.exports = sendVerificationEmail;
