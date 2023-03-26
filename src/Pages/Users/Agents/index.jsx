import DocumentMeta from "react-document-meta";
import React, { useState, useContext, useEffect } from "react";
import RequestContext from "../../../Context/RequestContext";
import Table from "../../../Components/TableComponent/Table";
import "../../../assets/css/tables.css";
import { useNavigate } from "react-router-dom";
import Switch from "react-switch";
import { editStatus } from "../../../Services/State";
import useToken from "../../../customHooks/useToken";
import { getUsers } from "../../../Services/Users";
import FetchDataHook from "../../../customHooks/fetchDataHook";
import FetchedTable from "../../../Components/FetchedTable";

function Users() {
  // const [perPage, setPerPage] = useState(10);
  // const { items, totalRows, fetchData } = FetchDataHook();
  // const navigate = useNavigate();
  // // const { Users, Refresh } = useContext(RequestContext);
  // const [Users, setUsers] = useState([]);
  // const [ERROR, setError] = useState();
  const [refreshState, setRefreshState] = useState(null);

  // const Refresh = (state) => {
  //   setRefreshState(state);
  // };
  // useEffect(() => {
  //   fetchData("users", 1, perPage);
  // }, [perPage, refreshState]);
  // const handlePageChange = (page) => {
  //   fetchData("users", page, perPage);
  // };
  // const handlePerRowsChange = async (newPerPage, page) => {
  //   setPerPage(newPerPage);
  // };
  const { permissions, token } = useToken();

  const handleChange = (id, state) => {
    console.log("state", state);
    editStatus("users", id, state === true ? 0 : 1, token);
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
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    // {
    //   name: "Created At",
    //   selector: (row) => row.created_at,
    //   sortable: true,
    // },
    // {
    //   name: "Last Update",
    //   selector: (row) => row.lastupdate,
    //   sortable: true,
    // },
    // {
    //   name: "is Active",
    //   selector: (row) => row.isActive,
    //   cell: (e) => (
    //     <Switch
    //       id={e.id}
    //       onChange={() => handleChange(e.id, e.isActive)}
    //       checked={e.isActive}
    //       onColor="#c99822"
    //     />
    //   ),
    //   width: "100px",
    // },
  ];

  return (
    // <>
    //   <div className="container table-head">
    //     <h1>All Users</h1>
    //     {permissions?.find((permission) => permission == "meals-create") && (
    //       <div className="d-flex justify-content-end ">
    //         <button
    //           className="btn bg-gold mb-3 py-2 mx-3"
    //           onClick={() => navigate("/new-user")}
    //         >
    //           New User
    //         </button>
    //       </div>
    //     )}

    //     <Table
    //       columns={columns}
    //       data={items}
    //       // pagination={Users.pagination}
    //       filterBy="name"
    //       edit="users"
    //       navigateLink="users"
    //       delete="users"
    //       isActive={false}
    //       pagination
    //       paginationServer
    //       paginationTotalRows={totalRows}
    //       onChangePage={handlePageChange}
    //       onChangeRowsPerPage={handlePerRowsChange}
    //     />
    //   </div>
    // </>
    <FetchedTable
      columns={columns}
      title="All Users"
      button="Create User"
      target="users"
      navigateUrl="users"
      permissions={permissions}
      role="users-create"
      edit="users"
    />
  );
}

export default Users;
