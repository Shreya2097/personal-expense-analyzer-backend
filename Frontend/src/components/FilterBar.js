// src/components/FilterBar.js
import React, { useState, useEffect } from "react";

function FilterBar({ initialFilters, onApply }) {
  const [startDate, setStartDate] = useState(initialFilters.startDate || "");
  const [endDate, setEndDate] = useState(initialFilters.endDate || "");
  const [minAmount, setMinAmount] = useState(initialFilters.minAmount || "");
  const [maxAmount, setMaxAmount] = useState(initialFilters.maxAmount || "");

  // keep UI in sync if parent resets filters
  useEffect(() => {
    setStartDate(initialFilters.startDate || "");
    setEndDate(initialFilters.endDate || "");
    setMinAmount(initialFilters.minAmount || "");
    setMaxAmount(initialFilters.maxAmount || "");
  }, [initialFilters]);

  const handleApply = (e) => {
    e.preventDefault();
    onApply({
      startDate: startDate || "",
      endDate: endDate || "",
      minAmount: minAmount || "",
      maxAmount: maxAmount || "",
    });
  };

  const handleClear = () => {
    setStartDate("");
    setEndDate("");
    setMinAmount("");
    setMaxAmount("");
    onApply({
      startDate: "",
      endDate: "",
      minAmount: "",
      maxAmount: "",
    });
  };

  return (
    <div className="card">
      <h2>Filters</h2>
      <form className="filter-form" onSubmit={handleApply}>
        <div className="filter-group">
          <label>
            Start date
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </label>
          <label>
            End date
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </label>
        </div>
        <div className="filter-group">
          <label>
            Min amount
            <input
              type="number"
              step="0.01"
              value={minAmount}
              onChange={(e) => setMinAmount(e.target.value)}
              placeholder="e.g. 100"
            />
          </label>
          <label>
            Max amount
            <input
              type="number"
              step="0.01"
              value={maxAmount}
              onChange={(e) => setMaxAmount(e.target.value)}
              placeholder="e.g. 2000"
            />
          </label>
        </div>
        <div className="filter-actions">
          <button type="submit">Apply</button>
          <button type="button" onClick={handleClear}>
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}

export default FilterBar;
