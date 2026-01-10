const nodemailer = require("nodemailer");
const axios = require("axios");
const Visit = require("../models/visit");

// Barwaha, MP Coordinates
const BARWAHA_LAT = 22.2536;
const BARWAHA_LON = 76.0407;

// Function to calculate distance in KM
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance.toFixed(2);
};

const trackVisit = async (req, res) => {
  try {
    const userAgent = req.headers['user-agent'] || 'Unknown';
    const referrer = req.headers.referer || 'Direct Visit';
    const { urlParams = {}, pagePath } = req.body;
    
    let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    
    // Detect Device Type
    let deviceType = "Desktop";
    if (/mobile/i.test(userAgent)) deviceType = "Mobile";
    else if (/tablet/i.test(userAgent)) deviceType = "Tablet";
    
    // Clean IP address
    if (ip.includes(',')) {
      ip = ip.split(',')[0].trim(); // Get the first IP in the list
    }
    if (ip.includes('::ffff:')) {
      ip = ip.split(':').pop();
    }
    
    const visitTime = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    let locationInfo = "Local/Unknown";
    let distanceInfo = "N/A";
    let geoData = { city: 'Local', regionName: 'Unknown', country: 'Unknown' };

    // For testing locally, if IP is local, use a dummy real IP to show data
    let fetchIp = ip;
    if (fetchIp === '127.0.0.1' || fetchIp === '::1') {
      fetchIp = '27.7.0.1'; // Example Indore/MP IP for local testing visualization
    }

    try {
      console.log(`Fetching Geo info for IP: ${fetchIp}`);
      const geoResponse = await axios.get(`http://ip-api.com/json/${fetchIp}`);
      console.log("Geo Response Data:", geoResponse.data);
      
      if (geoResponse.data.status === 'success') {
        geoData = geoResponse.data;
        const { city, regionName, country, lat, lon } = geoResponse.data;
        locationInfo = `${city}, ${regionName}, ${country}`;
        distanceInfo = `${calculateDistance(BARWAHA_LAT, BARWAHA_LON, lat, lon)} KM`;
      } else {
        console.log("Geo API returned fail status:", geoResponse.data.message);
      }
    } catch (geoErr) {
      console.error("Geo Fetch Error:", geoErr.message);
    }

    // Save visit to DB
    const newVisit = await Visit.create({
      ip: ip === '127.0.0.1' || ip === '::1' ? `${ip} (Test Mode)` : ip,
      city: geoData.city,
      region: geoData.regionName,
      country: geoData.country,
      location: locationInfo,
      distance: distanceInfo,
      userAgent,
      deviceType,
      pagePath: pagePath || '/',
      referrer,
      platform: (urlParams && urlParams.platform) || 'Direct',
      // Store raw url params as a string or object if needed
      metadata: JSON.stringify(urlParams || {})
    });

    // Send response back to frontend with distance info
    res.status(200).json({ 
      success: true, 
      distance: distanceInfo,
      location: locationInfo 
    });

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
      to: process.env.SMTP_USER, // Sending to yourself
      subject: "🚨 Alert: Someone just opened your website link!",
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
          <h2 style="color: #d32f2f;">New Visitor Alert!</h2>
          <p>Someone just landed on your website.</p>
          <hr>
          <p><strong>🕒 Time:</strong> ${visitTime}</p>
          <p><strong>🌐 IP Address:</strong> ${ip}</p>
          <p><strong>📍 Location:</strong> ${locationInfo}</p>
          <p><strong>📏 Distance from Barwaha:</strong> <span style="color: #2e7d32; font-weight: bold;">${distanceInfo}</span></p>
          <p><strong>🔗 Referrer (Came from):</strong> ${referrer}</p>
          <p><strong>📱 Device Info:</strong> ${userAgent}</p>
          <hr>
          <h3>Detected Info from Link:</h3>
          <pre>${JSON.stringify(urlParams, null, 2)}</pre>
          <p style="font-size: 12px; color: #666;">Note: Personal info like name/phone can only be detected if it's in the URL link you shared.</p>
        </div>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) console.log("Visit Email Error:", error);
      else console.log("Visit Alert Sent: " + info.response);
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Tracking Error:", error);
    res.status(500).json({ success: false });
  }
};

module.exports = { trackVisit };
