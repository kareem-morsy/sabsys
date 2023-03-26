import React, { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { getBanks } from "../../../Services/Banks";
import Table from "../../../Components/TableComponent/Table";
import "../../../assets/css/tables.css";
import { Link, useNavigate } from "react-router-dom";
import Switch from "react-switch";
import { editStatus } from "../../../Services/State";
import { useAlert } from "react-alert";
import FetchDataHook from "../../../customHooks/fetchDataHook";
import useToken from "../../../customHooks/useToken";


function DownloadsCenter() {
  const navigate = useNavigate();
  const [perPage, setPerPage] = useState(10);
  const { items, totalRows, fetchData } = FetchDataHook();
  const [ERROR, setError] = useState();
  const [refreshState, setRefreshState] = useState(null);

  const { token } = useToken();
  useEffect(() => {
    if (token) {
      fetchData("exports-log", 1, perPage, token);
      console.log("items3333", items);
    }
  }, [perPage, refreshState]);
  const handlePageChange = (page) => {
    fetchData("exports-log", page, perPage, token);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setPerPage(newPerPage);
  };

  const handleChange = (id, state) => {
    editStatus("exports-log", id, state === true ? 0 : 1, token);
    setRefreshState(!refreshState);
  };
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      width: "100px",
    },
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Role",
      selector: (row) => row.user,
    },
    {
      name: "Time",
      selector: (row) => row.date,
      sortable: true,
    },

    {
      name: "Status",
      selector: (row) => row.status === 1 ? <a href={row.path} className="downloadBtn" download>Download</a> : row.status === 0 ? <p className="pendigText">Pending</p> : row.status === 2 ? <p className="expairedText">faild</p> : null
    },
  ]


  return (
    <div className="container table-head downloadPage">
      <h1>Download Center</h1>
      <Table
        isActive={false}
        columns={columns}
        data={items}
        filterBy="name"
        navigateLink={false}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handlePerRowsChange}
      />
    </div>
  );
};


export default DownloadsCenter