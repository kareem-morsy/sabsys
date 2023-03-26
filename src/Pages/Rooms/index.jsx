import React, { useState, useContext, useEffect } from "react";
import Table from "../../Components/TableComponent/Table";
import "../../assets/css/tables.css";
import JsPDF from "jspdf";
import PriceCalender from "../../Components/PriceCalender/PriceCalender";
import { ImEye } from "react-icons/im";
import { BsFillEyeFill } from "react-icons/bs";
import Switch from "react-switch";
import { editStatus } from "../../Services/State";
import useToken from "../../customHooks/useToken";
import FetchDataHook from "../../customHooks/fetchDataHook";
import FetchedTable from "../../Components/FetchedTable";
import { FaMoneyBillAlt } from "react-icons/fa";

function Rooms() {
  const [showNightPriceCalender, setShowNigtPriceCalender] = useState();
  const [refreshState, setRefreshState] = useState(null);
  const { permissions, token } = useToken();

  const handleNightPriceCalender = (isShown, data) => {
    console.log("room", data);
    setShowNigtPriceCalender({ isShown, data });
  };

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      width: "120px",
    },
    {
      name: "Hotel",
      selector: (row) => row?.hotel,
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) => row?.type,
      sortable: true,
    },
    {
      name: "View",
      selector: (row) => row?.view,
      sortable: true,
    },
    {
      name: "Stock",
      selector: (row) => row.stock,
      sortable: true,
    },
    {
      name: "Price",
      omit: !permissions?.find((permission) => permission == "nights-read"),
      cell: (room) => (
        <FaMoneyBillAlt
          size={30}
          className="text-success editDelete mx-2"
          onClick={() => handleNightPriceCalender(true, room)}
        />
      ),
      with: "10px",
    },
  ];

  const generatePDF = () => {
    const report = new JsPDF("portrait", "pt", "a1");
    report.html(document.querySelector("#rooms")).then(() => {
      report.save(`rooms.pdf`);
    });
  };
  return (
    <>
      <FetchedTable
        columns={columns}
        title="All Rooms"
        target="rooms"
        button="Create Room"
        permissions={permissions}
        role="rooms-create"
        generatePDF={generatePDF}
        edit="rooms"
        actions={false}
        navigateUrl="rooms"
      />

      {showNightPriceCalender?.isShown && (
        <PriceCalender
          room={showNightPriceCalender?.data}
          {...{ handleNightPriceCalender }}
        />
      )}
    </>
  );
}
export default Rooms;
