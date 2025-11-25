// src/api.js
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

function buildParams(filters = {}) {
  const params = {};
  if (filters.startDate) params.startDate = filters.startDate;
  if (filters.endDate) params.endDate = filters.endDate;
  if (filters.minAmount) params.minAmount = filters.minAmount;
  if (filters.maxAmount) params.maxAmount = filters.maxAmount;
  return params;
}

export async function uploadExpenses(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post(`${API_BASE_URL}/expenses/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}

export async function fetchExpenses(filters = {}) {
  const response = await axios.get(`${API_BASE_URL}/expenses`, {
    params: buildParams(filters),
  });
  return response.data;
}

export async function fetchMonthlySummary(filters = {}) {
  // monthly summary only uses date filters
  const params = {};
  if (filters.startDate) params.startDate = filters.startDate;
  if (filters.endDate) params.endDate = filters.endDate;

  const response = await axios.get(`${API_BASE_URL}/expenses/summary/monthly`, {
    params,
  });
  return response.data;
}

export async function fetchCategorySummary(filters = {}) {
  const params = {};
  if (filters.startDate) params.startDate = filters.startDate;
  if (filters.endDate) params.endDate = filters.endDate;

  const response = await axios.get(`${API_BASE_URL}/expenses/summary/category`, {
    params,
  });
  return response.data;
}
