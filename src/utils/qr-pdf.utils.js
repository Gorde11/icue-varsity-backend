import QRCode from 'qrcode';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.join(__dirname, '../../uploads');

// Create uploads directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

/**
 * Generate QR Code for ticket or verification
 * @param {Object} data - Data to encode in QR code (ticket ID, student ID, exam ID, etc.)
 * @returns {Promise<string>} - Path to generated QR code image
 */
export const generateQRCode = async (data) => {
  try {
    const fileName = `qr-${Date.now()}-${Math.random().toString(36).substr(2, 9)}.png`;
    const filePath = path.join(outputDir, fileName);
    
    const qrData = JSON.stringify(data);
    await QRCode.toFile(filePath, qrData, {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      quality: 0.95,
      margin: 2,
      width: 300,
    });

    return `/uploads/${fileName}`;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw new Error('Failed to generate QR code');
  }
};

/**
 * Generate Payment Slip PDF
 * @param {Object} paymentData - Payment information
 * @returns {Promise<string>} - Path to generated PDF
 */
export const generatePaymentSlip = async (paymentData) => {
  return new Promise((resolve, reject) => {
    try {
      const fileName = `payment-slip-${Date.now()}-${Math.random().toString(36).substr(2, 9)}.pdf`;
      const filePath = path.join(outputDir, fileName);

      const doc = new PDFDocument({
        size: 'A4',
        margin: 50,
      });

      const stream = fs.createWriteStream(filePath);
      doc.pipe(stream);

      // Header
      doc.fontSize(20).text('ICUE Varsity College', { align: 'center', underline: true });
      doc.fontSize(12).text('Payment Slip', { align: 'center', underline: true });
      doc.moveDown();

      // Transaction Details
      doc.fontSize(11);
      doc.text(`Transaction ID: ${paymentData.transactionId}`, { underline: true });
      doc.text(`Date: ${new Date(paymentData.date).toLocaleDateString()}`);
      doc.text(`Time: ${new Date(paymentData.date).toLocaleTimeString()}`);
      doc.moveDown();

      // Student Information
      doc.fontSize(12).text('Student Information', { underline: true });
      doc.fontSize(11);
      doc.text(`Name: ${paymentData.studentName}`);
      doc.text(`Student ID: ${paymentData.studentId}`);
      doc.text(`Email: ${paymentData.email}`);
      doc.moveDown();

      // Payment Information
      doc.fontSize(12).text('Payment Information', { underline: true });
      doc.fontSize(11);
      doc.text(`Amount: TZS ${paymentData.amount.toLocaleString()}`);
      doc.text(`Payment Method: ${paymentData.method}`);
      doc.text(`Phone Number: ${paymentData.phone}`);
      doc.moveDown();

      // Ticket/Item Information
      if (paymentData.items && paymentData.items.length > 0) {
        doc.fontSize(12).text('Items Purchased', { underline: true });
        doc.fontSize(11);
        paymentData.items.forEach((item, index) => {
          doc.text(`${index + 1}. ${item.name} - TZS ${item.price}`);
        });
        doc.moveDown();
      }

      // QR Code
      if (paymentData.qrCode) {
        doc.fontSize(12).text('Verification QR Code:', { underline: true });
        // Note: In real implementation, would insert QR code image
        doc.fontSize(10).text('(QR code image would be embedded here)');
        doc.moveDown();
      }

      // Footer
      doc.fontSize(9).text('This is an automatically generated payment slip. Please keep for your records.', { align: 'center' });
      doc.text(`Generated: ${new Date().toISOString()}`, { align: 'center' });

      doc.end();

      stream.on('finish', () => {
        resolve(`/uploads/${fileName}`);
      });

      stream.on('error', (error) => {
        reject(error);
      });
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Generate Ticket Certificate PDF
 * @param {Object} ticketData - Ticket information
 * @returns {Promise<string>} - Path to generated PDF
 */
export const generateTicketPDF = async (ticketData) => {
  return new Promise((resolve, reject) => {
    try {
      const fileName = `ticket-${ticketData.ticketId}.pdf`;
      const filePath = path.join(outputDir, fileName);

      const doc = new PDFDocument({
        size: 'A5',
        margin: 30,
      });

      const stream = fs.createWriteStream(filePath);
      doc.pipe(stream);

      // Header
      doc.fontSize(16).text('EXAM TICKET', { align: 'center', underline: true });
      doc.moveDown();

      // Ticket Details
      doc.fontSize(11);
      doc.text(`Ticket ID: ${ticketData.ticketId}`, { underline: true });
      doc.text(`Student: ${ticketData.studentName}`);
      doc.text(`Exam: ${ticketData.examName}`);
      doc.text(`Date: ${ticketData.examDate}`);
      doc.text(`Venue: ${ticketData.venueName}`);
      doc.text(`Status: ${ticketData.status}`);
      doc.moveDown();

      // Footer
      doc.fontSize(9).text('Please present this ticket at the exam venue', { align: 'center' });

      doc.end();

      stream.on('finish', () => {
        resolve(`/uploads/${fileName}`);
      });

      stream.on('error', (error) => {
        reject(error);
      });
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Decode QR Code data
 * @param {string} qrData - QR code string data
 * @returns {Object} - Decoded QR data
 */
export const decodeQRCode = (qrData) => {
  try {
    return JSON.parse(qrData);
  } catch (error) {
    throw new Error('Invalid QR code data');
  }
};
