import { useState } from "react";

function AddTransaction({ onAdd }) {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (type) => {
    if (!text || !amount || !category) return;

    const newTransaction = {
      text,
      amount: parseFloat(amount),
      category,
      type,
    };

    onAdd(newTransaction);
    setText("");
    setAmount("");
    setCategory("");
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-3">Add Transaction</h2>
      <div className="space-y-3">
        <input
          type="text"
          placeholder="Transaction Name"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Amount (₹)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Category</option>
          <option value="Groceries">Groceries</option>
          <option value="Rent">Rent</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Travel">Travel</option>
          <option value="Bills">Bills</option>
        </select>

        <div className="flex gap-2">
          <button
            onClick={() => handleSubmit("income")}
            className="w-full bg-green-500 text-white p-2 rounded"
          >
            Cash In
          </button>
          <button
            onClick={() => handleSubmit("expense")}
            className="w-full bg-red-500 text-white p-2 rounded"
          >
            Cash Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddTransaction;
