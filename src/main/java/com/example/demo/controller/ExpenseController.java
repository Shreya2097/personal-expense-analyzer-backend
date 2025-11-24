package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;

import com.example.demo.model.Expense;
import com.example.demo.service.ExpenseService;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "*") // later useful for React
public class ExpenseController {

    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    @PostMapping
    public Expense createExpense(@RequestBody Expense expense) {
        return expenseService.save(expense);
    }

    @GetMapping
    public List<Expense> getAllExpenses() {
        return expenseService.getAll();
    }
}
