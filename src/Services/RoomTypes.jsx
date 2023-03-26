import { AxiosInstance } from "../Network/AxiosInstance";

import axios from "axios";
const BASE_URL = `https://reservation-system.sabeelan.com/reservation-system/api/en`;

export const getRoomTypes = async (token) => {
  const response = await axios.get(`${BASE_URL}/room-types`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (response !== undefined) if (response.status === 200) return response.data;
};

export const getRoomTypeById = async (id, token) => {
  const response = await axios.get(`${BASE_URL}/room-types/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (response !== undefined) if (response.status === 200) return response.data;
};

export const createRoomType = async (type, token) => {
  const response = await axios.post(`${BASE_URL}/room-types`, type, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (response !== undefined) if (response.status === 200) return response.data;
};

export const editRoomType = async (id, type, token) => {
  const response = await axios.put(`${BASE_URL}/room-types/${id}`, type, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (response !== undefined) if (response.status === 200) return response.data;
};
