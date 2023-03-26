// import RequestContext from "../../../Context/RequestContext";
// import { useAlert } from "react-alert";
// import { getCountries } from "../../../Services/Countries";
import React, { useContext, useState, useEffect } from "react";
import Table from "../../../Components/TableComponent/Table";
import "../../../assets/css/tables.css";
import { useNavigate } from "react-router-dom";
import Switch from "react-switch";
import { editStatus } from "../../../Services/State";
import useToken from "../../../customHooks/useToken";
import FetchDataHook from "../../../customHooks/fetchDataHook";

const Countries = () => {
  const [perPage, setPerPage] = useState(10);
  const { items, totalRows, fetchData } = FetchDataHook();
  // const { Countries, Refresh } = useContext(RequestContext);
  const [Countries, setCountries] = useState([]);
  const [ERROR, setError] = useState();
  const [refreshState, setRefreshState] = useState(null);

  const Refresh = (state) => {
    setRefreshState(state);
  };
  useEffect(() => {
    fetchData("cities", 1, perPage);
  }, [perPage, refreshState]);
  const handlePageChange = (page) => {
    fetchData("cities", page, perPage);
  };
  const handlePerRowsChange = async (newPerPage, page) => {
    setPerPage(newPerPage);
  };
  const { permissions, token } = useToken();
  const navigate = useNavigate();

  const handleChange = (id, state) => {
    console.log("state", state);
    editStatus("cities", id, state === true ? 0 : 1, token);
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
      name: "Country",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Created At",
      selector: (row) => row.created_at,
      sortable: true,
    },
    {
      name: "Last Update",
      selector: (row) => row.lastupdate,
      sortable: true,
    },
    {
      name: "is Active",
      selector: (row) => row.isActive,
      cell: (e) => (
        <Switch
          id={e.id}
          onChange={() => handleChange(e.id, e.isActive)}
          checked={e.isActive}
          onColor="#c99822"
        />
      ),
      width: "100px",
    },
  ];
  return (
    <>
      <div className="container table-head">
        <h1>Countries </h1>
        {permissions?.find((permission) => permission == "cities-create") && (
          <div className="d-flex justify-content-end ">
            <button
              className="btn bg-gold mb-3 py-2 mx-3"
              onClick={() => navigate("/countries/create")}
            >
              Create Country
            </button>
          </div>
        )}

        <Table
          columns={columns}
          data={items}
          // pagination={Countries.pagination}
          filterBy="name"
          navigateLink={false}
          edit="countries"
          delete="cities"
          isActive={false}
          pagination
          paginationServer
          paginationTotalRows={totalRows}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handlePerRowsChange}
        />
      </div>
    </>
  );
};
export default Countries;
