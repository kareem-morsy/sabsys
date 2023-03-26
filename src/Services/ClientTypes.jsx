import axios from "axios";
import { AxiosInstance } from "../Network/AxiosInstance";
const BASE_URL = `https://reservation-system.sabeelan.com/reservation-system/api/en`;
export const getClientTypes = async (token) => {
  const response = await axios.get("client-types", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (response !== undefined) if (response.status === 200) return response.data;
};

export const getClientTypeById = async (id, token) => {
  const response = await axios.get(`client-types/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (response !== undefined) if (response.status === 200) return response.data;
};

export const createClientType = async (type, token) => {
  const response = await axios.post(`client-types`, type, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (response !== undefined) if (response.status === 200) return response.data;
};

export const editClientType = async (id, type, token) => {
  const response = await axios.put(`client-types/${id}`, type, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (response !== undefined) if (response.status === 200) return response.data;
};
