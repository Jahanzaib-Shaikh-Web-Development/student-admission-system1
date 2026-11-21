const app = require("../server");
const connectDB = require("../config/db");

let databaseConnection;

module.exports = async (req, res) => {
  if (!databaseConnection) {
    databaseConnection = connectDB().catch((error) => {
      databaseConnection = undefined;
      throw error;
    });
  }

  await databaseConnection;
  return app(req, res);
};
