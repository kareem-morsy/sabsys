import "./Profile.css";
import Table from "../../Components/TableComponent/Table";
import { useNavigate } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import Select from "react-select";
import { useDropzone } from "react-dropzone";
import { useRef } from "react";
import { FaRegFileImage } from "react-icons/fa";
import ContentLoader from "react-content-loader";
import paymentDetails from "../../Data/paymentDetails";
import fetcher from "../../Services/fetcher";
import FetchedTable from "../FetchedTable";
import { FaMoneyBillAlt } from "react-icons/fa";

const Profile = (props) => {
  const [paymentMethods, setpaymentMethods] = useState([]);
  const [HotelsList, setHotelsList] = useState([]);
  const [Payments, setPayments] = useState([]);
  const [ERROR, setError] = useState();
  const [refreshState, setRefreshState] = useState(null);

  const Refresh = (state) => {
    setRefreshState(state);
  };
  // console.log("datas",props);
  useEffect(() => {
    fetcher(`payment-method`)
      .then((data) => {
        if (data !== undefined) {
          setpaymentMethods(data?.data);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);
  useEffect(() => {
    fetcher(`hotels/list?limit=1000`)
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
    fetcher(`payment-method`)
      .then((data) => {
        if (data !== undefined) {
          setPayments(data?.data);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);
  const navigate = useNavigate();
  const [showAttach, setShowAttach] = useState(false);
  const [attachId, setAttachId] = useState();
  const [show, setShow] = useState(false);
  const [showBank, setShowBank] = useState(false);
  const [loading, setLoading] = useState(true);
  const [resId, setResId] = useState(null);
  const [Reservation, setReservation] = useState();

  const [paymentMethod, setPaymentMethod] = useState();
  const paymentRef = useRef(0);

  const paymentDetail = paymentDetails.find(
    (payment) => payment.reservationId === resId
  );
  const [paymentList, setPaymentList] = useState([]);

  const selectMethod = (e) => {
    setPaymentMethod(e.value);
  };

  const savePayment = () => {
    setPaymentList([
      ...paymentDetail?.paymentList,
      { paymentMethod: paymentMethod, paidAmount: paymentRef.current.value },
    ]);
  };

  const CloseAttach = () => {
    setShowAttach(false);
  };
  const ShowAttach = (id) => {
    setShowAttach(true);
    setAttachId(id);
  };

  const CloseBank = () => {
    setShowBank(false);
  };
  const showClients = () => {
    setShowBank(true);
  };

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = (id) => {
    setShow(true);
    setResId(id);
    setPaymentList([paymentDetail?.paymentList]);
  };

  const [toggle, setToggle] = useState([{ id: 0, state: false }]);

  useEffect(() => {
    if (props?.person?.banks) {
      setToggle(
        props?.person?.banks?.map((bank) => ({
          id: bank.id,
          state: bank.isActive ? true : false,
        }))
      );
    }

    if (props?.person) {
      setLoading(false);
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [props?.person]);

  useEffect(() => {
    if (resId) {
      fetcher(`reservations/${resId}`)
        .then((data) => {
          if (data !== undefined) {
            setReservation(data?.data);
          }
        })
        .catch((error) => {
          alert.error(error.message);
        });
    }
  }, [resId]);

  const columns = [
    ...props.columns,
    {
      name: "Hotel",
      selector: (row) => row.brand,
      sortable: true,
    },
    // {
    //   name: "Price $",
    //   selector: (row) => row.total,
    //   sortable: true,
    // },
    // {
    //   name: "Payment $",
    //   selector: (row) =>
    //     Payments?.find((p) => p.id === row.payment_method_id)?.title,
    //   sortable: true,
    // },
    // {
    //   name: "Status",
    //   selector: (row) => row.status_id,
    //   sortable: true,
    // },
    {
      name: "$Price",
      // selector: (row) => row.total,
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: "$Vat ",
      // selector: (row) => row.vat,
      selector: (row) => row.isVat,
      sortable: true,
    },

    {
      name: "New Collection",
      cell: (e) => (
        // <button className="btn" onClick={() => handleShow(e.id)}>
        <FaMoneyBillAlt
          className="text-success"
          size={30}
          style={{ cursor: "pointer" }}
          onClick={() =>
            navigate(
              `/collections/create?client_id=${props.person?.id}&res_id=${e.id}`
            )
          }
        />
        // </button>
      ),
      center: true,
      width: "150px",
    },

    // {
    //   name: "History",
    //   cell: (e) => (
    //     <button className="btn" onClick={() => handleShow(e.id)}>
    //       <FaRegEye className="mx-1" />
    //     </button>
    //   ),
    // },
  ];

  const clientColumns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
  ];

  const bankColumns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Bank Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Account Number",
      selector: (row) => row.account_number,
      sortable: true,
    },
  ];

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  console.log(props);

  return (
    <div className="container table-head" id="profile">
      <h1>{props?.person?.name}</h1>
      <div className="d-flex justify-content-end mb-2">
        {" "}
        <button
          className="btn bg-gold px-3 py-2 mx-3"
          onClick={() =>
            navigate(`/${props?.editLink}/edit/${props.person?.id}`)
          }
        >
          Edit Profile
        </button>
      </div>
      {!loading ? (
        <div className="row pt-4 px-3 mx-3 info-box">
          {/* <div className="col-md-3 pb-3 px-5">
                    <img src={props.person?.logo} className="profile" alt="profile" />
                </div> */}
          <div className="col-md-6 info ">
            <div className="d-flex">
              <label htmlFor="email">Email : </label>
              <p name="email">{props?.person?.email}</p>
            </div>
            <div className="d-flex">
              <label htmlFor="phone">Phone : </label>
              <p name="phone">
                {props?.editLink === "users"
                  ? props?.person?.phone
                  : props?.person?.phone_number}
              </p>
            </div>
            {props?.filterBy == "agent" && (
              <div className="d-flex">
                <label htmlFor="phone">Commercial Register : </label>
                <p name="phone">{props?.person?.commercial_register}</p>
              </div>
            )}
          </div>

          <div className="col-md-6 info ">
            <div className="d-flex justify-content-between">
              <div className="d-flex payment">
                <label htmlFor="wallet">Wallet : </label>
                <p name="wallet">{props.person?.wallet} $</p>
              </div>
              {props?.filterBy == "agent" && (
                <div>
                  <button
                    className="btn bg-gold px-3 py-2"
                    onClick={() =>
                      navigate(
                        `/collections/create?client_id=${props.person?.id}`
                      )
                    }
                  >
                    New Collection
                  </button>
                  <button
                    className="btn bg-gold px-3 py-2 mx-1"
                    onClick={() =>
                      navigate(`/clients/${props.person?.id}/statment`)
                    }
                  >
                    Collections History
                  </button>
                </div>
              )}
            </div>
            {props?.filterBy == "client" && (
              <div className="d-flex">
                <label htmlFor="dep">Role : </label>
                <p name="dep">{props.person?.roles[0].display_name}</p>
              </div>
            )}
            {props?.filterBy == "agent" && (
              <div className="d-flex">
                <label htmlFor="tax">Tax Card : </label>
                <p name="tax">{props.person?.tax_card}</p>
              </div>
            )}
            {props?.filterBy == "agent" && (
              <div className="d-flex">
                <label htmlFor="bank">Client Persons : </label>
                <FaRegEye
                  className="mt-1"
                  onClick={showClients}
                  style={{ cursor: "pointer", fontSize: "20px" }}
                />
              </div>
            )}
          </div>
          {/* <div className="col-md-1 justify-content-end">
            <button className="btn bg-gold mb-1">Payment</button>
          </div> */}
        </div>
      ) : (
        <ContentLoader viewBox="0 0 300 150">
          <rect x="0" y="0" rx="5" ry="5" width="300" height="50" />
        </ContentLoader>
      )}
      {console.log(props?.person?.id)}
      {props?.filterBy == "agent" ? (
        <FetchedTable
          columns={columns}
          title="Reservation History"
          target={`clients/${props?.targetId}/reservations`}
          edit="reservation"
          role="clients-read"
          isActive={false}
        />
      ) : (
        <FetchedTable
          columns={columns}
          title="Reservation History"
          target={`users/${props?.targetId}/reservations`}
          edit="reservation"
          role="users-read"
          isActive={false}
        />
      )}

      {props?.filterBy == "agent" && (
        <FetchedTable
          columns={bankColumns}
          title="Bank Accounts"
          target={`clients/${props?.targetId}/banks`}
          role="clients-read"
        />
      )}

      {props?.filterBy == "agent" && (
        <div className="attachments">
          <h1 className="my-3">Attachments</h1>
          <div className="row info-box py-4">
            {props.person?.attachments.map((doc, i) => (
              <div className="col-3" onClick={() => ShowAttach(i)}>
                <img
                  src={doc?.file}
                  className="img-fluid w-100"
                  style={{ objectFit: "cover", cursor: "pointer" }}
                />
                <p className="doc mt-2">{doc.attachment_path}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {props?.filterBy == "agent" && (
        <Modal show={showAttach} onHide={CloseAttach} size="lg">
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <img
              src={props?.person?.attachments[attachId]?.file}
              className="img-fluid w-100"
            />
          </Modal.Body>
        </Modal>
      )}

      <Modal show={show} onHide={handleClose} size="xl">
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
                  value: method.id,
                  label: method.title,
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
                //   reservation[reservationId - 1]?.reservationTotal +
                //   reservation[reservationId - 1]?.reservationVat -
                //   reservation[reservationId - 1]?.payment
                // }
              />
            </div>
            <div className="col-md-3 info my-auto">
              <div className="d-flex mt-1">
                <label htmlFor="total" className="price">
                  Total Price :{" "}
                </label>
                <p name="total">{Reservation?.total}</p>
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
              {/* <h4>Files</h4> */}
              <ul>{files}</ul>
            </aside>
            {/* <div className="col-md-4">
                            <button className="btn bg-gold">Upload Attachments</button>
                        </div> */}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={savePayment}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showBank} onHide={CloseBank} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Client Persons</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FetchedTable
            style={{ marginTop: "-10px" }}
            columns={clientColumns}
            // title="Client Persons"
            // button=" New Client"
            target={`${props.editLink}/${props?.targetId}/persons`}
            // permissions={permissions}
            // edit="clients"
            // role="clients-read"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={CloseBank}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Profile;
