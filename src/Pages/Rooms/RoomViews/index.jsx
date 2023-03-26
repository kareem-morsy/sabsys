import DocumentMeta from "react-document-meta";
import React, { useState, useContext, useEffect } from "react";
import RequestContext from "../../../Context/RequestContext";
import Table from "../../../Components/TableComponent/Table";
import "../../../assets/css/tables.css";
import { useNavigate } from "react-router-dom";
import Switch from "react-switch";
import { editStatus } from "../../../Services/State";
import useToken from "../../../customHooks/useToken";
import { getRoomViews } from "../../../Services/RoomViews";
import FetchDataHook from "../../../customHooks/fetchDataHook";
import FetchedTable from "../../../Components/FetchedTable";

function RoomViews() {
  const [refreshState, setRefreshState] = useState(null);
  // const [perPage, setPerPage] = useState(10);
  // const { items, totalRows, fetchData, paginationn } = FetchDataHook();
  // const navigate = useNavigate();
  // // const { RoomViews, Refresh } = useContext(RequestContext);
  // const [RoomViews, setRoomViews] = useState([]);
  // const [ERROR, setError] = useState();
  // const [filterText, setFilterText] = useState("");
  // const [currentPage, setCurrentPage] = useState(1);

//   const Refresh = (state) => {
//     setRefreshState(state);
//   };
//   const handlleFilterSearch=(e)=>{
//     setFilterText(e.target.value)
//   }
//   useEffect(() => {
//     setCurrentPage(paginationn?.currentPage)
//   }, [paginationn?.currentPage]);
//   useEffect(() => {
//     fetchData("room-views", paginationn?.currentPage , perPage,filterText);
//   }, [currentPage, refreshState,filterText]);
//   const handleFilteredItems = ()=>{
//     fetchData("room-views",paginationn?.currentPage,10,filterText)
//    }
//    useEffect(() => {
//      handleFilteredItems()
//  },[filterText])
//   const handlePageChange = (page) => {
//     fetchData("room-views", page, perPage, filterText);
//   };
//   const handlePerRowsChange =  (newPerPage, page) => {
//     setPerPage(newPerPage);
//   };
  const { permissions, token } = useToken();

  const handleChange = (id, state) => {
    console.log("state", state);
    editStatus("room-views", id, state === true ? 0 : 1, token);
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
      name: "View",
      selector: (row) => row.view,
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
        <h1>Room Views</h1>
        {permissions?.find(
          (permission) => permission == "room-types-create"
        ) && (
          <div className="d-flex justify-content-end ">
            <button
              className="btn bg-gold mb-3 py-2 mx-3"
              onClick={() => navigate("/room-views/create")}
            >
              Create Room View
            </button>
          </div>
        )}

        <Table
          columns={columns}
          data={items}
          // pagination={RoomViews.pagination}
          filterBy="title"
          navigateLink={false}
          edit="room-views"
          delete="room-views"
          pagination
          paginationServer
          paginationTotalRows={totalRows}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handlePerRowsChange}
          filterText={filterText}
          setFilterText={setFilterText}
          handlleFilterSearch={handlleFilterSearch}
        />
      </div> */}
      <FetchedTable 
        columns={columns}
        title="Room Views"
        button=" New Room View"
        target="room-views"
        permissions={permissions}
        role="room-types-create"
        navigateUrl="rooms/room-views"
      />
    </>
  );
}
export default RoomViews;
