const nodemailer = require('nodemailer');

const sendEmail = async ({ to, subject, text }) => {
    try {
        let transporter;

        // If credentials are provided in .env, use them (e.g. Gmail)
        if (process.env.SMTP_EMAIL && process.env.SMTP_PASSWORD) {
            transporter = nodemailer.createTransport({
                service: 'gmail', // You can change this based on your provider
                auth: {
                    user: process.env.SMTP_EMAIL,
                    pass: process.env.SMTP_PASSWORD
                }
            });
        } else {
            // Fallback: Create a test account (Ethereal Email)
            // This is useful for local development if you haven't set up SMTP
            const testAccount = await nodemailer.createTestAccount();
            transporter = nodemailer.createTransport({
                host: "smtp.ethereal.email",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: testAccount.user,
                    pass: testAccount.pass
                }
            });
        }

        const mailOptions = {
            from: process.env.SMTP_EMAIL || '"WorkoutVault Support" <noreply@workoutvault.com>',
            to,
            subject,
            text
        };

        const info = await transporter.sendMail(mailOptions);

        if (!process.env.SMTP_EMAIL) {
            console.log("Email sent: %s", info.messageId);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        }

        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
};

module.exports = sendEmail;
