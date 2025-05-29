// utils/sendEmail.js
import nodemailer from 'nodemailer';

const sendEmail = async (to, subject, text, html = null) => {
    try {
        // console.log('sendEmail.js loaded'); // Open Terminal and check
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to,
            subject,
            text,
            ...(html && { html }),
        });
    } catch (error) {
        console.error('Email sending error:', error);
        throw new Error('Email sending failed');
    }
};

export default sendEmail;


// const sendEmail = async (to, subject, text) => {
//     const transporter = nodemailer.createTransport({
//         service: 'Gmail',
//         auth: {
//             user: process.env.EMAIL_USER,
//             pass: process.env.EMAIL_PASS,
//         },
//     });
//     await transporter.sendMail({
//         from: `"Xarfi" <${process.env.EMAIL_USER}>`,
//         to,
//         subject,
//         text,
//     });
// };
// export default sendEmail;



