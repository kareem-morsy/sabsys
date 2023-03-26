import React, { useState, useMemo, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BsPencilFill } from "react-icons/bs";
import { AxiosInstance } from "../../Network/AxiosInstance";
import UpdateReservationPopup from "../UpdateReservationPopup/UpdateReservationPopup";
import FilterComponent from "../../Components/FilterTable/FilterComponent";
import Export from "../../Components/ExportToCSV/Export";
import "../../assets/css/tables.css";
import { useAlert } from "react-alert";
import useToken from "../../customHooks/useToken";
import ContentLoader from "react-content-loader";
import { ImEye } from "react-icons/im";
import FetchDataHook from "../../customHooks/fetchDataHook";
import Switch from "react-switch";
import { editStatus } from "../../Services/State";
const Table = (props) => {
  const {
    pagination,
    paginationServer,
    selectableRows,
    handleSelected,
    paginationTotalRows,
    onChangePage,
    onChangeRowsPerPage,
    filterText,
    setFilterText,
    handlleFilterSearch,
    target,
    RefreshHandler,
    search,
    navigateUrl,
    actions,
    key,
    x,
  } = props;
  // console.log("props", props);
  // console.log("yyy", props);
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const alert = useAlert();
  const { token, permissions } = useToken();
  const [id, setID] = useState();
  const [state, setState] = useState();
  // const [filterText, setFilterText] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  // const [selectedrows, setSelectedRows] = useState([]);
  const [showCalenderPopup, setShowCalenderPopup] = useState();
  const [loading, setLoading] = useState(true);
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  // const filteredItems = data?.filter(
  //   (item) =>
  //     JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !==
  //     -1
  // );
  const { items, totalRows, fetchData, paginationn } = FetchDataHook();
  // console.log("kkkkkkkkk", paginationn);
  const [perPage, setPerPage] = useState(10);
  // const [filteredItems, setFilterdItems] = useState([])
  console.log("dataaaa", data);
  useEffect(() => {
    setData(props?.data);
  }, [props?.data]);
  //   const handleFilteredItems = ()=>{
  //     // setFilterText(e.target.value)
  //    fetchData(target,paginationn?.currentPage,10,filterText)
  //   }
  //   useEffect(() => {
  //     handleFilteredItems()
  // },[filterText])
  // console.log("filterTextfilterText",filterText);
  //   useEffect(() => {
  //     fetchData("rooms",1,10,filterText).then(res => console.log("rrrrrrrr",res))
  // },[filterText])
  // console.log("2222",filteredItems);
  // const [ERROR, setError] = useState();
  const [refreshState, setRefreshState] = useState(null);
  const Refresh = (state) => {
    setRefreshState(state);
  };
  const navigate = useNavigate();
  const pointerOnHover = props.navigateLink === false ? false : true;
  const handleClose = () => setShowPopup(false);
  const handleCalenderPopup = (isShown, data) =>
    setShowCalenderPopup({ isShown, data });
  // const handleShowDelete = (id) => {
  //   setId(id);
  //   setShowDelete(true);
  // };
  const Delete = async () => {
    const response = await AxiosInstance.delete(`${props?.delete}/${id}`);
    if (response !== undefined)
      if (response.status === 200) return response.data;
  };
  const deleteHandle = () => {
    setShowPopup(false);
    Delete();
    setData(data.filter((d) => d.id !== id));
    if (Delete) {
      // console.log("deleted");
      alert.success("Item Deleted Successfully");
    }
    Refresh(`${props?.delete}`);
  };
  const handleDetails = (e) => {
    navigate(`/${navigateUrl}/${e?.id}`);
  };
  const handleEdit = (e) => {
    // if (props.navigateUrl === "reservations") handleCalenderPopup(true, e.id);
    // else
    console.log("e.id", e.id);
    navigate(`/${navigateUrl}/edit/${e?.id}`);
  };
  const handleChange = (id, state) => {
    setShowPopup(true);
    setID(id);
    setState(state);
  };
  const ChangeState = () => {
    editStatus(props?.edit, id, state === true ? 0 : 1, token)
      .then((res) => {
        setState(res?.data?.isActive);
        console.log("response", res);
        alert.success("Status Changed Successfully");
        setShowPopup(false);
      })
      .catch((err) => {
        console.log("error", err);
        alert.error("error");
      });
    RefreshHandler();
  };

  console.log(permissions);
  useEffect(() => {
    props?.isActive !== false &&
      props?.actions !== true &&
      setColumns([
        ...props.columns,
        {
          name: "Active",
          cell: (e) => (
            <Switch
              id={e.id}
              onChange={() => handleChange(e.id, e.isActive)}
              checked={e.isActive}
              onColor="#C99822"
            />
          ),
          center: true,
          width: "100px",
        },
      ]);
    props?.actions !== false &&
      props?.isActive !== true &&
      setColumns([
        ...props.columns,
        {
          name: "Actions",
          omit: !props.edit,
          cell: (e) => [
            permissions?.find(
              (permission) => permission === `${props.edit}-read`
            ) &&
              props?.edit !== "banks" &&
              props?.edit !== "roles" &&
              props?.edit !== "client-types" && (
                <ImEye
                  onClick={() => handleDetails(e)}
                  className=" text-success editDelete"
                />
              ),
            permissions?.find(
              (permission) => permission === `${props.edit}-update`
            ) && (
              <BsPencilFill
                onClick={() => handleEdit(e)}
                className="mx-3 text-primary editDelete"
              />
            ),
          ],
          center: true,
          width: "100px",
        },
      ]);
    // : setColumns([...props.columns]);
    props?.isActive !== false &&
      props?.actions !== false &&
      setColumns([
        ...props.columns,
        {
          name: "Active",
          cell: (e) => (
            <Switch
              id={e.id}
              onChange={() => handleChange(e.id, e.isActive)}
              checked={e.isActive}
              onColor="#C99822"
            />
          ),
          center: true,
          width: "100px",
        },
        {
          name: "Actions",
          omit: !props.edit,
          cell: (e) => [
            permissions?.find(
              (permission) => permission === `${props.edit}-read`
            ) &&
              props?.edit !== "banks" &&
              props?.edit !== "roles" &&
              props?.edit !== "client-types" && (
                <ImEye
                  onClick={() => handleDetails(e)}
                  className=" text-success editDelete"
                />
              ),
            permissions?.find(
              (permission) => permission === `${props.edit}-update`
            ) && (
              <BsPencilFill
                onClick={() => handleEdit(e)}
                className="mx-3 text-primary editDelete"
              />
            ),
          ],
          center: true,
        },
      ]);
    props?.isActive === false &&
      props?.actions === false &&
      setColumns([...props.columns]);
    if (data) {
      if (data?.length === 0) {
        setTimeout(() => {
          setLoading(false);
        }, 5000);
      } else if (data?.length > 0) {
        setLoading(false);
      }
    }
  }, [props?.actions, data, props?.isActive]);
  const customStyles = {
    header: {
      style: {
        color: "#C99822",
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
        color: "#C99822",
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
  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };
    // const handlleFilterSearch=(e)=>{
    //   setFilterText(e.target.value)
    //   handleFilteredItems(e.target.value)
    // }
    return (
      <>
        {props.edit !== "languages" &&
          x !== "collections" &&
          props?.title !== "Previous History" && (
            <>
              <FilterComponent
                onFilter={handlleFilterSearch}
                onClear={handleClear}
                filterText={filterText}
              />
              {props.edit !== "languages" &&
                x !== "collections" &&
                target !== "roles" && (
                  <Export
                    data={props.data}
                    target={target}
                    filterText={filterText}
                  />
                )}
            </>
          )}
      </>
    );
  }, [filterText, resetPaginationToggle]);
  return (
    <div>
      <div className="px-3 table-head">
        {!loading ? (
          <DataTable
            // noDataComponent={!data && "Your Text Here"} //or your component
            columns={columns}
            data={data}
            customStyles={customStyles}
            // onRowClicked={(e) => rowClicked(e)}
            // paginationResetDefaultPage={resetPaginationToggle}
            subHeader
            subHeaderComponent={
              search !== false ? subHeaderComponentMemo : false
            }
            striped
            pointerOnHover={props.navigateLink}
            highlightOnHover
            responsive={true}
            fixedHeader
            subHeaderWrap={true}
            // title={props?.title}
            pagination
            paginationServer
            paginationTotalRows={paginationTotalRows}
            onChangePage={onChangePage}
            onChangeRowsPerPage={onChangeRowsPerPage}
            paginationRowsPerPageOptions={[10]}
            // showPageSizeOptions={false}
            // pageSize={10}
            selectableRows={selectableRows}
            // onSelectedRowsChange={handleSelectedRows}
            // selectableRows={selectableRows}
            // onSelectedRowsChange={(e) =>
            //   handleSelected ? handleSelected(e.selectedRows) : null
            // }
            onSelectedRowsChange={handleSelected}
          />
        ) : (
          <ContentLoader
            viewBox="0 0 380 150"
            backgroundColor="#F5E6C1"
            foregroundColor="#F5F6F1"
            backgroundOpacity="0.3"
          >
            <rect x="0" y="0" rx="2" ry="2" width="100" height="8" />
            <rect x="0" y="17" rx="2" ry="2" width="500" height="150" />
          </ContentLoader>
        )}
      </div>
      {/* {selectedrows[0] && (
          <div className="deleteAlert">
            <p className="mt-4">{selectedrows.length} Items Selected</p>
            <button className="btn btn-danger px-3 " onClick={deleteItems}>
              Delete
            </button>
          </div>
        )} */}
      <Modal show={showPopup} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="p-5 text-center">
            <h3 className="popup">
              Are you sure you want to change active status ?!
            </h3>
            <button className="btn bg-gold mt-5" onClick={ChangeState}>
              Change
            </button>
          </div>
        </Modal.Body>
      </Modal>
      {showCalenderPopup?.isShown && (
        <UpdateReservationPopup
          showCalenderPopup={showCalenderPopup}
          id={showCalenderPopup.data}
          {...{ handleCalenderPopup }}
        />
      )}
    </div>
  );
};
export default Table;
