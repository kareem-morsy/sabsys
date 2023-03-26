import DocumentMeta from "react-document-meta";
import React, { useState, useContext, useEffect } from "react";
import RequestContext from "../../Context/RequestContext";
import Table from "../../Components/TableComponent/Table";
import "../../assets/css/tables.css";
import { useNavigate } from "react-router-dom";
import Switch from "react-switch";
import { editStatus } from "../../Services/State";
import useToken from "../../customHooks/useToken";
import { getMeals } from "../../Services/Meals";
import FetchDataHook from "../../customHooks/fetchDataHook";
import FetchedTable from "../../Components/FetchedTable";

const Meals = () => {
  const { permissions } = useToken();
  const { token } = useToken();
  const [refreshState, setRefreshState] = useState(null);
  // const [perPage, setPerPage] = useState(10);
  // const { items, totalRows, fetchData } = FetchDataHook();
  // const navigate = useNavigate();
  // const { Meals, ERROR, Refresh } = useContext(RequestContext);
  // const [Meals, setMeals] = useState([]);
  // const [ERROR, setError] = useState();
  // const Refresh = (state) => {
  //   setRefreshState(state);
  // };

  // useEffect(() => {
  //   fetchData("meals", 1, perPage);
  // }, [perPage, refreshState]);
  // const handlePageChange = (page) => {
  //   fetchData("meals", page, perPage);
  // };
  // const handlePerRowsChange = async (newPerPage, page) => {
  //   setPerPage(newPerPage);
  // };

  const handleChange = (id, state) => {
    console.log("state", state);
    editStatus("meals", id, state === true ? 0 : 1, token);
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
      {/* <div className="container table-head">
        <h1>All Meals</h1>
        {permissions?.find((permission) => permission == "meals-create") && (
          <div className="d-flex justify-content-end ">
            <button
              className="btn bg-gold mb-3 py-2 mx-3"
              onClick={() => navigate("/meals/create")}
            >
              Create Meal
            </button>
          </div>
        )}

        <Table
          columns={columns}
          data={items}
          // pagination={Meals.pagination}
          filterBy="title"
          navigateLink={false}
          edit="meals"
          delete="meals"
          pagination
          paginationServer
          paginationTotalRows={totalRows}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handlePerRowsChange}
        />
      </div> */}
         <FetchedTable 
          columns={columns}
          title="All Meals"
          button=" New Meal"
          target="meals"
          navigatUrl="meals"
          permissions={permissions}
          role= "meals-create"
          edit="meals"
          />
    </>
  );
};
export default Meals;
