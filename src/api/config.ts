import axios from "axios";

export const apiBase = axios.create({
  baseURL: "https://api.poiskkino.dev/v1.4/",
  headers: { "X-API-KEY": import.meta.env.VITE_API_KEY },
});

// P.S: API общедоступная.
