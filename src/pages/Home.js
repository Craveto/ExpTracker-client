import { useEffect, useState } from "react";
import Header from "../components/Header";
import TransactionList from "../components/TransactionList";
import AddTransaction from "../components/AddTransaction";
import ExpenseChart from "../components/ExpenseChart";

function Home() {
  const [transactions, setTransactions] = useState([]);

  // ✅ Fetch transactions from backend
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/transactions`)
      .then((res) => res.json())
      .then((data) => setTransactions(data))
      .catch((err) => console.error("Error fetching transactions:", err));
  }, []);

  // ✅ Add a transaction
  const addTransaction = async (transaction) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/transactions`, {
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
    await fetch(`${import.meta.env.VITE_API_URL}/transactions/${id}`, { method: "DELETE" });
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
