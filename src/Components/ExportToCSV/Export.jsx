import React, { useState } from "react";
// import FetchDataHook from "../../customHooks/fetchDataHook";
import axios from "axios";
import useToken from "../../customHooks/useToken";

import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Export.css";

const Export = (props) => {
  const [exportMsg, setExportMsg] = useState("Message");

  const { token } = useToken();
  const BASE_URL = `https://reservation-system.sabeelan.com/reservation-system/api/en`;

  const exportXlx = async () => {
    const response = await axios.get(
      `${BASE_URL}/${props.target}/export/excel?search=${props.filterText}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    if (response !== undefined) {
      if (response.status === 200) {
        toast(response?.data?.message, {
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          position: "top-center",
          // transition:{Slide}
        });
      }
    }
  };

  const convertArrayOfObjectsToCSV = (array) => {
    let result;

    const columnDelimiter = ",";
    const lineDelimiter = "\n";
    const keys = Object.keys(props.data[0]);

    result = "";
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    array.forEach((item) => {
      let ctr = 0;
      keys.forEach((key) => {
        if (ctr > 0) result += columnDelimiter;

        result += item[key];

        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  };
  const downloadCSV = (array) => {
    const link = document.createElement("a");
    let csv = convertArrayOfObjectsToCSV(array);
    if (csv == null) return;

    const filename = "export.csv";

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute("href", encodeURI(csv));
    link.setAttribute("download", filename);
    link.click();
  };

  return (
    <>
      <button className="btn bg-gold mx-2" onClick={exportXlx}>
        Export as XLX
      </button>
      <ToastContainer
        toastStyle={{
          marginTop: "4rem",
          width: "500px",
          height: "100px",
        }}
      />
    </>
  );
};

export default Export;
