import { AxiosInstance } from "../Network/AxiosInstance";
import axios from "axios";
const BASE_URL = `https://reservation-system.sabeelan.com/reservation-system/api/en`;

export const getPaymentMethods = async (token) => {
  const response = await axios.get(`${BASE_URL}/payment-method`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (response !== undefined) if (response.status === 200) return response.data;
};
