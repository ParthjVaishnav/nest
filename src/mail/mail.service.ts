import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'parthvaishnav81@gmail.com',  // Your Gmail
        pass: 'ceaglaeimqupfnub',  // Use Gmail App Password (not your main password)
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  async sendRegistrationMail(username: string, to: string) {
    try {
      const mailOptions = {
        from: '"Endel Digital" <your-email@gmail.com>',
        to,
        subject: 'Welcome to Endel Digital 🎉',
        html: `
          <p>Dear <b>${username}</b>,</p>
          <p>You have successfully registered on <b>Endel Digital</b>. Thank you for signing up!</p>
          <p><b>Best Regards,</b><br/>Endel Digital Team</p>
        `,
      };

      const info = await this.transporter.sendMail(mailOptions);
      return { message: 'Registration email sent successfully', info };
    } catch (error) {
      console.error('Error sending email:', error);
      return { message: 'Email sending failed', error };
    }
  }


  async sendAppointmentEmail(visitorEmail: string, date: string, allocatedTime: string) {
    const formLink = `http://localhost:3000/form?date=${date}&time=${allocatedTime}&email=${visitorEmail}`;

    await this.transporter.sendMail({
      from: '"Company Name" <your_email@gmail.com>',
      to: visitorEmail,
      subject: 'Your Appointment Details',
      html: `<p>Your appointment is scheduled for <strong>${date}</strong> at <strong>${allocatedTime}</strong>.</p>
             <p>Click <a href="${formLink}">here</a> to complete your details.</p>`,
    });
  }
}
