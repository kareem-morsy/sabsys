import DocumentMeta from "react-document-meta";
import React, { useState, useContext, useEffect } from "react";
import RequestContext from "../../../Context/RequestContext";
import Table from "../../../Components/TableComponent/Table";
import "../../../assets/css/tables.css";
import { useNavigate } from "react-router-dom";
import Switch from "react-switch";
import { editStatus } from "../../../Services/State";
import useToken from "../../../customHooks/useToken";
import { useAlert } from "react-alert";
import { getRoomTypes } from "../../../Services/RoomTypes";
import FetchDataHook from "../../../customHooks/fetchDataHook";
import FetchedTable from "../../../Components/FetchedTable";

function RoomTypes() {
  const [perPage, setPerPage] = useState(10);
  const { items, totalRows, fetchData, paginationn } = FetchDataHook();
  const navigate = useNavigate();
  // const { RoomTypes, Refresh } = useContext(RequestContext);
  const [RoomTypes, setRoomTypes] = useState([]);
  const [ERROR, setError] = useState();
  const [refreshState, setRefreshState] = useState(null);
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

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
//     fetchData("room-types", paginationn?.currentPage , perPage,filterText);
//   }, [currentPage, refreshState,filterText]);
//   const handleFilteredItems = ()=>{
//     fetchData("room-types",paginationn?.currentPage,10,filterText)
//    }
//    useEffect(() => {
//      handleFilteredItems()
//  },[filterText])
//   const handlePageChange = (page) => {
//     fetchData("room-types", page, perPage, filterText);
//   };
//   const handlePerRowsChange =  (newPerPage, page) => {
//     setPerPage(newPerPage);
//   };
  const { permissions, token } = useToken();

  const handleChange = (id, state) => {
    console.log("state", state);
    editStatus("room-types", id, state === true ? 0 : 1, token);
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
      name: "Type",
      selector: (row) => row.type,
      sortable: true,
    },
    {
      name: "No. of Persons",
      selector: (row) => row.persons,
      sortable: true,
      width: "170px",
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
        <h1>Room Types</h1>
        {permissions?.find(
          (permission) => permission == "room-types-create"
        ) && (
          <div className="d-flex justify-content-end ">
            <button
              className="btn bg-gold mb-3 py-2 mx-3"
              onClick={() => navigate("/room-types/create")}
            >
              Create Room Type
            </button>
          </div>
        )}

        <Table
          columns={columns}
          data={items}
          // pagination={RoomTypes.pagination}
          filterBy="title"
          navigateLink={false}
          edit="room-types"
          delete="room-types"
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
      title="Room Types"
      button=" New Room Type"
      target="room-types"
      navigateUrl="rooms/room-types"
      permissions={permissions}
    />
    </>
  );
}
export default RoomTypes;
