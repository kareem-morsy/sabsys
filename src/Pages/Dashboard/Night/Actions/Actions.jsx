import React, { useContext, useEffect } from "react";
import moments from "moment";
import { v4 as uuid } from "uuid";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import ReservationContext from "../../../../Context/ReservationContext";

const Actions = ({
  index,
  addNight,
  showDetails,
  handleDetails,
  handleDeletePopup,
}) => {
  const nightObject = { ...night };
  nightObject.id = uuid();

  const { state } = useContext(ReservationContext);

  useEffect(() => {
    console.log("state[0]", state[0]);
    if (state[0] !== undefined) {
      nightObject.from_date = moments(state[0]?.startDate).format("YYYY-MM-DD");
      nightObject.from_hijri_date = moments(state[0]?.startDateHijri).format(
        "YYYY-MM-DD"
      );
      nightObject.to_date = moments(state[0]?.endDate).format("YYYY-MM-DD");
      nightObject.to_hijri_date = moments(state[0]?.endDateHijri).format(
        "YYYY-MM-DD"
      );
      console.log("nightObject", nightObject);
    }
  }, [state]);

  return (
    <div className="mt-3 col-md-1 col-sm-12">
      <div className="m-auto d-flex justify-content-evenly align-items-center">
        <div onClick={handleDetails}>
          {showDetails ? (
            <IoIosArrowUp className="mb-1 mx-auto" />
          ) : (
            <IoIosArrowDown className="mb-1 mx-auto" />
          )}
        </div>

        <AiOutlinePlusCircle
          onClick={() => addNight(nightObject)}
          className={`${index !== 0 && "m-auto"}`}
        />
        {index !== 0 && (
          <RiDeleteBin6Line
            onClick={() => handleDeletePopup(true)}
            className="m-auto delete-icon"
          />
        )}
      </div>
    </div>
  );
};

export default Actions;

const night = {
  id: null,
  to_date: null,
  from_date: null,
  to_hijri_date: null,
  from_hijri_date: null,
  key: "selection",
  count: 1,
  numberOfNights: null,
  room_type_id: null,
  room_view_id: null,
  meal_price: null,
  meal_id: null,
  oldTotal: null,
  total: null,
  sub_total: null,
  vat: null,
  nights: [],
  guests: [],
};
