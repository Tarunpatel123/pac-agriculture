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

const getBrowserInfo = (ua) => {
  let browser = "Unknown";
  if (ua.includes("Chrome")) browser = "Google Chrome";
  else if (ua.includes("Firefox")) browser = "Mozilla Firefox";
  else if (ua.includes("Safari") && !ua.includes("Chrome")) browser = "Apple Safari";
  else if (ua.includes("Edge")) browser = "Microsoft Edge";
  else if (ua.includes("Opera") || ua.includes("OPR")) browser = "Opera";
  
  let os = "Unknown";
  if (ua.includes("Windows")) os = "Windows";
  else if (ua.includes("Android")) os = "Android";
  else if (ua.includes("iPhone") || ua.includes("iPad")) os = "iOS";
  else if (ua.includes("Macintosh")) os = "MacOS";
  else if (ua.includes("Linux")) os = "Linux";
  
  return { browser, os };
};

const trackVisit = async (req, res) => {
  try {
    const { urlParams = {}, pagePath, extraInfo = {} } = req.body;

    // Skip tracking for Admin Portal visits
    if (pagePath === '/admin-pac-portal') {
      return res.status(200).json({ success: true, message: "Admin visit skipped" });
    }

    const userAgent = req.headers['user-agent'] || 'Unknown';
    const { browser, os } = getBrowserInfo(userAgent);
    const referrer = req.headers['referer'] || req.headers['referrer'] || 'Direct';
    
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
    let mapUrl = "";
    let ispInfo = "Unknown";
    let geoData = { city: 'Local', regionName: 'Unknown', country: 'Unknown' };

    // For testing locally, if IP is local, use a dummy real IP to show data
    let fetchIp = ip;
    if (fetchIp === '127.0.0.1' || fetchIp === '::1') {
      fetchIp = '27.7.0.1'; // Example Indore/MP IP for local testing visualization
    }

    try {
      console.log(`Fetching Geo info for IP: ${fetchIp}`);
      const geoResponse = await axios.get(`http://ip-api.com/json/${fetchIp}?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,query`);
      console.log("Geo Response Data:", geoResponse.data);
      
      if (geoResponse.data.status === 'success') {
        geoData = geoResponse.data;
        const { city, regionName, country, lat, lon, isp } = geoResponse.data;
        locationInfo = `${city}, ${regionName}, ${country}`;
        ispInfo = isp;
        const dist = calculateDistance(BARWAHA_LAT, BARWAHA_LON, lat, lon);
        distanceInfo = `${dist} KM`;
        mapUrl = `https://www.google.com/maps?q=${lat},${lon}`;
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
      isp: ispInfo,
      browser,
      os,
      screenResolution: extraInfo.screenResolution || "Unknown",
      language: extraInfo.language || "Unknown",
      mapUrl,
      userAgent,
      deviceType,
      pagePath: pagePath || '/',
      referrer,
      platform: (urlParams && urlParams.platform) || 'Direct',
      metadata: JSON.stringify(urlParams || {})
    });

    // Send response back to frontend
    const responseData = { 
      success: true, 
      distance: distanceInfo,
      location: locationInfo 
    };

    res.status(200).json(responseData);
  } catch (error) {
    console.error("Tracking Error:", error);
    res.status(500).json({ success: false });
  }
};

module.exports = { trackVisit };
