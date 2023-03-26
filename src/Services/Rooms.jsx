import { AxiosInstance } from "../Network/AxiosInstance";
import axios from "axios";
const BASE_URL = `https://reservation-system.sabeelan.com/reservation-system/api/en`;

export const getRooms = async (token) => {
  const response = await axios.get(`${BASE_URL}/rooms`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (response !== undefined) if (response.status === 200) return response.data;
};

export const getRoomById = async (roomId, token) => {
  const response = await axios.get(`${BASE_URL}/rooms/${roomId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (response !== undefined)
    if (response.status === 200) {
      return response.data;
    }
};
export const PostRooms = async (roomsObj, token) => {
  const response = await axios.post(`${BASE_URL}/rooms`, roomsObj, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (response !== undefined)
    if (response.status === 200) {
      return response.data;
    }
};
