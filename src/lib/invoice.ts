import { jsPDF } from "jspdf";
import { Booking } from "@/types";

export function generateBookingInvoice(booking: Booking) {
  const doc = new jsPDF({
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();

  // Primary brand header
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(25, 25, 25);
  doc.text("STUDIOSPACE", 20, 25);

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(181, 138, 90); // Accent #B58A5A
  doc.text("FIND YOUR SPACE. CREATE YOUR STORY.", 20, 31);

  // Invoice title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(25, 25, 25);
  doc.text("PRODUCTION WORKSPACE INVOICE", pageWidth - 20, 25, { align: "right" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(119, 119, 119);
  doc.text(`Invoice Ref: #${booking._id.substring(booking._id.length - 8).toUpperCase()}`, pageWidth - 20, 31, {
    align: "right",
  });
  doc.text(`Issue Date: ${new Date().toLocaleDateString()}`, pageWidth - 20, 36, { align: "right" });

  // Divider
  doc.setDrawColor(234, 232, 228);
  doc.setLineWidth(0.5);
  doc.line(20, 42, pageWidth - 20, 42);

  // Billing & Host info columns
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(25, 25, 25);
  doc.text("RESERVED BY (CREATOR)", 20, 52);
  doc.text("STUDIO HOST", 110, 52);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(80, 80, 80);
  doc.text(`Name: ${booking.creatorName}`, 20, 58);
  doc.text(`Email: ${booking.creatorEmail}`, 20, 63);

  doc.text(`Host: ${booking.hostName}`, 110, 58);
  doc.text(`Email: ${booking.hostEmail}`, 110, 63);

  // Production Space Details Box
  doc.setFillColor(247, 247, 245);
  doc.roundedRect(20, 72, pageWidth - 40, 30, 2, 2, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(25, 25, 25);
  doc.text(`Studio: ${booking.studioTitle}`, 25, 80);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  doc.text(`Location: ${booking.studioLocation}`, 25, 86);
  doc.text(
    `Reserved Date: ${booking.bookingDate}  |  Production Hours: ${booking.startTime} - ${booking.endTime} (${booking.duration} hrs)`,
    25,
    92
  );
  doc.text(`Booking Status: ${booking.status.toUpperCase()}`, 25, 97);

  // Pricing Table Headers
  let tableY = 115;
  doc.setFillColor(25, 25, 25);
  doc.rect(20, tableY, pageWidth - 40, 8, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.text("DESCRIPTION", 25, tableY + 5.5);
  doc.text("RATE / DURATION", 110, tableY + 5.5);
  doc.text("AMOUNT (USD)", pageWidth - 25, tableY + 5.5, { align: "right" });

  // Row 1: Studio Rental
  tableY += 16;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(25, 25, 25);
  doc.text("Studio Hourly Rental", 25, tableY);
  doc.setFont("helvetica", "normal");
  doc.text(`$${booking.hourlyRate} / hr  ×  ${booking.duration} hrs`, 110, tableY);
  doc.text(`$${booking.rentalAmount.toFixed(2)}`, pageWidth - 25, tableY, { align: "right" });

  // Row 2: Security Deposit
  tableY += 8;
  doc.setFont("helvetica", "bold");
  doc.text("Refundable Security Deposit", 25, tableY);
  doc.setFont("helvetica", "normal");
  doc.text("Refunded post wrap inspection", 110, tableY);
  doc.text(`$${booking.securityDeposit.toFixed(2)}`, pageWidth - 25, tableY, { align: "right" });

  // Table Bottom Divider
  tableY += 6;
  doc.setDrawColor(234, 232, 228);
  doc.line(20, tableY, pageWidth - 20, tableY);

  // Totals Box
  tableY += 12;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(25, 25, 25);
  doc.text("TOTAL PAYABLE:", 120, tableY);
  doc.setTextColor(181, 138, 90);
  doc.text(`$${booking.totalAmount.toFixed(2)}`, pageWidth - 25, tableY, { align: "right" });

  // Footer notes
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(140, 140, 140);
  doc.text(
    "Thank you for creating with StudioSpace. Please retain this invoice for your production accounting.",
    20,
    270
  );
  doc.text("StudioSpace — Peer-to-Peer Creative Studio Marketplace", 20, 275);

  // Trigger download
  doc.save(`StudioSpace_Invoice_${booking._id.substring(booking._id.length - 8).toUpperCase()}.pdf`);
}
