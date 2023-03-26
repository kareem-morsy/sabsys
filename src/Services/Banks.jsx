import axios from "axios";
import { AxiosInstance } from "../Network/AxiosInstance";
const BASE_URL = `https://reservation-system.sabeelan.com/reservation-system/api/en`;
export const getBanks = async (path, token) => {
  const response = await axios.get(`${BASE_URL}/${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  // console.log(response)
  if (response !== undefined) if (response.status === 200) return response.data;
};

export const getBankById = async (id, token) => {
  console.log("getBankByIdToken", token);
  const response = await axios.get(`${BASE_URL}/banks/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (response !== undefined) if (response.status === 200) return response.data;
};

export const createBank = async (bank, token) => {
  const response = await axios.post(`${BASE_URL}/banks`, bank, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (response !== undefined) if (response.status === 200) return response.data;
};

export const editBank = async (id, bank, token) => {
  const response = await axios.put(`${BASE_URL}/banks/${id}`, bank, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (response !== undefined) if (response.status === 200) return response.data;
};
