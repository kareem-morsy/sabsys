import { ImEye } from "react-icons/im";
import { useNavigate, useParams } from "react-router";
import FetchedTable from "../../../Components/FetchedTable";

const Statment = () => {
  const navigate = useNavigate();
  const { clientId } = useParams();

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
      sortable: true,
    },
    // {
    //   name: "Payment Type",
    //   selector: (row) => row.payment_type,
    //   sortable: true,
    // },
    {
      name: "Payment Method",
      selector: (row) => row.payment_method,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status_text,
      sortable: true,
    },
    {
      name: "Created By",
      selector: (row) => row.creator,
      sortable: true,
    },
    {
      name: "Created At",
      selector: (row) => row.created_at,
      sortable: true,
    },
    {
      name: "Actions",
      //   omit: !props.edit,
      cell: (e) => [
        <ImEye
          onClick={() => navigate(`/clients/${clientId}/statment/${e.id}`)}
          className=" text-success editDelete"
        />,
      ],
      center: true,
    },
  ];

  return (
    <FetchedTable
      columns={columns}
      title="Collections History"
      target={`clients/${clientId}/statement`}
      navigatUrl={`clients/${clientId}/statement`}
      isActive={false}
    />
  );
};

export default Statment;
