import axios from "axios";

const BASE_URL = `https://reservation-system.sabeelan.com/reservation-system/api`;

function headerOptions(options) {
  const header = { ...options };
  const token = JSON.parse(sessionStorage.getItem("token"));
  // console.log("AvalibalityToken", token);
  header.headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    Accept: "application/json",
    // ...header.headers,
  };
  return header;
}

export async function loginFetcher(url, obj) {
  const response = await fetch(`${BASE_URL}/${url}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obj),
  });
  const loginData = await response.json();
  return loginData;
}
// [GET] Request
async function fetcher(url, params, options) {
  const response = await fetch(
    `${BASE_URL}/en/${url}` + new URLSearchParams(params),
    headerOptions(options)
  );
  const data = await response.json();
  // console.log("datadata", data);
  return data;
}

// [POST] Request
export async function postFetcher(url, obj, formData) {
  const token = JSON.parse(sessionStorage.getItem("token"));

  const response = formData
    ? await axios.post(`${BASE_URL}/en/${url}`, obj, {
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "multipart/form-data",
          Accept: "application/json",
        },
      })
    : await fetch(`${BASE_URL}/en/${url}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(obj),
      });
  return response;
}
export async function putFetcher(url, obj) {
  const token = JSON.parse(sessionStorage.getItem("token"));

  const response = await fetch(`${BASE_URL}/en/${url}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(obj),
  });
  const postData = await response.json();
  return postData;
}

export async function deleteFetcher(url) {
  const token = JSON.parse(sessionStorage.getItem("token"));

  const response = await axios.delete(`${BASE_URL}/en/${url}`, {
    // method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      //   "content-type": "application/json",
      Accept: "application/json",
    },
    // body: JSON.stringify(obj),
  });
  const postData = await response.json();
  return postData;
}
// export async function postData(url, obj) {

//     const sendData = async (data) => {
//         const response = await fetch(
//           "https://reservation-system.sabeelan.com/reservation-system/api/login",
//           {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(data),
//           }
//         );
//         const loginData = await response.json();
//         console.log("response", response);
//         console.log("loginData", loginData);
//         setToken(loginData);
//       };
//     const response = await fetch(`${BASE_URL}/${url}` + new URLSearchParams(params), headerOptions(options));
//     const data = await response.json();
//     console.log("datadata", data)
//     return data
// }

export default fetcher;
