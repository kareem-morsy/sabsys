import axios from "axios";

const BASE_URL =
  "https://reservation-system.sabeelan.com/reservation-system/api/";
// alert("dfgdfgdf")
export const AxiosInstanceAuth = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
  },
});

