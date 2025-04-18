const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// ✅ Import transaction routes (Make sure this file exists)
const transactionRoutes = require("./routes/transactionRoutes");



dotenv.config();

const app = express(); 



// ✅ Enable CORS (Explicitly allow frontend requests)
const allowedOrigins = [
  'http://localhost:3000',
  'https://exptracker-beige.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json()); // ✅ Middleware to parse JSON

const PORT = process.env.PORT || 5000;

// ✅ Use Transaction Routes
app.use("/api/transactions", transactionRoutes);

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



// ✅ Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
