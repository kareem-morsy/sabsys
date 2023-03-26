import React, { useEffect, useState } from "react";
import RequestContext from "../../../../Context/RequestContext";
import Table from "../../../../Components/TableComponent/Table";
import "../../../assets/css/tables.css";
import { useNavigate } from "react-router-dom";
import { getPaymentMethods } from "../../../../Services/PaymentMethods";
import FetchDataHook from "../../../../customHooks/fetchDataHook";

const Payments = () => {
  const [perPage, setPerPage] = useState(10);
  const { items, totalRows, fetchData } = FetchDataHook();
  // const { paymentMethods } = useContext(RequestContext);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [ERROR, setError] = useState();
  const [refreshState, setRefreshState] = useState(null);

  const Refresh = (state) => {
    setRefreshState(state);
  };
  useEffect(() => {
    fetchData("payment-method", 1, perPage);
  }, [perPage, refreshState]);
  const handlePageChange = (page) => {
    fetchData("payment-method", page, perPage);
  };
  const handlePerRowsChange = async (newPerPage, page) => {
    setPerPage(newPerPage);
  };
  const navigate = useNavigate();

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) => row.title,
      sortable: true,
    },
  ];

  return (
    <>
      <div className="container table-head">
        <h1>payment Methods </h1>
        <div className="d-flex justify-content-end ">
          <button
            className="btn bg-gold mb-3 py-2 mx-3"
            onClick={() => navigate("/payments/create")}
          >
            Create Payment
          </button>
        </div>
        <Table
          columns={columns}
          data={items}
          filterBy="method"
          navigateLink={false}
          edit="payments"
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

export default Payments;
