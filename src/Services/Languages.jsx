import { AxiosInstance } from "../Network/AxiosInstance";
import axios from "axios";
const BASE_URL = `https://reservation-system.sabeelan.com/reservation-system/api/en`;

export const getLanguages = async (token) => {
  console.log("getLanguagesToken", token);
  const response = await axios.get(`${BASE_URL}/languages`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (response !== undefined) if (response.status === 200) return response.data;
};

export const getLangById = async (id, token) => {
  const response = await axios.get(`${BASE_URL}/languages/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (response !== undefined) if (response.status === 200) return response.data;
};
