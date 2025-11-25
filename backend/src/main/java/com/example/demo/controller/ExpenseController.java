package com.example.demo.controller;

import com.example.demo.dto.CategoryExpenseSummaryDto;
import com.example.demo.dto.CsvUploadResponse;
import com.example.demo.dto.MonthlyExpenseSummaryDto;
import com.example.demo.model.Expense;
import com.example.demo.service.ExpenseService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "http://localhost:3000")
public class ExpenseController {

    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    // ✅ Get expenses with optional filters
    @GetMapping
    public List<Expense> getExpenses(
            @RequestParam(value = "startDate", required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(value = "endDate", required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            @RequestParam(value = "minAmount", required = false) Double minAmount,
            @RequestParam(value = "maxAmount", required = false) Double maxAmount
    ) {
        return expenseService.searchExpenses(startDate, endDate, minAmount, maxAmount);
    }

    // ✅ Upload CSV
    @PostMapping(
            value = "/upload",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<CsvUploadResponse> uploadExpensesCsv(
            @RequestParam("file") MultipartFile file
    ) {
        CsvUploadResponse response = expenseService.uploadCsv(file);
        return ResponseEntity.ok(response);
    }

    // ✅ Summary by month (date range filter)
    @GetMapping("/summary/monthly")
    public List<MonthlyExpenseSummaryDto> getMonthlySummary(
            @RequestParam(value = "startDate", required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(value = "endDate", required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate
    ) {
        return expenseService.getMonthlySummary(startDate, endDate);
    }

    // ✅ Summary by category (date range filter)
    @GetMapping("/summary/category")
    public List<CategoryExpenseSummaryDto> getCategorySummary(
            @RequestParam(value = "startDate", required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(value = "endDate", required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate
    ) {
        return expenseService.getCategorySummary(startDate, endDate);
    }
}
