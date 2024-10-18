import nodemailer from 'nodemailer';
import ReactDOMServer from 'react-dom/server';
import VerificationEmail from '../../emails/VerificationEmail';
import { ApiResponse } from '@/types/ApiResponse';

// Create a reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use Gmail or another service
  auth: {
    user: process.env.SMTP_USER, // Your email address
    pass: process.env.SMTP_PASS, // Your email password or app-specific password
  },
});

export async function registrationEmail(
  email: string,
  name: string,
): Promise<ApiResponse> {
  try {
    // Convert the JSX to a string (HTML) using ReactDOMServer
   

    // Send email using the transporter
    const info = await transporter.sendMail({
      from: '"OpenBio" <your-email@example.com>', // Change this to your verified email
      to: email, // Recipient email
      subject: 'OpenBio | Verification Code', // Subject line
      html: `Welcome to openbio | ${name}`, // HTML body content (as a string)
    });

    console.log('Message sent: %s', info.messageId); // Access the messageId properly
    return { success: true, message: 'Verification email sent successfully' };
  } catch (error) {
    console.error('Error sending verification email', error);
    return { success: false, message: 'Failed to send verification email' };
  }
}
