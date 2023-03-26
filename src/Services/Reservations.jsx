import { AxiosInstance } from "../Network/AxiosInstance";
import axios from "axios";
const BASE_URL = `https://reservation-system.sabeelan.com/reservation-system/api/en`;

export const getReservations = async (id, token) => {
  const response = await axios.get(`${BASE_URL}/reservations`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (response !== undefined) if (response.status === 200) return response.data;
};
export const getReservationById = async (reservationId, token) => {
  const response = await axios.get(
    `${BASE_URL}/reservations/${reservationId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  if (response !== undefined) if (response.status === 200) return response.data;
};

export const postReservation = async (reservationObj, token) => {
  const response = await axios.post(
    `${BASE_URL}/reservations`,
    reservationObj,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  if (response !== undefined) if (response.status === 200) return response.data;
};

export const updateReservation = async (reservationId, postedObject, token) => {
  const response = await axios.put(
    `${BASE_URL}/reservations/${reservationId}`,
    postedObject,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  if (response !== undefined) if (response.status === 200) return response.data;
};
