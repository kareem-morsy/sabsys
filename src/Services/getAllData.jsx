import axios from "axios";
import { AxiosInstance } from "../Network/AxiosInstance";
const BASE_URL = `https://reservation-system.sabeelan.com/reservation-system/api/en`;
export const getAllData = async (path, token) => {
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

export const getDataById = async (path, id, token) => {
  const response = await axios.get(`${BASE_URL}/${path}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (response !== undefined) if (response.status === 200) return response.data;
};

export const createData = async (path, obj, token) => {
  const response = await axios.post(`${BASE_URL}/${path}`, obj, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (response !== undefined) if (response.status === 200) return response.data;
};

export const editData = async (path, id, obj, token) => {
  const response = await axios.put(`${BASE_URL}/${path}/${id}`, obj, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (response !== undefined) if (response.status === 200) return response.data;
};
