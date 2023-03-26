import { AxiosInstance } from "../Network/AxiosInstance";

import axios from "axios";
const BASE_URL = `https://reservation-system.sabeelan.com/reservation-system/api/en`;

export const getPermissions = async (token) => {
  const response = await axios.get(`${BASE_URL}/permissions`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (response !== undefined) if (response.status === 200) return response.data;
};
