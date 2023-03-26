import axios from "axios";
import { AxiosInstance } from "../Network/AxiosInstance";
const BASE_URL = `https://reservation-system.sabeelan.com/reservation-system/api/en`;
export const getExtras = async (token) => {
  const response = await axios.get("extras");

  if (response !== undefined) if (response.status === 200) return response.data;
};

export const getExtraById = async (id, token) => {
  const response = await axios.get(`extras/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (response !== undefined) if (response.status === 200) return response.data;
};

export const createExtra = async (extra, token) => {
  const response = await axios.post(`extras`, extra, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (response !== undefined) if (response.status === 200) return response.data;
};

export const editExtra = async (id, extra, token) => {
  const response = await axios.put(`extras/${id}`, extra, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (response !== undefined) if (response.status === 200) return response.data;
};
