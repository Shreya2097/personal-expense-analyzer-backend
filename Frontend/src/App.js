// src/App.js
import React, { useState } from "react";
import "./index.css";
import {
  uploadExpenses,
  fetchExpenses,
  fetchMonthlySummary,
  fetchCategorySummary,
} from "./api";
import UploadForm from "./components/UploadForm";
import ExpenseTable from "./components/ExpenseTable";
import MonthlyBarChart from "./components/MonthlyBarChart";
import CategoryPieChart from "./components/CategoryPieChart";
import FilterBar from "./components/FilterBar";
import SummaryCards from "./components/SummaryCards";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [monthlySummary, setMonthlySummary] = useState([]);
  const [categorySummary, setCategorySummary] = useState([]);
  const [loading, setLoading] = useState(false);

  const [hasData, setHasData] = useState(false);

  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    minAmount: "",
    maxAmount: "",
  });

  // Only scenario now (visual mood)
  const [scenario, setScenario] = useState("personal"); // "personal" | "travel"

  const loadAllData = async (currentFilters) => {
    setLoading(true);
    try {
      const [exp, monthly, category] = await Promise.all([
        fetchExpenses(currentFilters),
        fetchMonthlySummary(currentFilters),
        fetchCategorySummary(currentFilters),
      ]);

      setExpenses(exp);
      setMonthlySummary(monthly);
      setCategorySummary(category);
    } catch (err) {
      console.error("Failed to load data", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (file) => {
    const result = await uploadExpenses(file);

    if (result && result.successCount > 0) {
      await loadAllData(filters);
      setHasData(true);
    }
    return result;
  };

  const handleApplyFilters = async (newFilters) => {
    setFilters(newFilters);
    if (hasData) {
      await loadAllData(newFilters);
    }
  };

  const appClassName = `app app-dark app-scenario-${scenario} ${
    hasData ? "app-dashboard" : "app-landing"
  }`;

  const scenarioTagline =
    scenario === "travel"
      ? "Perfect when you want to see where your trip money really went."
      : "Built to make day-to-day spending feel clear and under control.";

  return (
    <div className={appClassName}>
      {/* Mood bar at top */}
      <div className="mood-bar">
        <div className="mood-left">
          <span className="mood-logo">₹</span>
          <span className="mood-title">Expense Studio</span>
          <span className="mood-dot" />
          <span className="mood-tagline">{scenarioTagline}</span>
        </div>
        <div className="mood-right">
          <div className="scenario-switch">
            <button
              type="button"
              className={`scenario-btn ${
                scenario === "personal" ? "scenario-btn-active" : ""
              }`}
              onClick={() => setScenario("personal")}
            >
              Personal
            </button>
            <button
              type="button"
              className={`scenario-btn ${
                scenario === "travel" ? "scenario-btn-active" : ""
              }`}
              onClick={() => setScenario("travel")}
            >
              Travel
            </button>
          </div>
          
        </div>
      </div>

      {!hasData ? (
        // ========== LANDING VIEW ==========
        <main className="landing-main">
          <div className="landing-left">
            <div className="landing-badge">New • Personal Project</div>
            <h1 className="landing-title">
              Understand your <span>money story</span> in seconds.
            </h1>
            <p className="landing-subtitle">
              Drop your expenses CSV and instantly see how you{" "}
              <strong>spend by month and category</strong>. No signup. No
              complexity. Just clean insights.
            </p>

            <UploadForm onUploadSuccess={handleUpload} mode="landing" />

            <p className="landing-hint">
              Expected columns:{" "}
              <code>date, description, category, amount</code>{" "}
              (<span>yyyy-MM-dd</span>).
            </p>
          </div>

          <div className="landing-right">
            <div className="landing-card-visual">
              <div className="gradient-orb orb-1" />
              <div className="gradient-orb orb-2" />
              <div className="fake-chart fake-chart-1">
                <div className="fake-chart-header">
                  <span className="dot dot-red" />
                  <span className="dot dot-yellow" />
                  <span className="dot dot-green" />
                </div>
                <div className="fake-bars">
                  <div className="bar bar-1" />
                  <div className="bar bar-2" />
                  <div className="bar bar-3" />
                  <div className="bar bar-4" />
                </div>
              </div>

              <div className="fake-card-summary">
                <div className="fake-label">This month spend</div>
                <div className="fake-value">₹ 24,580</div>
                <div className="fake-pill">
                  {scenario === "travel"
                    ? "Top: Hotels • Flights"
                    : "Top: Food • Travel"}
                </div>
              </div>
            </div>
          </div>
        </main>
      ) : (
        // ========== DASHBOARD VIEW ==========
        <>
          <header className="app-header app-header-dashboard">
            <div>
              <h1>Personal Expense Analyzer</h1>
              <p className="muted">
                Filter by date and amount to explore your spending patterns.
              </p>
            </div>
            <div className="header-upload-wrapper">
              <UploadForm onUploadSuccess={handleUpload} mode="inline" />
            </div>
          </header>

          <main>
            <FilterBar initialFilters={filters} onApply={handleApplyFilters} />

            {loading && <p className="status">Refreshing insights...</p>}

            <SummaryCards
              expenses={expenses}
              categorySummary={categorySummary}
              filters={filters}
            />

            <section className="grid-2">
              <MonthlyBarChart data={monthlySummary} />
              <CategoryPieChart data={categorySummary} />
            </section>

            <ExpenseTable expenses={expenses} />
          </main>

          <footer className="app-footer">
            <span>Built with Spring Boot + React • Personal project</span>
          </footer>
        </>
      )}
    </div>
  );
}

export default App;
