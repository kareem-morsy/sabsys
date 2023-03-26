import { AxiosInstance } from "../Network/AxiosInstance";
import axios from "axios";
const BASE_URL = `https://reservation-system.sabeelan.com/reservation-system/api/en`;

export const getRoles = async (token) => {
  const response = await axios.get(`${BASE_URL}/roles`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (response !== undefined) if (response.status === 200) return response.data;
};
export const getRoleById = async (id, token) => {
  const response = await axios.get(`${BASE_URL}/roles/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (response !== undefined) if (response.status === 200) return response.data;
};

export const createRole = async (role, token) => {
  const response = await axios.post(`${BASE_URL}/roles`, role, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (response !== undefined) if (response.status === 200) return response.data;
};

export const editRole = async (id, role, token) => {
  const response = await axios.put(`${BASE_URL}/roles/${id}`, role, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (response !== undefined) if (response.status === 200) return response.data;
};
