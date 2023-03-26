import React, { useState, useEffect, useContext } from "react";

import "./ReservationData.css";
// import Clients from "../../../Data/clients";
import hotels from "../../../Data/Hotels.json";
import { SelectInputType } from "../../../Components/Select/SelectInputType";
import ReservationContext from "../../../Context/ReservationContext";
import RequestContext from "../../../Context/RequestContext";
import { getHotelsList } from "../../../Services/Hotels";
import { getPaymentMethods } from "../../../Services/PaymentMethods";
import { getClients } from "../../../Services/Clients";
import useToken from "../../../customHooks/useToken";
import { FaHotel } from "react-icons/fa";
import { BsPlusCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import fetcher from "../../../Services/fetcher";

const ReservationData = ({ reservationObj, handleHotelChange, data, type }) => {
  const [selectedHotel, setSelectedHotel] = useState();
  const [selectedClient, setSelectedClient] = useState();
  const [objectHotel, setObjectHotel] = useState();
  const [objectClient, setObjectClient] = useState();
  const [objectPayment, setObjectPayment] = useState();

  const { hotel, handleHotel, handleVatPercent } =
    useContext(ReservationContext);
  // const { Hotels, HotelsList, Clients, paymentMethods } =
  //   useContext(RequestContext);
  const [HotelsList, setHotelsList] = useState([]);
  const [Clients, setClients] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [ERROR, setError] = useState();
  const [refreshState, setRefreshState] = useState(null);

  const Refresh = (state) => {
    setRefreshState(state);
  };
  const { token } = useToken();
  const navigate = useNavigate();
  useEffect(() => {
    fetcher(`hotels/list?limit=1000`)
      .then((data) => {
        if (data !== undefined) {
          setHotelsList(data.data);
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

  const onHotelChange = (hotel) => {
    setObjectHotel(hotel);
    setSelectedHotel(hotel);
    reservationObj.hotel_id = hotel.value;
    //to get availability
    handleHotelChange(hotel.value);
  };

  const onClientChange = (client) => {
    setObjectClient(client);
    setSelectedClient(client);
    reservationObj.client_id = client.value;
  };

  const onPaymentChange = (payment) => {
    setObjectPayment(payment);
    reservationObj.payment_method_id = payment.value;
  };

  // const onGuestNameChange = (name) => {
  //   Reservation.handleGuestName(name);
  //   reservationObj.guestName = name;
  // };

  // const onNumberOfGuestsChange = (guests) => {
  //   Reservation.handleNumberOfGuests(guests);
  //   reservationObj.numberofguests = guests;
  // };

  useEffect(() => {
    if (selectedHotel) handleHotel(selectedHotel);
  }, [selectedHotel]);

  useEffect(() => {
    if (selectedHotel && selectedClient) {
      if (selectedHotel.isVat || selectedClient.isVat) {
        handleVatPercent(0.15);
      } else handleVatPercent(0);
    }
  }, [selectedHotel, selectedClient]);

  // useEffect(() => {
  //   console.log("Hotels", Hotels);
  // }, [Hotels]);

  // useEffect(() => {
  //   if (selectedClient) Reservation.handleClient(selectedClient);
  // }, [selectedClient]);

  useEffect(() => {
    if (hotel) {
      // handleHotelChange(hotel.value);
      reservationObj.hotel_id = hotel.value;
    }
  }, [hotel]);
  console.log("paymentMethods", paymentMethods);
  useEffect(() => {
    if (data) {
      const hotel = HotelsList?.filter((hotel) => hotel.id === data.hotel_id);
      setObjectHotel(
        hotel?.map((hotel) => ({
          value: hotel.id,
          label: hotel.brand,
          isVat: hotel.isVat,
        }))
      );

      setObjectClient(
        Clients.filter((client) => client.id === data.client_id)?.map(
          (client) => ({
            value: client.id,
            label: client.name,
            isVat: client.isVat,
          })
        )
      );

      setObjectPayment(
        paymentMethods
          .filter((method) => method.id === data.payment_method_id)
          ?.map((method) => ({
            value: method.id,
            label: method.title,
          }))
      );
      //change hotel to id instead of name
      reservationObj.hotel_id = data.hotel_id;
      reservationObj.client_id = data.client_id;
      reservationObj.payment_method_id = data.payment_method_id;
      // reservationObj.numberofguests = data.numberofguests;
      // reservationObj.guestName = data.guestName;
    }
  }, [data]);

  return (
    <div className="row">
      <div className="col-md-3 col-sm-12 d-flex flex-column">
        <label className="filter-lable">Hotel</label>
        {type ? (
          <SelectInputType
            value={objectHotel ? objectHotel : hotel}
            // value={Reservation?.hotel}
            className="input"
            type="hotel"
            isMulti={false}
            isClearable={false}
            placeholder="select hotel"
            options={HotelsList.map((hotel) => ({
              value: hotel?.id,
              label: hotel?.brand,
              isVat: hotel?.isVat,
            }))}
            // options={Hotels.map((hotel) => ({
            //   value: hotel.id,
            //   label: hotel.brand,
            // }))}
            onChange={onHotelChange}
          />
        ) : (
          // <input
          //   type="text"
          //   value={objectHotel && objectHotel[0]?.label}
          //   className="edit-reservation-hotel-input"
          // />
          <div>{objectHotel ? objectHotel[0]?.label : "No Hotel"}</div>
        )}
      </div>
      <div className="col-1 d-flex flex-column pt-3 justify-content-center">
        <button
          className="btn no-border "
          onClick={() => navigate("/hotels/create")}
        >
          <FaHotel /> <BsPlusCircle />
        </button>
      </div>

      <div className="col-md-3 col-sm-12">
        <label className="filter-lable">Client</label>
        <SelectInputType
          type="client"
          className="input"
          value={objectClient && objectClient}
          placeholder="select client"
          isMulti={false}
          isClearable={false}
          options={Clients.map((client) => ({
            value: client.id,
            label: client.name,
            isVat: client.isVat,
          }))}
          onChange={onClientChange}
        />
      </div>

      <div className="col-md-3 col-sm-12">
        <label className="filter-lable">Payment Method</label>
        <SelectInputType
          type="payment"
          className="input"
          value={objectPayment && objectPayment}
          placeholder="select payment method"
          isMulti={false}
          isClearable={false}
          options={paymentMethods?.map((method) => ({
            value: method.id,
            label: method.title,
          }))}
          onChange={onPaymentChange}
        />
      </div>

      {/* <div className="col-md-4 col-sm-12">
        <label className="filter-lable">Guest Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Guest Name"
          defaultValue={data?.guestName}
          onBlur={(e) => onGuestNameChange(e.target.value)}
        />
      </div> */}

      {/* <div className="col-md-2 col-sm-12">
        <label className="filter-lable">Number of Guests</label>
        <input
          type="number"
          className="form-control"
          placeholder="number of guests"
          defaultValue={data?.numberofguests}
          max={10}
          min={1}
          onBlur={(e) => onNumberOfGuestsChange(e.target.value)}
        />
      </div> */}
    </div>
  );
};

export default ReservationData;
