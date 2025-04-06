const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");

// ✅ GET all transactions
router.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

// ✅ POST: Add a transaction
router.post("/", async (req, res) => {
  try {
    const { text, amount } = req.body;
    const newTransaction = new Transaction({ text, amount });
    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (err) {
    res.status(500).json({ error: "Error adding transaction" });
  }
});

// ✅ DELETE: Remove a transaction
router.delete("/:id", async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) return res.status(404).json({ error: "Transaction not found" });

    await transaction.deleteOne();
    res.json({ message: "Transaction deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
