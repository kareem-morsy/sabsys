import axios from "axios";
import { AxiosInstance } from "../Network/AxiosInstance";
const BASE_URL = `https://reservation-system.sabeelan.com/reservation-system/api/en`;
export const getClients = async (token) => {
  const response = await axios.get(`${BASE_URL}/clients`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (response !== undefined) if (response.status === 200) return response.data;
};

export const getClientById = async (id, token) => {
  const response = await axios.get(`${BASE_URL}/clients/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (response !== undefined) if (response.status === 200) return response.data;
};

export const createClient = async (client, token) => {
  const response = await axios.post(`${BASE_URL}/clients`, client, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (response !== undefined) if (response.status === 200) return response.data;
};

export const editClient = async (id, client, token) => {
  const response = await axios.put(`${BASE_URL}/clients/${id}`, client, {
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
    `${BASE_URL}/clients/vat/${id}/${vat}`
  );
  if (response !== undefined) if (response.status === 200) return response.data;
};

export const deleteAttachment = async (id, token) => {
  const response = await axios.delete(`${BASE_URL}/clients/attachments/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (response !== undefined) if (response.status === 200) return response.data;
};
