import DataTable from "react-data-table-component";

function Table({ data, columns }) {
  // console.log("tableData", data);

  const customStyles = {
    header: {
      style: {
        color: "#c99822",
        fontSize: "26px",
      },
    },
    headRow: {
      style: {
        border: "none",
      },
    },
    headCells: {
      style: {
        color: "#c99822",
        fontSize: "17px",
      },
    },
    rows: {
      highlightOnHoverStyle: {
        justifyContent: "center",
        backgroundColor: "#ddd",
        borderBottomColor: "#FFFFFF",
        borderRadius: "25px",
        outline: "1px solid #FFFFFF",
      },
      style: {
        fontSize: "14px",
      },
    },
  };
  return (
    <DataTable
      columns={columns}
      data={data}
      customStyles={customStyles}
      // onRowClicked={(e) => rowClicked(e)}
      // paginationResetDefaultPage={resetPaginationToggle}
      subHeader
      // subHeaderComponent={subHeaderComponentMemo}
      striped
      // pointerOnHover={props.navigateLink}
      highlightOnHover
      responsive={true}
      fixedHeader
      subHeaderWrap={true}
      // title={props?.title}
      pagination
      paginationServer
    // paginationTotalRows={paginationTotalRows}
    // onChangePage={onChangePage}
    // onChangeRowsPerPage={onChangeRowsPerPage}
    />
  );
}
export default Table;
