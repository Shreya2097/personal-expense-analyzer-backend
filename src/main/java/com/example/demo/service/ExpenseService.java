package com.example.demo.service;

import org.springframework.stereotype.Service;

import com.example.demo.model.Expense;
import com.example.demo.repository.ExpenseRepository;

import java.util.List;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;

    public ExpenseService(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    public Expense save(Expense expense) {
        return expenseRepository.save(expense);
    }

    public List<Expense> getAll() {
        return expenseRepository.findAll();
    }
}
