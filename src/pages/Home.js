
import { useEffect, useState } from "react";
import Header from "../components/Header";
import TransactionList from "../components/TransactionList";
import AddTransaction from "../components/AddTransaction";
import ExpenseChart from "../components/ExpenseChart";

console.log("ENV:", process.env.REACT_APP_API_URL);

const API_URL = import.meta.env.REACT_APP_API_URL || 'http://localhost:3000/api';
function Home() {
  const [transactions, setTransactions] = useState([]);

  console.log("API_URL:", API_URL);
  // ✅ Fetch transactions from backend
  useEffect(() => {
    fetch(`${API_URL}/transactions`)
      .then((res) => res.json())
      .then((data) => setTransactions(data))
      .catch((err) => console.error("Error fetching transactions:", err));
  }, []);

  // ✅ Add a transaction
  const addTransaction = async (transaction) => {
    const response = await fetch(`${API_URL}/transactions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transaction),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Backend error response:", text);
      throw new Error("Failed to add transaction");
    }

    const data = await response.json();
    setTransactions([...transactions, data]);
  };
   
    
  
  // ✅ Delete a transaction
  const deleteTransaction = async (id) => {
    await fetch(`${API_URL}/transactions/${id}`, { method: "DELETE" });
    setTransactions(transactions.filter((transaction) => transaction._id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <Header />
      <ExpenseChart transactions={transactions} />
      <TransactionList transactions={transactions} onDelete={deleteTransaction} />
      <AddTransaction onAdd={addTransaction} />
    </div>
  );
}

export default Home;
