import { AxiosInstanceAuth } from "../Network/AxiosAuth";
export const userLogin = async (loginInfo) => {
  const response = await AxiosInstanceAuth.post("login", loginInfo);
  if (response !== undefined)
    if (response.status === 200) {
      console.log("response.data.data.token", response.data.data.token);
      sessionStorage.setItem("token", JSON.stringify(response.data.data.token));
      return response.data;
    }
};
