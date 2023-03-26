import { AxiosInstance } from "../Network/AxiosInstance";
import axios from "axios";
const BASE_URL = `https://reservation-system.sabeelan.com/reservation-system/api/en`;
export const getHotels = async () => {
  const response = await axios.get(`${BASE_URL}/hotels`);
  if (response !== undefined) if (response.status === 200) return response.data;
};

export const getHotelsList = async (token) => {
  const response = await axios.get(`${BASE_URL}/hotels/list`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (response !== undefined) if (response.status === 200) return response.data;
};

export const getHotelById = async (id, token) => {
  const response = await axios.get(`${BASE_URL}/hotels/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (response !== undefined) if (response.status === 200) return response.data;
};

export const getRoomMatrix = async (token) => {
  const response = await axios.get(`${BASE_URL}/hotels/create`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (response !== undefined) if (response.status === 200) return response.data;
};

export const createHotel = async (hotel, token) => {
  const response = await axios.post(`${BASE_URL}/hotels`, hotel, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (response !== undefined) if (response.status === 200) return response.data;
};

export const editHotel = async (id, hotel, token) => {
  const response = await axios.put(`${BASE_URL}/hotels/${id}`, hotel, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (response !== undefined) if (response.status === 200) return response.data;
};

export const editVat = async (id, vat, token) => {
  const response = await AxiosInstance.put(
    `${BASE_URL}/hotels/vat/${id}/${vat}`
  );
  if (response !== undefined) if (response.status === 200) return response.data;
};
