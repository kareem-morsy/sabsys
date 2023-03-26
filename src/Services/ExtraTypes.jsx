import axios from "axios";
import { AxiosInstance } from "../Network/AxiosInstance";
const BASE_URL = `https://reservation-system.sabeelan.com/reservation-system/api/en`;
export const getExtraTypes = async (token) => {
  const response = await axios.get(`${BASE_URL}/extra-types`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (response !== undefined) if (response.status === 200) return response.data;
};

export const getExtraTypeById = async (id, token) => {
  const response = await axios.get(`${BASE_URL}/extra-types/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (response !== undefined) if (response.status === 200) return response.data;
};

export const createExtraType = async (type, token) => {
  const response = await axios.post(`${BASE_URL}/extra-types`, type, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (response !== undefined)
    if (response.status === 200) console.log(response);
  return response.data;
};

export const editExtraType = async (id, type, token) => {
  const response = await axios.put(`${BASE_URL}/extra-types/${id}`, type, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (response !== undefined) if (response.status === 200) return response.data;
};
