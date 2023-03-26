import React, { useState, useEffect, useContext } from "react";

import "./PricePopup.css";
import types from "../../Data/RoomType.json";
import views from "../../Data/RoomView.json";
import RequestContext from "../../Context/RequestContext";
import { getRoomTypes } from "../../Services/RoomTypes";
import { getRoomViews } from "../../Services/RoomViews";
import useToken from "../../customHooks/useToken";
import fetcher from "../../Services/fetcher";
const PricePopup = ({
  nightsCount,
  reservationVat,
  handlePricePopup,
  reservationTotalPrice,
}) => {
  const [extrasPrice, setExtrasPrice] = useState();
  const [RoomTypes, setRoomTypes] = useState([]);
  const [RoomViews, setRoomViews] = useState([]);
  const [ERROR, setError] = useState();
  const [refreshState, setRefreshState] = useState(null);
  const Refresh = (state) => {
    setRefreshState(state);
  };
  // const { RoomTypes, RoomViews } = useContext(RequestContext);
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
  useEffect(() => {
    if (nightsCount.length > 0) {
      let arr = [];
      nightsCount?.map((slot) => {
        slot.nights.map((night) => arr.push(...night.extras));
      });

      setExtrasPrice(
        arr.reduce(
          (total, currentItem) =>
            (total = Number(total) + Number(currentItem.price)),
          0
        )
      );
    }
  }, [nightsCount]);

  return (
    <div className="pop-background" onClick={() => handlePricePopup(false)}>
      <div className="price-popup">
        <div className="title">Price Brekdown</div>

        <div className="price-breakdown">
          <div className="breakdown">
            {nightsCount &&
              nightsCount.map((slot, index) => (
                <div key={index} className="row mx-2">
                  <div className="col-6">
                    <span>
                      {
                        RoomTypes.find((type) => type.id === slot.room_type_id)
                          ?.title
                      }
                    </span>{" "}
                    -{" "}
                    <span>
                      {
                        RoomViews.find((view) => view.id === slot.room_view_id)
                          ?.title
                      }
                    </span>
                  </div>
                  <span className="col-3">{slot.nights.length} nights</span>
                  <span className="col-3">
                    $
                    {slot.nights.reduce(
                      (total, currentItem) =>
                        (total =
                          total +
                          Number(
                            currentItem.selling_price || currentItem.nightPrice
                          )),
                      0
                    )}
                  </span>
                </div>
              ))}
          </div>
          <div className="exclude-charges">
            <p>Exclude Charges</p>
            <div className="row mx-2 charges-details">
              <span className="col-4">Extras Charge: </span>
              <span className="col-8"> ${extrasPrice}</span>
            </div>
            <div className="row mx-2 charges-details">
              <span className="col-4">Vat:</span>
              <span className="col-8">${reservationVat}</span>
            </div>
          </div>
        </div>

        <div className="row mx-2 total">
          <div className="col-12">Total: ${reservationTotalPrice}</div>
        </div>

        <div className="row mx-2 total">
          <div className="col-12">
            Total With Vat: ${reservationTotalPrice + reservationVat}
          </div>
        </div>

        <div className="row mx-2 close-div">
          <button
            type="button"
            className="col-12 btn btn-confirm"
            onClick={() => handlePricePopup(false)}
          >
            Close
          </button>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default PricePopup;

// import React, { useState, useEffect } from "react";

// import "./PricePopup.css";
// import types from "../../Data/RoomType.json";
// import views from "../../Data/RoomView.json";

// const PricePopup = ({
//   nightsCount,
//   reservationVat,
//   handlePricePopup,
//   reservationTotalPrice,
// }) => {
//   const [extrasPrice, setExtrasPrice] = useState();

//   useEffect(() => {
//     let arr = [];

//     nightsCount.map((night) =>
//       night.extras.map((extra) => arr.push(...extra.extra))
//     );

//     setExtrasPrice(
//       arr.reduce(
//         (total, currentItem) =>
//           (total = Number(total) + Number(currentItem.price)),
//         0
//       )
//     );
//   }, [nightsCount]);

//   return (
//     <div className="pop-background" onClick={() => handlePricePopup(false)}>
//       <div className="price-popup">
//         <div className="title">Price Brekdown</div>

//         <div className="price-breakdown">
//           <div className="breakdown">
//             {nightsCount &&
//               nightsCount.map((night) => (
//                 <div className="row mx-2">
//                   <div className="col-6">
//                     <span>{types.find(type => type.id === night.roomType)?.type}</span> - {" "}
//                     <span>{views.find(view => view.id === night.roomView)?.view}</span>
//                   </div>
//                   <span className="col-3">{night.numberOfNights} nights</span>
//                   <span className="col-3">
//                     $
//                     {night.extras.reduce(
//                       (total, currentItem) =>
//                         (total =
//                           total +
//                           Number(
//                             currentItem.selling_price || currentItem.nightPrice
//                           )),
//                       0
//                     )}
//                   </span>
//                 </div>
//               ))}
//           </div>
//           <div className="exclude-charges">
//             <p>Exclude Charges</p>
//             <div className="row mx-2 charges-details">
//               <span className="col-4">Extras Charge: </span>
//               <span className="col-8"> ${extrasPrice}</span>
//             </div>
//             <div className="row mx-2 charges-details">
//               <span className="col-4">Vat:</span>
//               <span className="col-8">${reservationVat}</span>
//             </div>
//           </div>
//         </div>

//         <div className="row mx-2 total">
//           <div className="col-12">Total: ${reservationTotalPrice}</div>
//         </div>

//         <div className="row mx-2 total">
//           <div className="col-12">
//             Total With Vat: ${reservationTotalPrice + reservationVat}
//           </div>
//         </div>

//         <div className="row mx-2 close-div">
//           <button
//             type="button"
//             className="col-12 btn btn-confirm"
//             onClick={() => handlePricePopup(false)}
//           >
//             Close
//           </button>
//         </div>
//         {/* </div> */}
//       </div>
//     </div>
//   );
// };

// export default PricePopup;
