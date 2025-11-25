# 💸 Personal Expense Analyzer

## Overview
Personal Expense Analyzer is a full-stack web application designed to simplify the process of understanding and analyzing individual spending habits.  
Users can upload a CSV file containing their expense records and instantly view a detailed visual breakdown of their monthly and category-wise spending.

The system processes uploaded transactions, validates the data, stores them, and presents analytics through an interactive dashboard.

---

## ✨ Features

### 📂 CSV Upload & Validation
- Upload expenses in CSV format  
- Required columns: `date`, `description`, `category`, `amount`  
- Validates:
  - Empty or missing fields  
  - Incorrect date formats (`yyyy-MM-dd`)  
  - Non-numeric amount values  

---

### 📊 Dashboard & Analytics
- **Monthly Spending Bar Chart**
- **Category-Wise Pie Chart**
- **Summary Cards** showing:
  - Total expenses  
  - Number of transactions  
  - Average expense  
  - Top spending categories  

---

### 🔍 Filters
Users can apply filters to refine analysis:

- Start Date / End Date  
- Minimum Amount / Maximum Amount  

Filters update:
- Charts  
- Summary cards  
- Transaction table  

---

### 📋 Expense Table
A detailed transaction table displaying:
- Date  
- Description  
- Category  
- Amount  

The table updates dynamically based on filters.

---

## 🏗️ Tech Stack

### Backend
- Java 17  
- Spring Boot  
- Spring Web (REST APIs)  
- Spring Data JPA  
- H2 Database (development)  
- MySQL (optional)  
- Maven  

### Frontend
- React  
- Axios  
- Recharts  
- Custom CSS (Dark UI theme)  

---

📌 Conclusion

Personal Expense Analyzer provides a complete solution for uploading, processing, and analyzing expense data through intuitive visualizations and structured information.
It delivers a seamless experience from data ingestion to analytics-driven insights, supported by a modern full-stack architecture.
