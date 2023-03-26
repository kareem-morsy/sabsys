import React, { useState, useContext } from "react";
import "./Filter.css";
import { SelectInputType } from "../Select/SelectInputType";
import ReservationContext from "../../Context/ReservationContext";
// import RequestContext from "../../Context/RequestContext";
import { useEffect } from "react";
// import { getHotelsList } from "../../Services/Hotels";
// import { getRoomTypes } from "../../Services/RoomTypes";
// import { getRoomViews } from "../../Services/RoomViews";
import fetcher from "../../Services/fetcher";
// import useToken from "../../customHooks/useToken";
const Filter = ({
  handleHotelChange,
  handleRoomTypeChange,
  handleRoomViewChange,
}) => {
  const ReservationData = useContext(ReservationContext);
  const [HotelsList, setHotelsList] = useState([]);
  const [RoomTypes, setRoomTypes] = useState([]);
  const [RoomViews, setRoomViews] = useState([]);
  const [ERROR, setError] = useState();
  const [refreshState, setRefreshState] = useState(null);
  const Refresh = (state) => {
    setRefreshState(state);
  };
  // Start Fetch Data
  // Fetch Hotels List
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
  // Fetch Room Types
  useEffect(() => {
    fetcher(`room-types`)
      .then((data) => {
        if (data !== undefined) {
          setRoomTypes(data.data);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);
  // Fetch Room Views
  useEffect(() => {
    fetcher(`room-views`)
      .then((data) => {
        if (data !== undefined) {
          setRoomViews(data.data);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);
  // End Fetch Data

  // const { Hotels, HotelsList, RoomTypes, RoomViews, Refresh } =
  //   useContext(RequestContext);

  const onHotelChange = (hotel) => {
    if (hotel) {
      handleHotelChange(hotel);
      ReservationData.handleHotel(hotel);
    }
  };
  const onRoomViewChange = (view) => {
    // console.log("FilterView", view);
    if (view) {
      handleRoomViewChange(view);
      ReservationData.handleRoomView(view);
    }
  };
  const onRoomTypeChange = (type) => {
    // console.log("Filtertype", type);
    if (type) {
      handleRoomTypeChange(type);
      ReservationData.handleRoomType(type);
    }
  };
  const onUpdateHotel = () => {
    // console.log("onUpdateHotel", HotelsList);
    setRefreshState(!refreshState);
  };

  return (
    <div className="calender_filter">
      <div className="row">
        <div className="col-md-4 col-sm-12" onClick={onUpdateHotel}>
          <label className="filter-lable">Hotels</label>
          <SelectInputType
            className="input"
            type="hotels"
            isMulti={false}
            isClearable={true}
            placeholder="select hotel"
            options={HotelsList?.map((hotel) => ({
              value: hotel.id,
              label: hotel.brand,
            }))}
            onChange={onHotelChange}
          />
        </div>

        <div className="col-md-4 col-sm-12">
          <label className="filter-lable">Room Type</label>
          <SelectInputType
            // defaultValue={ReservationData?.roomType}
            className="input"
            type="type"
            isMulti={false}
            isClearable={true}
            placeholder="select room type"
            options={RoomTypes?.map((type) => ({
              value: type.id,
              label: type.type,
            }))}
            onChange={onRoomTypeChange}
          />
        </div>

        <div className="col-md-4 col-sm-12">
          <label className="filter-lable">Room View</label>
          <SelectInputType
            // defaultValue={ReservationData?.roomView}
            className="input"
            type="view"
            isMulti={false}
            isClearable={true}
            placeholder="select room view"
            options={RoomViews?.map((view) => ({
              value: view.id,
              label: view.view,
            }))}
            onChange={onRoomViewChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Filter;
