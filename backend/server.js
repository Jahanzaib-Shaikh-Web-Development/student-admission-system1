// require("dotenv").config();

// const express = require("express");
// const cors = require("cors");
// const helmet = require("helmet");
// const rateLimit = require("express-rate-limit");
// const connectDB = require("./config/db");

// const app = express();

// app.use(helmet());
// app.use(cors({
//   origin: process.env.FRONTEND_URL || "http://127.0.0.1:5500"
// }));
// app.use(express.json({ limit: "1mb" }));
// app.use(express.urlencoded({ extended: true }));
// app.use("/api/", rateLimit({ windowMs: 15 * 60 * 1000, limit: 200 }));

// app.get("/", (req, res) => {
//   res.json({ success: true, message: "Student Admission API is running!" });
// });

// app.use("/api/auth", require("./routes/authRoutes"));

// app.use((req, res) => {
//   res.status(404).json({ success: false, message: "API route not found." });
// });

// const PORT = process.env.PORT || 5000;

// const startServer = async () => {
//   await connectDB();
//   app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
// };

// startServer();




require("dotenv").config({ path: require("path").join(__dirname, ".env") });

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const connectDB = require("./config/db");

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://127.0.0.1:5500",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Body parsing
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

// API rate limiting
app.use(
  "/api/",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 200,
    standardHeaders: "draft-7",
    legacyHeaders: false,
  })
);

// API health check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Student Admission API is running!",
  });
});

// Authentication routes
app.use("/api/auth", require("./routes/authRoutes"));

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found.",
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error.",
  });
});

// Connect MongoDB before starting the server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

if (require.main === module) {
  startServer();
}

module.exports = app;
