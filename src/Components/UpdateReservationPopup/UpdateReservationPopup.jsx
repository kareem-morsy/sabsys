import React, { useState, useContext, useEffect } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import ReactTooltip from "react-tooltip";
import "reactjs-popup/dist/index.css";
import Popup from "reactjs-popup";
import moments from "moment";
import {
  getReservationById,
  updateReservation,
} from "../../Services/Reservations";
import "./UpdateReservationPopup.css";
import PricePopup from "../PricePopup/PricePopup";
import Night from "../../Pages/Dashboard/Night/Night";
import RequestContext from "../../Context/RequestContext";
import { getAvailability } from "../../Services/Availability";
import ReservationContext from "../../Context/ReservationContext";
import ReservationData from "../../Pages/Dashboard/ReservationData/ReservationData";
import { useNavigate } from "react-router-dom";
import useToken from "../../customHooks/useToken";
import fetcher from "../../Services/fetcher";

const UpdateReservationPopup = ({ id, handleCalenderPopup }) => {
  const [reservationTotalPrice, setReservationTotalPrice] = useState();
  const [showPriceBreakdow, setShowPriceBreakdow] = useState(false);
  const [availableRoomsCount, setAvailableRoomsCount] = useState();
  const [availabilityParams, setAvailabilityParams] = useState();
  const [availableRoomsData, setAvailableRoomsData] = useState();
  const [reservationVat, setReservationVat] = useState();
  const [nightsCount, setNightsCount] = useState([]);
  const [slotId, setslotId] = useState();
  const [data, setData] = useState();

  const { state, vatPercent } = useContext(ReservationContext);
  // const { Refresh } = useContext(RequestContext);
  const [refreshState, setRefreshState] = useState(null);
  const navigate = useNavigate();
  const Refresh = (state) => {
    setRefreshState(state);
  };

  // useEffect(() => {
  //   if (id) {
  //     fetcher(`reservations/${id}`)
  //       .then((res) => {
  //         // console.log("dataaaa", res.data);
  //         setData(res.data);
  //       })
  //       .catch((err) => {
  //         // console.log("err", err);
  //         alert.show(err.message);
  //       });
  //   }
  // }, [id]);
  // useEffect(() => {
  //   console.log("showCalenderPopupid", id);
  // }, [id]);

  const changeSlotId = (id) => setslotId(id);
  const removeNight = (nights) => setNightsCount(nights);
  const handlePricePopup = (isShown) => setShowPriceBreakdow(isShown);
  const addNight = (night) => {
    // console.log("night", night);
    setNightsCount((prev) => [...prev, night]);
  };

  const handleDateChange = (from, to) => {
    setAvailabilityParams((prevState) => ({
      ...prevState,
      from: from,
      to: to,
    }));
  };
  const handleRoomTypeChange = (type) => {
    setAvailabilityParams((prevState) => ({
      ...prevState,
      room_type: type,
    }));
  };
  const handleRoomViewChange = (view) =>
    setAvailabilityParams((prevState) => ({
      ...prevState,
      room_view: view,
    }));

  const calculateTotal = () => {
    const nightsObj = [...nightsCount];
    const newState = nightsObj.map((obj) => {
      let totalPrice = 0;
      let newTotalPrice = 0;
      // totalPrice += Number(obj.meal_price);
      // newTotalPrice += Number(obj.meal_price);
      totalPrice += obj.nights?.length
        ? Number(obj.meal_price) * obj.nights?.length
        : Number(obj.meal_price);
      newTotalPrice += obj.nights?.length
        ? Number(obj.meal_price) * obj.nights?.length
        : Number(obj.meal_price);
      obj.nights?.map((night) => {
        totalPrice += Number(night.nightPrice);
        if (night.selling_price && night.selling_price !== 0)
          newTotalPrice += Number(night.selling_price);
        else newTotalPrice += Number(night.nightPrice);
        night.extras?.map((option) => {
          totalPrice += option.price;
          newTotalPrice += option.price;
        });
      });

      obj.oldTotal = totalPrice;
      obj.sub_total = totalPrice === newTotalPrice ? 0 : newTotalPrice;
      obj.vat = vatPercent * newTotalPrice;
      obj.total =
        obj.sub_total !== 0 ? obj.sub_total + obj.vat : obj.oldTotal + obj.vat;
      //added
      // if (!obj.nights?.length) obj.count = 0;
      if (obj.count) {
        obj.oldTotal = Number(obj.count) * totalPrice;
        obj.sub_total =
          totalPrice === newTotalPrice ? 0 : Number(obj.count) * newTotalPrice;
        obj.vat = vatPercent * newTotalPrice * obj.count;
        obj.total =
          obj.sub_total !== 0
            ? obj.sub_total + obj.vat
            : obj.oldTotal + obj.vat;
      }
      return obj;
    });
    setNightsCount(newState);
  };

  const createRoom = (night, nightExtras) => {
    const nightsObj = [...nightsCount];
    const newState = nightsObj.map((obj) => {
      if (obj.id === night?.id) {
        obj.nights = nightExtras;
        obj.numberOfNights = nightExtras.length;
      }
      return obj;
    });
    setNightsCount(newState);
  };

  const updateNight = (id = null, night) => {
    const nightsObj = [...nightsCount];
    const newState = nightsObj.map((obj) => {
      // 👇️ if id equals 2 replace object
      if (obj.id === id) {
        let index = obj.nights.findIndex(
          // (obj) => obj.night_id === night.id *
          (obj) => obj.night_id === night.night_id
        );
        obj.nights[index].night_id = night.night_id;
        obj.nights[index].selling_price = Number(night.selling_price);
        return obj;
      }
      if (obj.id === night?.id) {
        return night;
      }
      // 👇️ otherwise return object as is
      return obj;
    });
    setNightsCount(newState);
    calculateTotal();
  };

  const handleConfirm = () => {
    reservationObj.id = data.id;
    reservationObj.user_id = data?.user_id;
    reservationObj.slots = nightsCount;
    reservationObj.status_id = 1;
    console.log("confirm", reservationObj);

    //post reservationObject
    updateReservation(data.id, reservationObj)
      .then((res) => {
        alert.show(res);
        Refresh("reservations");
        handleCalenderPopup(false, undefined);
        console.log("success");
        alert.show("success");
        navigate(`/reservations`);
        Refresh();
      })
      .catch((err) => {
        console.log("err", err);
        alert.show(err);
      });
  };

  useEffect(() => {
    if (state)
      handleDateChange(
        moments(state[0]?.startDate).format("YYYY-MM-DD"),
        moments(state[0]?.endDate).format("YYYY-MM-DD")
      );
  }, [state]);
  const { token } = useToken();
  //availability per slot **
  useEffect(() => {
    if (availabilityParams) {
      fetcher("availability?", availabilityParams)
        .then((res) => {
          let roomsStock = res.data.reduce(
            (total, currentItem) =>
              (total = Number(total) + Number(currentItem.stock)),
            0
          );
          setAvailableRoomsCount(roomsStock);
          setAvailableRoomsData(res.data);
        })
        .catch((err) => alert.show(err.message));
    }
  }, [availabilityParams]);

  useEffect(() => {
    let priceCount = nightsCount.reduce(
      (total, currentItem) =>
        currentItem.sub_total !== 0
          ? (total = total + currentItem.sub_total)
          : (total = total + currentItem.oldTotal),
      0
    );
    let vatCount = priceCount * vatPercent;
    setReservationTotalPrice(priceCount);
    reservationObj.sub_total = priceCount;
    reservationObj.total = priceCount + vatCount;
    setReservationVat(vatCount);
    reservationObj.vat = vatCount;
  }, [nightsCount]);

  useEffect(() => {
    if (data) {
      console.log("data?.slots", data?.slots);
      setNightsCount(data?.slots);
      setAvailabilityParams({
        hotel_id: data.hotel_id,
        from: data.slots[0].from_date,
        to: data.slots[0].to_date,
        room_type: data.slots[0].room_type_id,
        room_view: data.slots[0].room_view_id,
      });
      reservationObj.client_id = data.client_id;
      reservationObj.hotel_id = data.hotel_id;
      reservationObj.payment_method_id = data.payment_method_id;
      console.log("reservationObj", reservationObj);
    }
  }, [data]);

  return (
    <Popup
      onClose={() => handleCalenderPopup(false, undefined)}
      open={true}
      closeOnDocumentClick
      className="preview-popup"
    >
      <div className="m-auto h-100">
        <div className="popup-date-picker">
          <ReservationData {...{ reservationObj, data }} />
        </div>
        {nightsCount.length > 0 && (
          <div className="nights-div">
            {nightsCount.map((night, index) => (
              <Night
                key={index}
                {...{
                  data,
                  index,
                  night,
                  slotId,
                  addNight,
                  createRoom,
                  updateNight,
                  nightsCount,
                  removeNight,
                  changeSlotId,
                  calculateTotal,
                  handleDateChange,
                  availableRoomsData,
                  availableRoomsCount,
                  handleRoomViewChange,
                  handleRoomTypeChange,
                }}
              />
            ))}
          </div>
        )}
      </div>

      <div className="popup-actions">
        <div
          data-tip="Price Breakdown"
          data-place="left"
          data-type="info"
          data-effect="solid"
          data-background-color="#d49e1f"
          data-text-color="#fff"
          onClick={() => setShowPriceBreakdow(true)}
        >
          <AiOutlineInfoCircle />
        </div>
        <div className="total-div">
          <div>
            <span>Total: </span>{" "}
            <span className="main-color"> ${reservationTotalPrice}</span>
          </div>
          <div className="vat">
            <span>Vat: </span> <span>${reservationVat}</span>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-confirm"
          onClick={handleConfirm}
        >
          Confirm
        </button>
        <button
          type="button"
          className="btn btn-cancel"
          onClick={() => handleCalenderPopup(false, undefined)}
        >
          Cancel
        </button>
      </div>
      {showPriceBreakdow && (
        <PricePopup
          {...{
            handlePricePopup,
            nightsCount,
            reservationTotalPrice,
            reservationVat,
          }}
        />
      )}
      <ReactTooltip />
    </Popup>
  );
};

export default UpdateReservationPopup;
const reservationObj = {
  id: null, // noy used
  user_id: null,
  client_id: null,
  hotel_id: null,
  payment_method_id: null,
  status_id: null,
  sub_total: null,
  vat: null,
  total: null,
  slots: [],
};
