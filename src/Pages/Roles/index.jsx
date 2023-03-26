import DocumentMeta from "react-document-meta";
import React, { useEffect, useContext, useState } from "react";
import RequestContext from "../../Context/RequestContext";
import Table from "../../Components/TableComponent/Table";
import "../../assets/css/tables.css";
import { useNavigate } from "react-router-dom";
import useToken from "../../customHooks/useToken";
import { getRoles } from "../../Services/Roles";
import FetchDataHook from "../../customHooks/fetchDataHook";
import FetchedTable from "../../Components/FetchedTable";

function Roles() {
  const { permissions } = useToken();

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
  ];

  return (
    <>
      <FetchedTable
        columns={columns}
        title="All Roles"
        button="Create Role"
        target="roles"
        role="roles-create"
        edit="roles"
        permissions={permissions}
        isActive={false}
        actions={true}
        navigateUrl="roles"
        edit="roles"
      />
    </>
  );
}

export default Roles;
