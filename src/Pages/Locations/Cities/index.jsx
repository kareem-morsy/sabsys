// import DocumentMeta from "react-document-meta";
// import RequestContext from "../../../Context/RequestContext";
// import { useAlert } from "react-alert";
// import { getCities } from "../../../Services/Cities";
import React, { useState } from "react";
import Table from "../../../Components/TableComponent/Table";
import "../../../assets/css/tables.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Switch from "react-switch";
import { editStatus } from "../../../Services/State";
import useToken from "../../../customHooks/useToken";
import FetchDataHook from "../../../customHooks/fetchDataHook";

const Cities = () => {
  const [perPage, setPerPage] = useState(10);
  const { items, totalRows, fetchData } = FetchDataHook();
  const navigate = useNavigate();
  const { permissions } = useToken();
  const [ERROR, setError] = useState();
  const [refreshState, setRefreshState] = useState(null);

  const Refresh = (state) => {
    setRefreshState(state);
  };
  const { token } = useToken();
  useEffect(() => {
    fetchData("cities?city=true", 1, perPage);
  }, [perPage, refreshState]);
  const handlePageChange = (page) => {
    fetchData("cities?city=true", page, perPage);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setPerPage(newPerPage);
  };

  const handleChange = (id, state) => {
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
      selector: (row) => row?.country?.name,
      sortable: true,
      width: "130px",
    },
    {
      name: "City",
      selector: (row) => row.city,
      sortable: true,
      width: "130px",
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
        <h1>Cities </h1>
        {permissions?.find((permission) => permission === "cities-create") && (
          <div className="d-flex justify-content-end ">
            <button
              className="btn bg-gold mb-3 py-2 mx-3"
              onClick={() => navigate("/cities/create")}
            >
              Create City
            </button>
          </div>
        )}
        <Table
          columns={columns}
          data={items}
          // pagination={Cities.pagination}
          filterBy="name"
          navigateLink={false}
          edit="cities"
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
export default Cities;
