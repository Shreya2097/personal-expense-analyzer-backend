package com.example.demo.dto;

import java.util.ArrayList;
import java.util.List;

public class CsvUploadResponse {

    private int totalRows;
    private int successCount;
    private int failureCount;
    private List<String> errors = new ArrayList<>();

    public CsvUploadResponse() {
    }

    public CsvUploadResponse(int totalRows, int successCount, int failureCount, List<String> errors) {
        this.totalRows = totalRows;
        this.successCount = successCount;
        this.failureCount = failureCount;
        this.errors = errors;
    }

    public int getTotalRows() {
        return totalRows;
    }

    public void setTotalRows(int totalRows) {
        this.totalRows = totalRows;
    }

    public int getSuccessCount() {
        return successCount;
    }

    public void setSuccessCount(int successCount) {
        this.successCount = successCount;
    }

    public int getFailureCount() {
        return failureCount;
    }

    public void setFailureCount(int failureCount) {
        this.failureCount = failureCount;
    }

    public List<String> getErrors() {
        return errors;
    }

    public void setErrors(List<String> errors) {
        this.errors = errors;
    }

    public void addError(String error) {
        this.errors.add(error);
    }
}
