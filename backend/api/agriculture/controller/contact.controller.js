const Contact = require("../models/contact");

const submitContact = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newContact = new Contact({
            name,
            email,
            subject,
            message
        });

        await newContact.save();
        res.status(201).json({ message: "Contact message sent successfully" });
    } catch (error) {
        console.error("Contact Submit Error:", error);
        res.status(500).json({ error: "Failed to send message" });
    }
};

const deleteContact = async (req, res) => {
    try {
        const secretKey = req.headers['x-admin-secret'];
        if (secretKey !== process.env.ADMIN_SECRET_KEY) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        await Contact.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Contact message deleted" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete contact" });
    }
};

module.exports = { submitContact, deleteContact };
