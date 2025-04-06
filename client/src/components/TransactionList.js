function TransactionList({ transactions, onDelete }) {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md mt-4 max-h-60 overflow-y-auto">
      <h2 className="text-lg font-semibold text-gray-700">Transactions</h2>
      <ul className="mt-2">
        {transactions.map((tx) => (
          <div key={tx._id} className="flex items-center justify-between p-3 mb-2 bg-white rounded shadow">
            <div>
              <p className="font-medium">{tx.text} ({new Date(tx.createdAt).toLocaleDateString()})</p>
            </div>
            <div className="flex items-center gap-3">
              <p className={`font-semibold ${tx.type === "expense" ? "text-red-500" : "text-green-600"}`}>
                ₹{Math.abs(tx.amount)}
              </p>
              <button onClick={() => onDelete(tx._id)} className="bg-red-500 text-white px-2 py-1 rounded">
                ❌
              </button>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default TransactionList;
