package com.example.demo.dto;

public interface MonthlyExpenseSummaryProjection {

    Integer getYear();
    Integer getMonth();
    Double getTotalAmount();
}
