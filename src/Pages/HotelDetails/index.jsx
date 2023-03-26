import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { FaRegEye } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";
import "./index.css";
import "../../assets/css/tables.css";
import { useAlert } from "react-alert";
import fetcher from "../../Services/fetcher";
import FetchedTable from "../../Components/FetchedTable";

const HotelDetails = () => {
  const { hotelId } = useParams();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  const [hotel, setHotel] = useState();
  const navigate = useNavigate();
  const alert = useAlert();
  useEffect(() => {
    if (hotelId) {
      fetcher(`hotels/${hotelId}`)
        .then((data) => {
          if (data !== undefined) {
            setHotel(data.data.hotel_data);
          }
        })
        .catch((error) => {
          alert.error(error.message);
        });
    }
  }, [hotelId]);

  const roomColumns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Room Type",
      selector: (row) => row.type,
      sortable: true,
    },
    {
      name: "Room View",
      selector: (row) => row.view,
      sortable: true,
    },
    {
      name: "Stock",
      selector: (row) => row.stock,
      sortable: true,
    },
  ];
  const mealsColumns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Code",
      selector: (row) => row.code,
      sortable: true,
    },
  ];

  const personColumns = [
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

  return (
    <>
      <div className="container table-head my-5">
        <h1>{hotel?.brand}</h1>
        <div className="row pt-4 px-3 mb-4 mx-3 info-box">
          <div className="col-md-5 info">
            <p>City : {hotel?.city?.name}</p>
            <p>Phone : {hotel?.phone}</p>
          </div>
          <div className="col-md-5 info">
            <p>Email : {hotel?.email}</p>
            <p>
              Key Persons :{" "}
              <button
                className="btn bg-trans keyButton"
                style={{ color: "#000" }}
                onClick={handleShow}
              >
                <FaRegEye className="mx-4 mb-1" />
              </button>
            </p>
          </div>
          <div className="col-md-2 text-end">
            <button
              className="btn bg-gold"
              onClick={() => navigate(`/hotels/edit/${hotel.id}`)}
            >
              Edit Hotel
            </button>
          </div>
        </div>

        <FetchedTable
          // filterBy="room_type"
          // navigateLink={false}
          columns={roomColumns}
          title="Rooms"
          target={`hotels/${hotelId}/rooms`}
          actions={false}
          isActive={false}
        />

        <hr />

        <FetchedTable
          columns={mealsColumns}
          title="Meals"
          isActive={false}
          target={`hotels/${hotelId}/meals`}
        />

        <hr />

        {/* <Table
          columns={extraColumns}
          data={hotel?.extras}
          filterBy="title"
          navigateLink={false}
          edit="extras"
          title="Extras"
          actions={false}
        /> */}

        <Modal show={show} onHide={handleClose} size="xl">
          <Modal.Header closeButton>
            <Modal.Title>Key Persons</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* <KeyPersons id={hotelId} /> */}
            <FetchedTable
              columns={personColumns}
              isActive={false}
              target={`hotels/${hotelId}/persons`}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default HotelDetails;
