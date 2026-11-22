const app = require("../server");
const connectDB = require("../config/db");

let databaseConnection;

module.exports = async (req, res) => {
  try {
    if (!databaseConnection) {
      databaseConnection = connectDB().catch((error) => {
        databaseConnection = undefined;
        throw error;
      });
    }

    await databaseConnection;
    return app(req, res);
  } catch (error) {
    console.error("API database connection failed:", error);
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: "Database connection failed. Check the MONGODB_URI Vercel environment variable.",
      });
    }
  }
};
