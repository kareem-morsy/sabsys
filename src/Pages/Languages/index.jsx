import "../../assets/css/tables.css";
import FetchedTable from "../../Components/FetchedTable";

const Languages = () => {
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
      title="All Languages"
      target="languages"
      edit="languages"
      actions={false}
    />
  );
};
export default Languages;
