import nodemailer from 'nodemailer';

// Create a transporter using environment variables
// If SMTP variables are not defined, it operates in log-only mock mode
const createTransporter = () => {
  const host = process.env.EMAIL_HOST;
  const port = process.env.EMAIL_PORT;
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  console.log(`[EMAIL CONFIG DIAGNOSTIC] Host: ${host || 'undefined'}, Port: ${port || 'undefined'}, User: ${user || 'undefined'}, Password: ${pass ? 'configured (masked)' : 'undefined'}`);

  // We require user and pass to establish a real transport.
  // We check 'your_email@gmail.com' or 'your_app_password' as placeholders to avoid attempting connection with default placeholder text.
  if (!user || !pass || user.includes('your_email') || pass.includes('your_app_password')) {
    console.log('📧 Email settings not fully configured (EMAIL_USER/EMAIL_PASS missing or placeholder). Operating in log-only mock mode.');
    return null;
  }

  return nodemailer.createTransport({
    host: host || 'smtp.gmail.com',
    port: parseInt(port || '587', 10),
    secure: port === '465' || port === 465, // true for 465, false for other ports
    auth: {
      user,
      pass,
    },
  });
};

/**
 * Send an email notification for a complaint status update
 * @param {Object} params
 * @param {string} params.to - Recipient email
 * @param {string} params.studentName - Name of the student
 * @param {string} params.complaintId - Complaint ID/Number
 * @param {string} params.complaintTitle - Title of the complaint
 * @param {string} params.oldStatus - Original status of the complaint
 * @param {string} params.newStatus - Updated status of the complaint
 */
export async function sendStatusUpdateEmail({
  to,
  studentName,
  complaintId,
  complaintTitle,
  oldStatus,
  newStatus,
}) {
  const subject = `Update on your Complaint #${complaintId}`;
  
  // Format statuses for presentation
  const formatStatus = (s) => {
    if (!s) return 'Unknown';
    return s.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  const formattedOld = formatStatus(oldStatus);
  const formattedNew = formatStatus(newStatus);
  const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
  const complaintLink = `${clientUrl}/login`;

  // Rich HTML template following clean premium UI styling (matching Campus CCMS colors: Charcoal, Lime, Ember)
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>${subject}</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          background-color: #0d0d0d;
          color: #f2efe9;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 40px auto;
          background-color: #1a1a1a;
          border: 1px solid #2d2d2d;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }
        .header {
          background-color: #0d0d0d;
          padding: 30px;
          text-align: center;
          border-bottom: 1px solid #2d2d2d;
        }
        .logo {
          font-size: 24px;
          font-weight: 900;
          color: #ccff00; /* acid-lime */
          text-transform: uppercase;
          letter-spacing: 2px;
          text-decoration: none;
        }
        .content {
          padding: 40px 30px;
        }
        h1 {
          font-size: 20px;
          font-weight: 800;
          margin-top: 0;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #f2efe9;
        }
        p {
          font-size: 14px;
          line-height: 1.6;
          color: rgba(242, 239, 233, 0.7);
        }
        .card {
          background-color: #0d0d0d;
          border: 1px solid #2d2d2d;
          border-radius: 12px;
          padding: 24px;
          margin: 24px 0;
        }
        .card-row {
          margin-bottom: 12px;
        }
        .card-row:last-child {
          margin-bottom: 0;
        }
        .label {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: rgba(242, 239, 233, 0.4);
        }
        .value {
          font-size: 14px;
          font-weight: 600;
          color: #f2efe9;
          margin-top: 4px;
        }
        .status-badge {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 9999px;
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .status-badge.old {
          background-color: #2d2d2d;
          color: rgba(242, 239, 233, 0.6);
        }
        .status-badge.new {
          background-color: #ccff00;
          color: #0d0d0d;
        }
        .arrow {
          color: rgba(242, 239, 233, 0.4);
          font-weight: bold;
          margin: 0 4px;
        }
        .btn-container {
          text-align: center;
          margin-top: 30px;
        }
        .btn {
          display: inline-block;
          background-color: #ccff00;
          color: #0d0d0d !important;
          padding: 14px 28px;
          border-radius: 9999px;
          font-size: 12px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          text-decoration: none;
          transition: background-color 0.2s ease;
        }
        .btn:hover {
          background-color: #d8ff33;
        }
        .footer {
          background-color: #0d0d0d;
          padding: 24px;
          text-align: center;
          border-top: 1px solid #2d2d2d;
          font-size: 11px;
          color: rgba(242, 239, 233, 0.4);
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <span class="logo">CCMS Support</span>
        </div>
        <div class="content">
          <h1>Complaint Status Updated</h1>
          <p>Hi ${studentName},</p>
          <p>The status of your campus complaint has been updated. Please review the details below:</p>
          
          <div class="card">
            <div class="card-row">
              <div class="label">Complaint ID</div>
              <div class="value">#${complaintId}</div>
            </div>
            <div class="card-row">
              <div class="label">Title</div>
              <div class="value">${complaintTitle}</div>
            </div>
            <div class="card-row">
              <div class="label">Status Change</div>
              <div class="value">
                <span class="status-badge old">${formattedOld}</span>
                <span class="arrow">&rarr;</span>
                <span class="status-badge new">${formattedNew}</span>
              </div>
            </div>
          </div>
          
          <div class="btn-container">
            <a href="${complaintLink}" class="btn">View Complaint</a>
          </div>
        </div>
        <div class="footer">
          &copy; ${new Date().getFullYear()} Campus Complaint Management System. All rights reserved.
        </div>
      </div>
    </body>
    </html>
  `;

  const textContent = `
    Dear ${studentName},

    The status of your complaint #${complaintId} ("${complaintTitle}") has been updated from "${formattedOld}" to "${formattedNew}".

    View the complaint details here: ${complaintLink}

    Best regards,
    Campus Complaint Management System
  `;

  const transporter = createTransporter();
  const from = process.env.EMAIL_FROM || `"Campus CCMS" <${process.env.EMAIL_USER || 'no-reply@campus.edu'}>`;

  if (transporter) {
    try {
      const info = await transporter.sendMail({
        from,
        to,
        subject,
        text: textContent,
        html: htmlContent,
      });
      console.log(`📧 Status update email successfully sent to ${to}: ${info.messageId}`);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error(`❌ Failed to send status update email to ${to} via SMTP:`, error.message);
      return { success: false, error: error.message };
    }
  } else {
    // Mock simulation output to console
    console.log('\n--- 📧 [MOCK EMAIL SIMULATOR] ---');
    console.log(`To: ${to} (${studentName})`);
    console.log(`Subject: ${subject}`);
    console.log('Body (HTML simulated):');
    console.log(`[Status Change] "${formattedOld}" -> "${formattedNew}" for complaint #${complaintId} ("${complaintTitle}")`);
    console.log(`Link: ${complaintLink}`);
    console.log('---------------------------------\n');
    return { success: true, mock: true };
  }
}
