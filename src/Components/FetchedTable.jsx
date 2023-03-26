import React, { useEffect, useState } from "react";
import "../assets/css/tables.css";
import { useNavigate } from "react-router-dom";
import Switch from "react-switch";
import FetchDataHook from "../customHooks/fetchDataHook";
import Table from "./TableComponent/Table";
const FetchedTable = ({
  columns,
  title,
  button,
  path,
  target,
  role,
  permissions,
  generatePDF,
  key,
  edit,
  selectableRows,
  handleSelected,
  innerData,
  isActive,
  actions,
  refresh,
  navigateUrl,
  // actions,
  x,
}) => {
  const navigate = useNavigate();
  const [perPage, setPerPage] = useState(10);
  const { items, totalRows, fetchData, paginationn } = FetchDataHook();
  const [refreshState, setRefreshState] = useState(null);
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const RefreshHandler = () => {
    setRefreshState(!refreshState);
  };
  useEffect(() => RefreshHandler(), [refresh]);
  const handlleFilterSearch = (e) => {
    setFilterText(e.target.value);
  };
  // useEffect(() => {
  //   setCurrentPage(paginationn?.currentPage);
  // }, [currentPage ]);
  // useEffect(() => {
  //   fetchData(target, paginationn?.currentPage, perPage, filterText || "");
  // }, [perPage ,currentPage, refreshState, filterText]);

  const handleFilteredItems = () => {
    fetchData(target, paginationn?.currentPage || 1, perPage, filterText);
  };
  // const handlePerRowsChange = async  (newPerPage, page) => {
  //   setPerPage( paginationn ? newPerPage  : paginationn?.limit);
  // };
  useEffect(() => {
    handleFilteredItems();
  }, [
    paginationn?.limit,
    perPage,
    paginationn?.currentPage,
    filterText,
    refreshState,
  ]);
  const handlePageChange = (page) => {
    fetchData(target, page, perPage, filterText);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setPerPage(newPerPage);
  };

  return (
    <div className="container table-head">
      {title && <h1 className="mb-0">{title} </h1>}
      {permissions?.find((permission) => permission === role) && (
        <div className="d-flex justify-content-end ">
          {button && (
            <button
              className="btn bg-gold mb-3 py-2 mx-3"
              onClick={() => navigate(`/${navigateUrl}/create`)}
            >
              {button}
            </button>
          )}
        </div>
      )}

      <Table
        title={title}
        columns={columns}
        data={items}
        innerData={innerData}
        filterBy="name"
        navigateLink={false}
        edit={edit}
        delete={edit}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handlePerRowsChange}
        filterText={filterText}
        setFilterText={setFilterText}
        handlleFilterSearch={handlleFilterSearch}
        target={target}
        selectableRows={selectableRows}
        handleSelected={handleSelected}
        isActive={isActive}
        RefreshHandler={RefreshHandler}
        actions={actions}
        navigateUrl={navigateUrl}
        // actions={actions}
        key={key}
        x={x}
      />
    </div>
  );
};
export default FetchedTable;
