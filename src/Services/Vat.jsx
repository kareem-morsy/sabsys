import { AxiosInstance } from "../Network/AxiosInstance";
// const BASE_URL = `https://reservation-system.sabeelan.com/reservation-system/api/en`;

export const editVat = async (page, id, vat) => {
  console.log("editVat");
  const response = await AxiosInstance.put(`${page}/vat/${id}/${vat}`);
  if (response !== undefined) if (response.status === 200) return response.data;
};
