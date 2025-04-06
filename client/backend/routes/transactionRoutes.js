const express = require("express");
const Transaction = require("../models/Transaction"); // Ensure this model exists

const router = express.Router();

// ✅ GET all transactions
router.get("/", async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

// ✅ POST a new transaction
router.post("/", async (req, res) => {
    try {
      const { text, amount, category, type } = req.body;
      const newTransaction = new Transaction({ text, amount, category, type });
      await newTransaction.save();
      res.status(201).json(newTransaction);
    } catch (err) {
      res.status(500).json({ error: "Error adding transaction" });
    }
  });
  
// ✅ DELETE a transaction
router.delete("/:id", async (req, res) => {
    try {
        await Transaction.findByIdAndDelete(req.params.id);
        res.json({ message: "Transaction deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
