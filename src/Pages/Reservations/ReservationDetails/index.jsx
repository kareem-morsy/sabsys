import RequestContext from "../../../Context/RequestContext";
import { getReservationById } from "../../../Services/Reservations";
import { getPaymentMethods } from "../../../Services/PaymentMethods";
import { getHotelsList } from "../../../Services/Hotels";
import { getUsers } from "../../../Services/Users";
import { getClients } from "../../../Services/Clients";
import { getRoomTypes } from "../../../Services/RoomTypes";
import { getRoomViews } from "../../../Services/RoomViews";
import { getMeals } from "../../../Services/Meals";
import { useNavigate, useParams } from "react-router-dom";
import React, { useContext, useState } from "react";
import "./index.css";
import DataTable from "react-data-table-component";
import { useRef, useEffect } from "react";
import JsPDF from "jspdf";
import { Modal, Button } from "react-bootstrap";
import Select from "react-select";
import { useDropzone } from "react-dropzone";
import { useAlert } from "react-alert";
import paymentDetails from "../../../Data/paymentDetails";
import useToken from "../../../customHooks/useToken";
import fetcher from "../../../Services/fetcher";
import ContentLoader from "react-content-loader";
const ReservationDetails = (props) => {
  const { resId } = useParams();

  const [show, setShow] = useState(false);
  const [paymentList, setPaymentList] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState();
  const navigate = useNavigate();
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [hotelsList, setHotelsList] = useState([]);
  const [Users, setUsers] = useState([]);
  const [Clients, setClients] = useState([]);
  const [RoomTypes, setRoomTypes] = useState([]);
  const [RoomViews, setRoomViews] = useState([]);
  const [Meals, setMeals] = useState([]);
  const [ERROR, setError] = useState();
  const [refreshState, setRefreshState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const Refresh = (state) => {
    setRefreshState(state);
  };
  const { token } = useToken();
  console.log("dataaaa",data);
  useEffect(() => {
    setData(props?.data);
  }, [props?.data]);
useEffect(()=>{
  if (data  ) {
    if(data?.length === 0){
      setTimeout(() => {
        setLoading(false);
      }, 5000);

    }else if(data?.length > 0){
      setLoading(false);
    }
  }
},[])
  useEffect(() => {
    fetcher(`payment-method`)
      .then((data) => {
        if (data !== undefined) {
          setPaymentMethods(data.data);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);
  useEffect(() => {
    fetcher(`hotels/list`)
      .then((data) => {
        if (data !== undefined) {
          setHotelsList(data?.data);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);
  useEffect(() => {
    fetcher(`users`)
      .then((data) => {
        if (data !== undefined) {
          setUsers(data.data);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);
  useEffect(() => {
    fetcher(`clients`)
      .then((data) => {
        if (data !== undefined) {
          setClients(data.data);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);
  useEffect(() => {
    fetcher(`room-types`)
      .then((data) => {
        if (data !== undefined) {
          setRoomTypes(data?.data);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);
  useEffect(() => {
    fetcher(`room-views`)
      .then((data) => {
        if (data !== undefined) {
          setRoomViews(data?.data);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);
  useEffect(() => {
    fetcher(`meals`)
      .then((data) => {
        if (data !== undefined) {
          setMeals(data?.data);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);
  // const Reservation = Reservations[resId - 1];

  const paymentRef = useRef(0);
  const [Reservation, setReservation] = useState();
  const alert = useAlert();

  let paymentDetail = paymentDetails.find(
    (payment) => payment.reservationId == resId
  );
    console.log("Reservation",Reservation, RoomTypes ,RoomViews,Meals);
  useEffect(() => {
    if (resId) {
      fetcher(`reservations/${resId}`)
        .then((data) => {
          if (data !== undefined) {
            setReservation(data?.data);
          }
        })
        .catch((error) => {
          alert.error(error?.message);
        });
    }
  }, [resId]);
  console.log("resresres", Reservation);

  const selectMethod = (e) => {
    setPaymentMethod(e.value);
  };

  const savePayment = () =>
    setPaymentList([
      ...paymentDetail?.paymentList,
      { paymentMethod: paymentMethod, paidAmount: paymentRef.current.value },
    ]);

  const generatePDF = () => {
    const report = new JsPDF("portrait", "pt", "a1");
    report.html(document.querySelector("#reservation")).then(() => {
      report.save(`reservation${Reservation?.id}.pdf`);
    });
  };

  const handleShow = (isShown) => setShow(isShown);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const columns = [
    {
      name: "Type",
      selector: (row) =>
        RoomTypes.find((type) => type?.id === row?.room_type_id)?.type,
      sortable: true,
    },
    {
      name: "View",
      selector: (row) =>
        RoomViews.find((view) => view?.id === row?.room_view_id)?.view,
      sortable: true,
    },

    {
      name: "Meal",
      selector: (row) => Meals.find((meal) => meal?.id === row?.meal_id)?.name,
      sortable: true,
    },
    {
      name: "Rooms No.",
      selector: (row) => row?.room_duplicate,
      sortable: true,
    },
    {
      name: "Total Price ",
      selector: (row) => row.total,
      sortable: true,
    },
    {
      name: "Total ",
      selector: (row) => row.sub_total,
      sortable: true,
    },

    {
      name: "Vat ",
      selector: (row) => row.vat,
      sortable: true,
    },
  ];

  const expColumns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: "night Price",
      selector: (row) => row.nightPrice,
      sortable: true,
    },
    {
      name: "night new price",
      selector: (row) => row.nightNewPrice,
      sortable: true,
    },
  ];

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
        fontSize: "15px",
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
        fontSize: "16px",
      },
    },
  };

  const rowPreExpanded = (row) => row.defaultExpanded;
  const ExpandedComponent = (e) => {
    console.log("bbb", e?.data);
    return (
      <div className="px-5">
        <h5 className="header py-4">Nights Details</h5>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Night price</th>
              <th scope="col">Selling Price</th>
              <th scope="col">Extra Bed</th>
            </tr>
          </thead>
          <tbody>
            {e?.data?.nights?.map((night) => (
              <>
                <tr>
                  <td>{night?.date}</td>
                  <td>${night?.night_price}</td>
                  <td>${night?.selling_price}</td>
                  <td>
                    {night?.extras?.map((extra) => (
                      <div>
                        <ul className="d-flex px-0 mx-0">
                          <li>{extra?.extra_name}</li>
                          <li className="mx-4">${extra?.price}</li>
                        </ul>
                      </div>
                    ))}
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  return (
    <div className="container table-head" id="reservation">
      <h1>Reservation Details</h1>
      <div className="d-flex justify-content-end mb-2">
        <button
          className="btn bg-gold px-3 py-2"
          onClick={() =>
            navigate(
              `/collections/create?client_id=${Reservation.client_id}&res_id=${Reservation?.id}`
            )
          }
        >
          New Collection
        </button>
        {/* <button
          className="btn bg-gold px-3 py-2 mx-2"
          onClick={() => handleShow(true)}
        >
          Show Payment
        </button> */}

        {/* <button className="btn bg-gold px-3 py-2 ">Edit Reservation</button> */}
        {/* <button className="btn bg-gold px-3 py-2 mx-2" onClick={generatePDF}>Export as PDF</button> */}
      </div>
      <div className="row pt-3 px-3 my-4 info-box">
        <div className="col-md-3 info ">
          {/* <div className="d-flex">
            <label htmlFor="id">ID : </label>
            <p name="id">{Reservation?.id}</p>
          </div> */}
          <div className="payment">
            <label htmlFor="agent">Agent: </label>
            <span name="agent">
              {Users.find((user) => user.id === Reservation?.user_id)?.name}
            </span>
          </div>
          <div className="payment">
            <label htmlFor="client">Optional Date: </label>
            <span name="client">{Reservation?.option_date}</span>
          </div>
          <div className=" payment ">
            <label htmlFor="status">Reservation Status: </label>
            <span name="status">
              {Reservation?.status_id === 1 ? "Tentative" : "definite"}
            </span>
          </div>
          {Reservation?.status_id === 2 && (
            <div className=" payment ">
              <label htmlFor="status">Confirmation No: </label>
              <span name="status">{Reservation?.confirm_no}</span>
            </div>
          )}
        </div>
        <div className="col-md-3 info ">
          <div className="payment">
            <label htmlFor="client">Client: </label>
            <span name="client">
              {
                Clients.find((client) => client?.id === Reservation?.client_id)
                  ?.name
              }
            </span>
          </div>
          <div className="payment">
            <label htmlFor="hotel">From Hijri: </label>
            <span name="status">{Reservation?.from_hijri_date}</span>
          </div>
          <div className="payment">
            <label htmlFor="hotel">To Hijri: </label>
            <span name="status">{Reservation?.to_hijri_date}</span>
          </div>
          {/* <div className="d-flex">
            <label htmlFor="client">Guest Name : </label>
            <p name="client">{Reservation?.guestName}</p>
          </div> */}
        </div>
        <div className="col-md-3 info ">
          {/* <div className="d-flex">
            <label htmlFor="numberofguests">No. of guests : </label>
            <p name="numberofguests">{Reservation?.guests?.length}</p>
          </div> */}
          <div className="payment">
            <label htmlFor="hotel">Hotel: </label>
            <span name="hotel">
              {
                hotelsList?.find((hotel) => hotel.id === Reservation?.hotel_id)
                  ?.brand
              }
            </span>
          </div>
          <div className="payment">
            <label htmlFor="hotel">From Gregorian: </label>
            <span name="hotel">{Reservation?.from_date}</span>
          </div>
          <div className="payment">
            <label htmlFor="client">To Gregorian: </label>
            <span name="client">{Reservation?.to_date}</span>
          </div>
        </div>
        <div className="col-md-3 info ">
          {/* <div className="d-flex">
            <label htmlFor="numberofguests">No. of guests : </label>
            <p name="numberofguests">{Reservation?.guests?.length}</p>
          </div> */}
          <div className="payment">
            <label htmlFor="client">Price: </label>
            <span name="price">${Reservation?.sub_total}</span>
          </div>
          <div className="payment">
            <label htmlFor="vat">Vat: </label>
            <span name="vat">${Reservation?.vat}</span>
          </div>
          <div className="payment">
            <label htmlFor="vat">Total Price: </label>
            <span name="vat">${Reservation?.total}</span>
          </div>
        </div>
      </div>

      {!loading ? (<DataTable
        columns={columns}
        data={Reservation?.slots}
        customStyles={customStyles}
        expandOnRowClicked
        expandableRowExpanded={rowPreExpanded}
        striped
        pointerOnHover
        highlightOnHover
        responsive={true}
        fixedHeader
        subHeaderWrap={true}
        expandableRows
        expandableRowsComponent={(e) => ExpandedComponent(e)}
      />
      ) : (
        <ContentLoader
          viewBox="0 0 380 150"
          backgroundColor="#f5e6c1"
          foregroundColor="#f5f6f1"
          backgroundOpacity="0.3"
        >
          <rect x="0" y="0" rx="2" ry="2" width="100" height="8" />
          <rect x="0" y="17" rx="2" ry="2" width="500" height="150" />
        </ContentLoader>
      )}

      <Modal show={show} onHide={() => handleShow(false)} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Payment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-5">
          <div className="row">
            <table className="table my-4 payment">
              <thead>
                <tr>
                  <th scope="col">Paid Amount $</th>
                  <th scope="col">Payment Method</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                {paymentDetail?.paymentList.map((payment) => (
                  <tr>
                    <td>{payment.paidAmount} </td>
                    <td>{payment.paymentMethod}</td>
                    <td>{payment.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="col-md-5">
              <Select
                placeholder="Select Payment Method"
                isMulti={false}
                isClearable={true}
                options={paymentMethods?.map((method) => ({
                  value: method.method,
                  label: method.method,
                }))}
                classNamePrefix="Select"
                onChange={(e) => selectMethod(e)}
              />
            </div>
            <div className="col-md-4">
              <input
                type="number"
                min="0"
                className="form-control"
                ref={paymentRef}
                placeholder="Enter Payment Amount $"
                // defaultValue={
                //   reservation[resId - 1]?.reservationTotal +
                //   reservation[resId - 1]?.reservationVat -
                //   reservation[resId - 1]?.payment
                // }
              />
            </div>
            <div className="col-md-3 info my-auto">
              <div className="d-flex mt-1">
                <label htmlFor="total" className="price">
                  Total Price :{" "}
                </label>
                <p name="total">
                  {/* {reservation[resId - 1]?.reservationTotal +
                    reservation[resId - 1]?.reservationVat}{" "}
                  $ */}
                </p>
              </div>
            </div>

            <div
              {...getRootProps({ className: "dropzone" })}
              className="info-box py-5 text-center my-4"
            >
              <input {...getInputProps()} />
              <p>Upload Attachments</p>
            </div>
            <aside>
              <ul>{files}</ul>
            </aside>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={savePayment}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ReservationDetails;
