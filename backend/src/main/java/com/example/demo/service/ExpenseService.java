package com.example.demo.service;

import com.example.demo.dto.*;
import com.example.demo.model.Expense;
import com.example.demo.repository.ExpenseRepository;
import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.Reader;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;

    public ExpenseService(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    // ✅ Get with filters
    public List<Expense> searchExpenses(LocalDate startDate,
                                        LocalDate endDate,
                                        Double minAmount,
                                        Double maxAmount) {
        return expenseRepository.search(startDate, endDate, minAmount, maxAmount);
    }

    /**
     * Upload + validate CSV and save valid rows.
     * Expected header: date,description,category,amount
     * Date format: ISO-8601 (yyyy-MM-dd)
     */
    public CsvUploadResponse uploadCsv(MultipartFile file) {
        CsvUploadResponse response = new CsvUploadResponse();
        List<String> errors = new ArrayList<>();
        int totalRows = 0;
        int success = 0;
        int failed = 0;

        if (file.isEmpty()) {
            response.addError("File is empty");
            return response;
        }

        try (Reader reader = new BufferedReader(
                new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8))) {

            CSVReader csvReader = new CSVReaderBuilder(reader)
                    .withSkipLines(1)  // skip header
                    .build();

            String[] row;
            int rowNumber = 1; // actual row number in file (including header)

            List<Expense> toSave = new ArrayList<>();

            while ((row = csvReader.readNext()) != null) {
                rowNumber++;
                totalRows++;

                if (row.length < 4) {
                    failed++;
                    errors.add("Row " + rowNumber + ": expected 4 columns, got " + row.length);
                    continue;
                }

                String dateStr = row[0].trim();
                String description = row[1].trim();
                String category = row[2].trim();
                String amountStr = row[3].trim();

                LocalDate date;
                double amount;

                try {
                    date = LocalDate.parse(dateStr); // yyyy-MM-dd
                } catch (DateTimeParseException e) {
                    failed++;
                    errors.add("Row " + rowNumber + ": invalid date '" + dateStr + "'");
                    continue;
                }

                try {
                    amount = Double.parseDouble(amountStr);
                } catch (NumberFormatException e) {
                    failed++;
                    errors.add("Row " + rowNumber + ": invalid amount '" + amountStr + "'");
                    continue;
                }

                if (description.isEmpty()) {
                    failed++;
                    errors.add("Row " + rowNumber + ": description is empty");
                    continue;
                }

                if (category.isEmpty()) {
                    failed++;
                    errors.add("Row " + rowNumber + ": category is empty");
                    continue;
                }

                Expense expense = new Expense();
                expense.setDate(date);
                expense.setDescription(description);
                expense.setCategory(category);
                expense.setAmount(amount);

                toSave.add(expense);
                success++;
            }

            if (!toSave.isEmpty()) {
                expenseRepository.saveAll(toSave);
            }

        } catch (Exception e) {
            errors.add("Failed to read CSV: " + e.getMessage());
        }

        response.setTotalRows(totalRows);
        response.setSuccessCount(success);
        response.setFailureCount(failed);
        response.setErrors(errors);

        return response;
    }

    public List<MonthlyExpenseSummaryDto> getMonthlySummary(LocalDate startDate, LocalDate endDate) {
        List<MonthlyExpenseSummaryProjection> projections =
                expenseRepository.getMonthlySummary(startDate, endDate);

        List<MonthlyExpenseSummaryDto> result = new ArrayList<>();
        for (MonthlyExpenseSummaryProjection p : projections) {
            result.add(new MonthlyExpenseSummaryDto(
                    p.getYear(),
                    p.getMonth(),
                    p.getTotalAmount() != null ? p.getTotalAmount() : 0.0
            ));
        }
        return result;
    }

    public List<CategoryExpenseSummaryDto> getCategorySummary(LocalDate startDate, LocalDate endDate) {
        List<CategoryExpenseSummaryProjection> projections =
                expenseRepository.getCategorySummary(startDate, endDate);

        List<CategoryExpenseSummaryDto> result = new ArrayList<>();
        for (CategoryExpenseSummaryProjection p : projections) {
            result.add(new CategoryExpenseSummaryDto(
                    p.getCategory(),
                    p.getTotalAmount() != null ? p.getTotalAmount() : 0.0
            ));
        }
        return result;
    }
}
