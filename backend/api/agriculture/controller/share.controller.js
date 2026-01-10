const Share = require("../models/share");
const nodemailer = require("nodemailer");

const trackShare = async (req, res) => {
  try {
    const { platform } = req.body;
    const userAgent = req.headers['user-agent'] || 'Unknown';
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    // Save share event to DB
    await Share.create({
      platform,
      visitorInfo: { ip, userAgent }
    });

    // Get total share count
    const totalShares = await Share.countDocuments();

    // Send Email Alert
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_PORT == 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER,
      subject: `📢 Link Shared on ${platform}! (Total Shares: ${totalShares})`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #4caf50;">
          <h2 style="color: #2e7d32;">Great News! Your Link was Shared!</h2>
          <p>Someone clicked the share button on your website.</p>
          <hr>
          <p><strong>Platform:</strong> ${platform}</p>
          <p><strong>Total Shares so far:</strong> <span style="font-size: 20px; color: #e91e63;">${totalShares}</span></p>
          <hr>
          <p><strong>Visitor IP:</strong> ${ip}</p>
          <p><strong>Device:</strong> ${userAgent}</p>
          <br>
          <p>Keep sharing to grow PAC Barwaha!</p>
        </div>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) console.log("Share Email Error:", error);
      else console.log("Share Alert Sent: " + info.response);
    });

    res.status(200).json({ success: true, totalShares });
  } catch (error) {
    console.error("Share Tracking Error:", error);
    res.status(500).json({ success: false });
  }
};

module.exports = { trackShare };
