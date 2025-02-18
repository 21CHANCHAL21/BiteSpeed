const express = require("express");
const bodyParser = require("body-parser");
const { Sequelize } = require("sequelize");  // Import Sequelize correctly
const sequelize = require("./config/database");
const Contact = require("./models/Contact");
require("dotenv").config();

// Initialize express app
const app = express();
app.use(bodyParser.json());

// Define the /identify endpoint
app.post("/identify", async (req, res) => {
  const { email, phoneNumber } = req.body;

  if (!email && !phoneNumber) {
    return res
      .status(400)
      .json({ error: "At least one contact detail is required" });
  }

  try {
    console.log("Request Body:", req.body);  // Debugging request body

    let existingContacts = await Contact.findAll({
      where: {
        [Sequelize.Op.or]: [{ email }, { phoneNumber }],
      },
    });

    let primaryContact;
    let secondaryContacts = [];

    if (existingContacts.length > 0) {
      // Find the primary contact
      primaryContact =
        existingContacts.find((c) => c.linkPrecedence === "primary") ||
        existingContacts[0];

      // Ensure primary contact is the oldest
      existingContacts.forEach((contact) => {
        if (contact.createdAt < primaryContact.createdAt) {
          primaryContact = contact;
        }
      });

      // Update secondary contacts
      secondaryContacts = existingContacts
        .filter((c) => c.id !== primaryContact.id)
        .map((c) => c.id);

      // If new email or phone is different, create a new secondary contact
      if (
        !existingContacts.some(
          (c) => c.email === email && c.phoneNumber === phoneNumber
        )
      ) {
        const newContact = await Contact.create({
          phoneNumber,
          email,
          linkedId: primaryContact.id,
          linkPrecedence: "secondary",
        });
        secondaryContacts.push(newContact.id);
      }
    } else {
      // Create a new primary contact if none exists
      primaryContact = await Contact.create({
        phoneNumber,
        email,
        linkPrecedence: "primary",
      });
    }

    // Return response
    res.json({
      contact: {
        primaryContactId: primaryContact.id,
        emails: [
          primaryContact.email,
          ...existingContacts
            .filter((c) => c.email && c.id !== primaryContact.id)
            .map((c) => c.email),
        ].filter(Boolean),
        phoneNumbers: [
          primaryContact.phoneNumber,
          ...existingContacts
            .filter((c) => c.phoneNumber && c.id !== primaryContact.id)
            .map((c) => c.phoneNumber),
        ].filter(Boolean),
        secondaryContactIds: secondaryContacts,
      },
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Sync database and start server
sequelize.sync().then(() => {
  app.listen(3000, () => console.log("Server running on port 3000"));
});
