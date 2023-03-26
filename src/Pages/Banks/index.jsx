import React, { useState } from "react";
import "../../assets/css/tables.css";
import { editStatus } from "../../Services/State";
import useToken from "../../customHooks/useToken";
import FetchedTable from "../../Components/FetchedTable";
const Banks = () => {
  const [refreshState, setRefreshState] = useState(null);
  const { token } = useToken();
  const { permissions } = useToken();

  const handleChange = (id, state) => {
    editStatus("banks", id, state === true ? 0 : 1, token);
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
  ];

  return (
    <FetchedTable
      columns={columns}
      title="banks"
      button="Create Bank"
      target="banks"
      navigateUrl="banks"
      permissions={permissions}
      edit="banks"
      role="banks-create"
      isActive={true}
    />
  );
};

export default Banks;
