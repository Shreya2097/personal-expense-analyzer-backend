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
