import DocumentMeta from "react-document-meta";
import React, { useState, useContext, useEffect } from "react";
import Table from "../../Components/TableComponent/Table";
import "../../assets/css/tables.css";
import { useNavigate } from "react-router-dom";
import Switch from "react-switch";
import RequestContext from "../../Context/RequestContext";
import { editStatus } from "../../Services/State";
import useToken from "../../customHooks/useToken";
import { getExtras } from "../../Services/Extras";
import FetchDataHook from "../../customHooks/fetchDataHook";

const Extras = () => {
  const [perPage, setPerPage] = useState(10);
  const { items, totalRows, fetchData } = FetchDataHook();
  const navigate = useNavigate();
  // const { Extras, Refresh } = useContext(RequestContext);
  const [Extras, setExtras] = useState([]);
  const [ERROR, setError] = useState();
  const [refreshState, setRefreshState] = useState(null);

  const Refresh = (state) => {
    setRefreshState(state);
  };
  useEffect(() => {
    fetchData("extras", 1, perPage);
  }, [perPage, refreshState]);
  const handlePageChange = (page) => {
    fetchData("extras", page, perPage);
  };
  const handlePerRowsChange = async (newPerPage, page) => {
    setPerPage(newPerPage);
  };
  const { permissions, token } = useToken();

  const handleChange = (id, state) => {
    editStatus("extras", id, state === true ? 0 : 1, token);
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
      name: "Extra",
      selector: (row) => row.extra,
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
        <h1> Extras </h1>
        {permissions?.find((permission) => permission == "extras-create") && (
          <div className="d-flex justify-content-end ">
            <button
              className="btn bg-gold mb-3 py-2 mx-3"
              onClick={() => navigate("/extras/create")}
            >
              Create Extra
            </button>
          </div>
        )}

        <Table
          columns={columns}
          data={items}
          // pagination={Extras.pagination}
          filterBy="title"
          navigateLink={false}
          edit="extras"
          delete="extras"
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
export default Extras;
