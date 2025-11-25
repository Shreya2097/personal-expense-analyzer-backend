// src/components/SummaryCards.js
import React from "react";

function SummaryCards({ expenses, categorySummary, filters }) {
  const total = expenses.reduce((sum, e) => sum + (e.amount || 0), 0);

  const topCategories = categorySummary.slice(0, 3);

  const average =
    expenses.length > 0 ? total / expenses.length : 0;

  const isFiltered =
    filters.startDate || filters.endDate || filters.minAmount || filters.maxAmount;

  return (
    <div className="summary-grid">
      <div className="summary-card">
        <div className="summary-label">
          {isFiltered ? "Total in selected range" : "Total expenses"}
        </div>
        <div className="summary-value">
          ₹ {total.toFixed(2)}
        </div>
        {isFiltered && (
          <div className="summary-subtext">
            Filters applied.
          </div>
        )}
      </div>

      <div className="summary-card">
        <div className="summary-label">Top categories</div>
        {topCategories.length === 0 ? (
          <div className="summary-subtext">No data.</div>
        ) : (
          <ul className="summary-list">
            {topCategories.map((cat, idx) => (
              <li key={idx}>
                <span>{cat.category}</span>
                <span>₹ {cat.totalAmount.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="summary-card">
        <div className="summary-label">Transactions</div>
        <div className="summary-value">{expenses.length}</div>
        <div className="summary-subtext">
          Avg per transaction: ₹ {average.toFixed(2)}
        </div>
      </div>
    </div>
  );
}

export default SummaryCards;
