import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { jsPDF } from 'jspdf';

@Injectable()
export class EmailService {
  async sendEmailWithPdf(
    recipientName: string,
    recipientEmail: string,
    subject: string,
    content: string,
    pdfBuffer: Buffer,
  ): Promise<void> {
    const url = 'https://api.brevo.com/v3/smtp/email';
    const payload = {
      sender: {
        name: "Teddy's Travel",
        email: process.env.EMAIL_SENDER,
      },
      to: [
        {
          email: recipientEmail,
          name: recipientName,
        },
      ],
      subject: subject,
      htmlContent: content,
      attachment: [
        {
          name: 'trip-details.pdf',
          content: pdfBuffer.toString('base64'),
        },
      ],
    };
    const headers = {
      'Content-Type': 'application/json',
      'api-key': process.env.BREVO_API_KEY,
    };
    try {
      const response = await axios.post(url, payload, { headers });
      console.log('Response:', response.data);
      return response.data;
    } catch (error) {
      console.error(
        'Error:',
        error.response ? error.response.data : error.message,
      );
      throw error;
    }
  }
}
