import React, { useState, useContext, useEffect } from "react";
import RequestContext from "../../../Context/RequestContext";
import Table from "../../../Components/TableComponent/Table";
import "../../../assets/css/tables.css";
import { useNavigate } from "react-router-dom";
import Switch from "react-switch";
import { editStatus } from "../../../Services/State";
import useToken from "../../../customHooks/useToken";
import { getExtraTypes } from "../../../Services/ExtraTypes";
import FetchDataHook from "../../../customHooks/fetchDataHook";

const ExtraTypes = () => {
  const [perPage, setPerPage] = useState(10);
  const { items, totalRows, fetchData } = FetchDataHook();
  const navigate = useNavigate();
  // const { ExtraTypes, Refresh } = useContext(RequestContext);
  const [ExtraTypes, setExtraTypes] = useState([]);
  const [ERROR, setError] = useState();
  const [refreshState, setRefreshState] = useState(null);

  const Refresh = (state) => {
    setRefreshState(state);
  };
  useEffect(() => {
    fetchData("extra-types", 1, perPage);
  }, [perPage, refreshState]);
  const handlePageChange = (page) => {
    fetchData("extra-types", page, perPage);
  };
  const handlePerRowsChange = async (newPerPage, page) => {
    setPerPage(newPerPage);
  };
  const { permissions, token } = useToken();

  const handleChange = (id, state) => {
    console.log("state", state);
    editStatus("extra-types", id, state === true ? 0 : 1, token);
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
      name: "Type",
      selector: (row) => row.type,
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
        <h1>Extra Types</h1>
        {permissions?.find(
          (permission) => permission == "extra-types-create"
        ) && (
          <div className="d-flex justify-content-end ">
            <button
              className="btn bg-gold mb-3 py-2 mx-3"
              onClick={() => navigate("/extra-types/create")}
            >
              Create Extra Types
            </button>
          </div>
        )}

        <Table
          columns={columns}
          data={items}
          // pagination={ExtraTypes.pagination}
          filterBy="title"
          edit="extra-types"
          delete="extra-types"
          navigateLink={false}
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

export default ExtraTypes;
