import axios from "axios";

// let lang = localStorage.getItem("userLanguage");
// if (!lang || lang === null) {
//   localStorage.setItem("userLanguage", "en");
//   lang = localStorage.getItem("userLanguage");
// }
// console.log(lang);

// const BASE_URL = `https://reservation-system.sabeelan.com/reservation-system/api/${
//   lang && lang !== "" ? lang : "en"
//   // "en"
// }`;
const BASE_URL = `https://reservation-system.sabeelan.com/reservation-system/api/en`;

const token = [];
console.log("axios", token);
if (JSON.parse(sessionStorage.getItem("token") == null)) {
  setTimeout(() => {
    token.push(JSON.parse(sessionStorage.getItem("token")));
  }, 3000);
}
console.log("axios2", token);
const tokenn = JSON.parse(sessionStorage.getItem("token"));
console.log("axiostokenn", tokenn);
export const AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${tokenn || token}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
