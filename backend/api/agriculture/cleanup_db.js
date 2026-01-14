const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables
dotenv.config({ path: path.join(__dirname, ".env") });

const User = require("./models/user");
const Visit = require("./models/visit");
const Share = require("./models/share");
const Contact = require("./models/contact");

const cleanup = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected successfully.");

    console.log("Cleaning up collections...");
    
    const userResult = await User.deleteMany({});
    console.log(`Deleted ${userResult.deletedCount} users (Enrollments).`);

    const visitResult = await Visit.deleteMany({});
    console.log(`Deleted ${visitResult.deletedCount} visits.`);

    const shareResult = await Share.deleteMany({});
    console.log(`Deleted ${shareResult.deletedCount} shares.`);

    const contactResult = await Contact.deleteMany({});
    console.log(`Deleted ${contactResult.deletedCount} contacts.`);

    console.log("\nDatabase is now CLEAN! ✨");
    process.exit(0);
  } catch (error) {
    console.error("Cleanup Error:", error);
    process.exit(1);
  }
};

cleanup();
