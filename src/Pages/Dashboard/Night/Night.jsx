import React, { useState, useEffect, useContext } from "react";
import { v4 as uuid } from "uuid";
import { BsFilePerson } from "react-icons/bs";

import "./Night.css";
import Actions from "./Actions/Actions";
import NightDetails from "./NightDetails/NightDetails";
import RequestContext from "../../../Context/RequestContext";
import DatePicker from "../../../Components/DatePicker/DatePicker";
import ReservationContext from "../../../Context/ReservationContext";
import DeletePopup from "../../../Components/DeletePopup/DeletePopup";
import { SelectInputType } from "../../../Components/Select/SelectInputType";
import GuestsNamesPopup from "../../../Components/GuestsNamesPopup/GuestsNamesPopup";
import { getRoomTypes } from "../../../Services/RoomTypes";
import { getRoomViews } from "../../../Services/RoomViews";
import { getMeals } from "../../../Services/Meals";
import FetchDataHook from "../../../customHooks/fetchDataHook";
import { getAllData } from "../../../Services/getAllData";
import useToken from "../../../customHooks/useToken";
import fetcher from "../../../Services/fetcher";

const Night = ({
  type,
  data,
  night,
  index,
  slotId,
  addNight,
  createRoom,
  removeNight,
  updateNight,
  nightsCount,
  changeSlotId,
  calculateTotal,
  handleDateChange,
  availableRoomsData,
  availableRoomsCount,
  handleRoomViewChange,
  handleRoomTypeChange,
}) => {
  console.log("NightComponent", night);
  const [objectMeal, setObjectMeal] = useState();
  const [showDetails, setShowDetails] = useState(false);
  const [objectRoomType, setObjectRoomType] = useState();
  const [objectRoomView, setObjectRoomView] = useState();
  const [roomsCountValue, setRoomsCountValue] = useState(1);
  const [numberOfGuests, setNumberOfGuests] = useState([
    { id: uuid(), name: null, confirmation_number: null },
  ]);
  const [showGuestsPopup, setShowGuestsPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const { handleRoomType, handleRoomView, handleState, vatPercent } =
    useContext(ReservationContext);
  // const { RoomTypes, RoomViews, Meals } = useContext(RequestContext);
  const [RoomTypes, setRoomTypes] = useState([]);
  const [RoomViews, setRoomViews] = useState([]);
  const [Meals, setMeals] = useState([]);
  const [ERROR, setError] = useState();
  const [refreshState, setRefreshState] = useState(null);

  const Refresh = (state) => {
    setRefreshState(state);
  };
  useEffect(() => {
    fetcher(`room-types?page=1&limit=1000`)
      .then((data) => {
        if (data !== undefined) {
          console.log("newFetchRoomTypes", data.data);
          setRoomTypes(data.data);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [refreshState]);
  useEffect(() => {
    fetcher(`room-views?page=1&limit=1000`)
      .then((data) => {
        if (data !== undefined) {
          setRoomViews(data.data);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);
  useEffect(() => {
    fetcher(`meals?page=1&limit=1000`)
      .then((data) => {
        if (data !== undefined) {
          setMeals(data.data);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);
  const handleDetails = () => setShowDetails((prev) => !prev);
  const handleDeletePopup = (isShown) => setShowDeletePopup(isShown);
  const handleGuestsPopup = (isShown) => setShowGuestsPopup(isShown);

  const handleMeal = (meal) => {
    setObjectMeal(meal);
    night.meal_id = meal.value;
    night.meal_price = Number(meal.price);
    // debugger;
    updateNight(null, night);
  };

  const changeRoomType = (type) => {
    handleRoomType(type);
    setObjectRoomType(type);
    night.room_type_id = type.value;
    updateNight(null, night);
    handleRoomTypeChange(type.value);
    changeSlotId(night.id);
  };

  const changRoomView = (view) => {
    handleRoomView(view);
    setObjectRoomView(view);
    night.room_view_id = view.value;
    updateNight(null, night);
    handleRoomViewChange(view.value);
    changeSlotId(night.id);
  };

  const handleGuestsValues = (guests) => setNumberOfGuests(guests);

  const handleRoomsCount = (nights) => {
    console.log("fffffffffffffffffff", nights);
    changeSlotId(night.id);
    night.count = Number(nights);

    // use case for update
    if (nights < night.guests?.length && night.guests?.length > 1)
      night.guests.pop();
    else
      night.guests?.push({ id: uuid(), name: null, confirmation_number: null });

    // use case for create
    if (nights < numberOfGuests.length && numberOfGuests.length > 1) {
      let NumberOfRoomsObj = [...numberOfGuests];
      NumberOfRoomsObj.pop();
      setNumberOfGuests(NumberOfRoomsObj);
    } else
      setNumberOfGuests((prev) => [
        ...prev,
        { id: uuid(), name: null, confirmation_number: null },
      ]);
    setRoomsCountValue(nights);
    night.count = Number(nights);
    console.log(night.count);
    updateNight(null, night);
    calculateTotal();
  };

  const handleRoomsCountValue = (count) => {
    setRoomsCountValue(count);
    night.count = Number(count);
    calculateTotal();
  };

  const handleDelete = (id) => {
    let filteredNights = nightsCount.filter((night) => night.id !== id);
    if (filteredNights.length > 0) {
      removeNight(filteredNights);
      setShowDeletePopup(false);
    }
  };

  useEffect(() => {
    console.log("NightGetendata", data);
    if (data && !type) changeSlotId(night.id);
  }, [data]);
  useEffect(() => {
    console.log("night in useEffect", night);
    //in edit mode
    // if (night && type && availableRoomsData) {
    if (night && type) {
      // console.log("rrrrrrrrrrrrrrrr");
      countNights(night, createRoom, calculateTotal);
      setRoomsCountValue(night.count);
    }
    if (night && type === undefined) setRoomsCountValue(night.count);
  }, [night]);

  useEffect(() => {
    //in update
    if (night && type === undefined) {
      handleState(
        [
          {
            endDate: new Date(night.to_date),
            endDateHijri: night.to_hijri_date,
            key: "selection",
            startDate: new Date(night.from_date),
            startDateHijri: night.from_hijri_date,
          },
        ],
        "night"
      );

      setObjectRoomType(
        RoomTypes.filter((type) => type.id === night.room_type_id)?.map(
          (type) => ({
            value: type.id,
            label: type.type,
          })
        )
      );
      setObjectRoomView(
        RoomViews.filter((view) => view.id === night.room_view_id)?.map(
          (view) => ({
            value: view.id,
            label: view.view,
          })
        )
      );
      setObjectMeal(
        Meals.filter((meal) => meal.id === night.meal_id)?.map((meal) => ({
          value: meal.id,
          label: meal.name,
        }))
      );
    }
  }, [night, type, RoomTypes, RoomViews, Meals]);

  useEffect(() => {
    if (slotId && slotId === night.id) {
      if (availableRoomsData) {
        night.nights = availableRoomsData[0]?.nights.map((n) => ({
          night_id: n.id,
          date: n.date,
          nightPrice: n.selling_price,
          selling_price: n.selling_price,
          extras: [],
          count: night.count,
        }));
        night.meals = availableRoomsData[0]?.meals;
        night.extras = availableRoomsData[0]?.extras;
        night.min_availability = availableRoomsData[0]?.min_availability;
        updateNight(null, night);
      }
      // night?.nights?.map(night => night.extras = [])
      // if(!night.min_availability)  {
      //   night.nights = [];
      //   updateNight(null, night);
      // }
    }
    // else {
    //   console.log("mmmmmm111", night);
    //   night.nights = [];
    //   console.log("mmmmmm2222", night);
    // }
  }, [slotId, availableRoomsData]);

  useEffect(() => {
    if (numberOfGuests && type) night.guests = numberOfGuests;
  }, [numberOfGuests]);

  return (
    <div className="night row m-0">
      <div id={night.id} className="night-div row mx-0 my-1">
        <DatePicker
          type="popup"
          srcType={type}
          {...{
            night,
            createRoom,
            updateNight,
            changeSlotId,
            calculateTotal,
            handleDateChange,
          }}
        />
        <Actions
          {...{
            addNight,
            handleDetails,
            showDetails,
            handleDeletePopup,
            index,
          }}
        />

        <div className="mt-3 col-md-2 col-sm-12 m-auto">
          <SelectInputType
            value={objectRoomType && objectRoomType}
            className="input"
            type="type"
            isMulti={false}
            isClearable={false}
            placeholder="Room Type"
            options={RoomTypes.map((type) => ({
              value: type.id,
              label: type.type,
            }))}
            onChange={changeRoomType}
          />
        </div>

        <div className="mt-3 col-md-2 col-sm-12 m-auto">
          <SelectInputType
            value={objectRoomView && objectRoomView}
            className="input"
            type="view"
            isMulti={false}
            isClearable={false}
            placeholder="Room View"
            options={RoomViews.map((view) => ({
              value: view.id,
              label: view.view,
            }))}
            onChange={changRoomView}
          />
        </div>

        <div className="mt-3 col-md-3 col-sm-12 m-auto">
          <SelectInputType
            className="input"
            type="meals"
            isMulti={false}
            isClearable={false}
            placeholder="Meals"
            value={objectMeal && objectMeal}
            options={night?.meals?.map((meal) => ({
              value: meal.id,
              label: meal.title,
              price: meal.selling_price,
            }))}
            onChange={handleMeal}
          />
        </div>

        <div className="mt-3 col-md-2 col-sm-12 m-auto d-flex justify-content-start align-items-center">
          <input
            type="number"
            min={1}
            max={availableRoomsCount}
            className="form-control rooms-count"
            placeholder="rooms"
            value={
              numberOfGuests.length > availableRoomsCount
                ? availableRoomsCount
                : roomsCountValue
            }
            onChange={(e) => handleRoomsCount(e.target.value)}
          />
          <BsFilePerson
            onClick={() => setShowGuestsPopup((prev) => !prev)}
            className="guestName-icon"
          />
        </div>

        <div className="mt-3 price-div col-md-2 col-sm-12 m-auto">
          <div>
            Total:{" "}
            {night?.oldTotal >= 0 && (
              <span
                className={`${
                  night?.sub_total !== 0 && night?.sub_total !== night?.oldTotal
                    ? "price"
                    : ""
                }`}
              >
                ${night?.oldTotal}
              </span>
            )}
            {night?.sub_total !== 0 && night?.sub_total !== night?.oldTotal ? (
              <span>${night?.sub_total}</span>
            ) : (
              ""
            )}
          </div>
          <div>
            Vat: ${" "}
            {night?.sub_total !== 0
              ? vatPercent * Number(night?.sub_total)
              : vatPercent * Number(night?.oldTotal)}{" "}
          </div>
        </div>
        {night?.min_availability > 0 ? (
          <span className="availability-div">
            {night?.min_availability} rooms available
          </span>
        ) : (
          <span className="availability-div">no available rooms</span>
        )}
      </div>

      <div className={`${showDetails ? "details-div" : "hide-details-div"}`}>
        {night?.nights?.map((extraNight, index) => (
          <NightDetails
            key={index}
            extras={night.extras ? night?.extras : []}
            availableNights={night.nights}
            {...{
              type,
              night,
              extraNight,
              updateNight,
              calculateTotal,
            }}
          />
        ))}
      </div>

      {showDeletePopup && (
        <DeletePopup {...{ handleDeletePopup, handleDelete, night }} />
      )}

      {showGuestsPopup && (
        <GuestsNamesPopup
          nightObj={night}
          {...{
            type,
            numberOfGuests,
            showGuestsPopup,
            handleGuestsPopup,
            handleGuestsValues,
            handleRoomsCountValue,
          }}
        />
      )}
    </div>
  );
};

export default Night;

export const countNights = (
  night,
  // availableRoomsData,
  newRoom,
  calculateTotal
) => {
  let arr = [];
  if (night?.nights?.length > 0) {
    for (let i = 0; i < night.nights?.length; i++) {
      arr.push({
        night_id: night?.nights[i]?.id,
        date: night?.nights[i]?.date,
        nightPrice: night?.nights[i]?.selling_price,
        selling_price: night?.nights[i]?.selling_price,
        extras: [],
        count: night.count,
      });
    }
    // console.log("arr1",arr)
  }
  // console.log("arr2",arr)
  newRoom(night, arr);
  calculateTotal();
};
