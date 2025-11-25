package com.example.demo.repository;

import com.example.demo.model.Expense;
import com.example.demo.dto.MonthlyExpenseSummaryProjection;
import com.example.demo.dto.CategoryExpenseSummaryProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    // ✅ Search with optional filters
    @Query("""
           select e from Expense e
           where (:startDate is null or e.date >= :startDate)
             and (:endDate is null or e.date <= :endDate)
             and (:minAmount is null or e.amount >= :minAmount)
             and (:maxAmount is null or e.amount <= :maxAmount)
           order by e.date asc
           """)
    List<Expense> search(
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate,
            @Param("minAmount") Double minAmount,
            @Param("maxAmount") Double maxAmount
    );

    // ✅ Monthly summary (optional date range)
    @Query("""
           select year(e.date) as year,
                  month(e.date) as month,
                  sum(e.amount) as totalAmount
           from Expense e
           where (:startDate is null or e.date >= :startDate)
             and (:endDate is null or e.date <= :endDate)
           group by year(e.date), month(e.date)
           order by year(e.date), month(e.date)
           """)
    List<MonthlyExpenseSummaryProjection> getMonthlySummary(
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate
    );

    // ✅ Category summary (optional date range)
    @Query("""
           select e.category as category,
                  sum(e.amount) as totalAmount
           from Expense e
           where (:startDate is null or e.date >= :startDate)
             and (:endDate is null or e.date <= :endDate)
           group by e.category
           order by totalAmount desc
           """)
    List<CategoryExpenseSummaryProjection> getCategorySummary(
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate
    );
}
