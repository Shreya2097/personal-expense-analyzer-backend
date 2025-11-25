# Personal Expense Analyzer 💸

A full-stack **personal expense analysis** app built with **Spring Boot + React**.  
Upload a CSV of your expenses and instantly see how you spend **by month** and **by category**.

> 🔐 This project is a personal learning/replacement for my stock market project (CMDA),  
> without using any company code or data.

---

## 🎥 Demo

![Expense Analyzer Demo](docs/expense-analyzer-demo.gif)

> The UI starts with a clean upload screen.  
> Once a CSV is uploaded, it unlocks a full analytics dashboard with charts and summaries.

---

## ✨ Features

- 📂 **CSV Upload**
  - Upload expenses with columns: `date, description, category, amount`
  - Server-side validation (date format, numeric amount, required fields)
  - Row-level error reporting

- 📊 **Analytics Dashboard**
  - **Monthly Spending bar chart** (designed with gradient & rounded bars)
  - **Category-wise spending pie chart**
  - Summary cards:
    - Total in selected range
    - Top 3 categories
    - Transaction count & average amount

- 🔍 **Filters**
  - Filter by **date range** (`startDate`, `endDate`)
  - Filter by **min/max amount**
  - Filters apply to:
    - Table
    - Monthly chart
    - Category chart
    - Summary cards

- 💻 **Tech Stack**
  - Backend: **Java Spring Boot**, Spring Data JPA, H2 / MySQL
  - Frontend: **React**, Axios, Recharts
  - Build tool: **Maven**


