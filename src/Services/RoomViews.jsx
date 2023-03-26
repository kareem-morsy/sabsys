import { AxiosInstance } from "../Network/AxiosInstance";

import axios from "axios";
const BASE_URL = `https://reservation-system.sabeelan.com/reservation-system/api/en`;

export const getRoomViews = async (token) => {
  const response = await axios.get(`${BASE_URL}/room-views`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (response !== undefined) if (response.status === 200) return response.data;
};

export const getRoomViewById = async (id, token) => {
  const response = await axios.get(`${BASE_URL}/room-views/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (response !== undefined) if (response.status === 200) return response.data;
};

export const createRoomView = async (view, token) => {
  const response = await axios.post(`${BASE_URL}/room-views`, view, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (response !== undefined) if (response.status === 200) return response.data;
};

export const editRoomView = async (id, view, token) => {
  const response = await axios.put(`${BASE_URL}/room-views/${id}`, view, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (response !== undefined) if (response.status === 200) return response.data;
};
