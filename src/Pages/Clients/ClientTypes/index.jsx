import "../../../assets/css/tables.css";
import useToken from "../../../customHooks/useToken";
import FetchedTable from "../../../Components/FetchedTable";

const ClientTypes = () => {
  const { permissions } = useToken();

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
    // {
    //     name: 'Created By',
    //     selector: row => row.created_by,
    //     sortable: true,
    // },
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
  ];

  return (
    <>
      <FetchedTable
        columns={columns}
        title="Client Types"
        button="Create Client Type"
        target="client-types"
        navigateUrl="clients/client-types"
        permissions={permissions}
        edit="client-types"
        role="client-types-create"
      />
    </>
  );
};

export default ClientTypes;
