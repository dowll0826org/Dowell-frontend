import axios from 'axios';

// Use environment variable if provided, otherwise default to local development backend
export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Create a reusable axios instance with the base URL
export const api = axios.create({
  baseURL: BASE_URL,
});
