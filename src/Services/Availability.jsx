import axios from "axios";
import { AxiosInstance } from "../Network/AxiosInstance";
const BASE_URL = `https://reservation-system.sabeelan.com/reservation-system/api/en`;

// export const getAvailability = async (params, token) => {
//   let config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//       Accept: "application/json",
//     },
//     params,
//   };
//   // const response = await AxiosInstance.get('availability', { params: { answer: 42 } });
//   console.log("avalibalityToken", token);
//   const response = await axios.get(`${BASE_URL}/availability`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//       Accept: "application/json",
//     },
//     params,
//   });
//   if (response !== undefined) if (response.status === 200) return response.data;
// };
// import { AxiosInstance } from "../Network/AxiosInstance";

export const getAvailability = async (params) => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  // console.log("AvalibalityToken", token);
  // const response = await AxiosInstance.get('availability', { params: { answer: 42 } });
  const response = await fetch(
    `${BASE_URL}/availability?` + new URLSearchParams(params),
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
