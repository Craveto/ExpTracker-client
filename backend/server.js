const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// ✅ Import transaction routes (Make sure this file exists)
const transactionRoutes = require("./routes/transactionRoutes");

dotenv.config();

const app = express();

// ✅ Enable CORS (Explicitly allow frontend requests)
app.use(cors({
  origin: "http://localhost:3000", // Allow frontend
  methods: ["GET", "POST", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json()); // ✅ Middleware to parse JSON

const PORT = process.env.PORT || 5000;

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Debugging Middleware (Logs each request)
app.use((req, res, next) => {
  console.log(`➡️ [${req.method}] ${req.url} - ${JSON.stringify(req.body)}`);
  next();
});

// ✅ Use Transaction Routes
app.use("/api/transactions", transactionRoutes);

// ✅ Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
