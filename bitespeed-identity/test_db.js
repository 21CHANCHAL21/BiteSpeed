const { Sequelize } = require("sequelize");
require("dotenv").config();

// Create a Sequelize instance
const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: "postgres",
  logging: false, // Disable logging
});

async function testDB() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully!");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  } finally {
    await sequelize.close();
  }
}

testDB();
