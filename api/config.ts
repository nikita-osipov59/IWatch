import axios from 'axios';

export const apiBase = axios.create({
  baseURL: 'https://api.poiskkino.dev/v1.4/',
  headers: { 'X-API-KEY': process.env.NEXT_PUBLIC_API_URL },
});

export const apiBaseOld = axios.create({
  baseURL: 'https://api.poiskkino.dev/v1/',
  headers: { 'X-API-KEY': process.env.NEXT_PUBLIC_API_URL },
});

export const apiBaseNewVersion = axios.create({
  baseURL: 'https://api.poiskkino.dev/v1.5/',
  headers: { 'X-API-KEY': process.env.NEXT_PUBLIC_API_URL },
});
