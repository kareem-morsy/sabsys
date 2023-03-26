import "../../assets/css/tables.css";
import useToken from "../../customHooks/useToken";
import FetchedTable from "../../Components/FetchedTable";
import { FaMoneyBillAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Reservations() {
  const { permissions } = useToken();
  const navigate = useNavigate();

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      width: "80px",
    },
    {
      name: "Hotel",
      selector: (row) => row.brand,
      sortable: true,
    },
    {
      name: "User",
      selector: (row) => row.agent,
      sortable: true,
    },
    {
      name: "Client",
      selector: (row) => row.client,
      sortable: true,
    },
    {
      name: "$Vat ",
      selector: (row) => row.isVat,
      sortable: true,
    },
    {
      name: "$Price",
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: "New Collection",
      cell: (e) => (
        <FaMoneyBillAlt
          className="text-success"
          size={30}
          style={{ cursor: "pointer" }}
          onClick={() =>
            navigate(
              `/collections/create?client_id=${e.client_id}&res_id=${e.id}`
            )
          }
        />
      ),
      center: true,
      width: "150px",
    },
    // {
    //   name: "Created at",
    //   selector: (row) => row.created_at,
    //   sortable: true,
    // },
  ];

  return (
    <FetchedTable


      columns={columns}
      title="Reservations"
      button="Create Reservation"
      target="reservations"
      permissions={permissions}
      edit="reservation"
      role="reservation-create"
      isActive={false}
      navigateUrl="reservations"
    />
  );
}

export default Reservations;
