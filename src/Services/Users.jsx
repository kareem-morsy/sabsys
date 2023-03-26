import { AxiosInstance } from "../Network/AxiosInstance";

import axios from "axios";
const BASE_URL = `https://reservation-system.sabeelan.com/reservation-system/api/en`;

export const getUsers = async (token) => {
  const response = await axios.get(`${BASE_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (response !== undefined) if (response.status === 200) return response.data;
};

export const getUserById = async (id, token) => {
  const response = await axios.get(`${BASE_URL}/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (response !== undefined) if (response.status === 200) return response.data;
};

export const createUser = async (user, token) => {
  const response = await axios.post(`${BASE_URL}/users`, user, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (response !== undefined) if (response.status === 200) return response.data;
};

export const editUser = async (id, user, token) => {
  const response = await axios.put(`${BASE_URL}/users/${id}`, user, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (response !== undefined) if (response.status === 200) return response.data;
};
