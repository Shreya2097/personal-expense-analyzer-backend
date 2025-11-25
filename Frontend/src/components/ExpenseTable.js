// src/components/ExpenseTable.js
import React from "react";

function ExpenseTable({ expenses }) {
  return (
    <div className="card">
      <h2>All Expenses</h2>
      <p className="muted">
        Total rows: <b>{expenses.length}</b>
      </p>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th className="amount-col">Amount</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No expenses yet. Upload a CSV to get started.
                </td>
              </tr>
            ) : (
              expenses.map((e) => (
                <tr key={e.id}>
                  <td>{e.date}</td>
                  <td>{e.description}</td>
                  <td>{e.category}</td>
                  <td className="amount-col">
                    ₹ {e.amount?.toFixed(2)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ExpenseTable;
