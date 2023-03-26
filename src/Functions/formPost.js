import axios from "axios";

export const postForm = ({ baseUrl, id, funcName, object }) => {
  axios.post(`${baseUrl}/${funcName}`, object).then(() => {
    console.log("cities");
    navigate("/cities");
  });
};
