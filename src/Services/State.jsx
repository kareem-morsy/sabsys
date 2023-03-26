import { AxiosInstance } from "../Network/AxiosInstance";
// const BASE_URL = `https://reservation-system.sabeelan.com/reservation-system/api/en`;

export const editStatus = async (page, id, state) => {
  console.log("editStatus");
  const response = await AxiosInstance.put(
    `${page}/change-status/${id}/${state}`
  );
  if (response !== undefined) if (response.status === 200) return response.data;
};
