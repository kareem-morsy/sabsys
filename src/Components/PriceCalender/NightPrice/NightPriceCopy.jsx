import React, { useState, useEffect, useRef } from "react";
import moments from "moment";
import moment from "moment-hijri";
import { BiErrorCircle } from "react-icons/bi";

import "./NightPrice.css";

const NightPrice = ({
  endDay,
  startDay,
  nightPrice,
  handlePrice,
  handleNightPricePopup,
}) => {
  const [error, setError] = useState(false);

  const costRef = useRef();
  const sellingRef = useRef();

  const handleConfirm = (e) => {
    if (costRef.current.value === "" && sellingRef.current.value === "") {
      setError(true);
      return;
    } else if (costRef.current.value === "")
      costRef.current.value = sellingRef.current.value;
    else if (sellingRef.current.value === "")
      sellingRef.current.value = costRef.current.value;

    countNights(
      startDay,
      endDay,
      costRef.current.value,
      sellingRef.current.value
    );
  };

  const countNights = (startDate, endDate, costPrice, sellingPrice) => {
    const diffTime = Math.abs(new Date(startDate) - new Date(endDate));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let priceObject = {
      date: startDay,
      cost_price: Number(costPrice),
      selling_price: Number(sellingPrice),
      hijri_date: moment(startDay).format("iYYYY-iMM-iDD"),
    };

    // if (diffDays === 1) handleDates(priceObject);
    if (diffDays === 1) handleDates([priceObject]);
    else {
      if (typeof diffDays === "number") {
        let arr = [];
        for (let i = 0; i < diffDays; i++) {
          arr.push({
            date: moments(startDate).add(i, "d").format("YYYY-MM-DD"),
            cost_price: Number(costPrice),
            selling_price: Number(sellingPrice),
            hijri_date: moment(startDay).add(i, "d").format("iYYYY-iMM-iDD"),
          });
        }
        handleDates(arr);
      }
    }
  };

  const filterByReference = (arr1, arr2) => {
    let res = [];
    res = arr1.filter((el) => {
      return !arr2.find((element) => {
        return element.date === el.date;
      });
    });
    return res;
  };

  const handleDates = (obj) => {
    // console.log(nightPrice);
    // console.log(obj);
    let eventsObj = [...nightPrice];
    // let filteredArr;

    // if (obj.length > 2) {
    //   filteredArr = filterByReference(eventsObj, obj);
    //   filteredArr.push(...obj);
    // } else {
    //   filteredArr = eventsObj.filter((event) => event.date !== startDay);
    //   filteredArr.push(obj);
    // }
    // handlePrice(filteredArr);
    handlePrice(obj);
    handleNightPricePopup(false);
  };

  useEffect(() => {
    costRef.current.focus();
  }, []);

  return (
    <div
      className="night-pop-background"
      // onClick={() => handleNightPricePopup(false)}
    >
      <div className="night-popup">
        <label htmlFor="price-input">Cost Price</label>
        <input
          id="price-input"
          className="form-control"
          ref={costRef}
          type="number"
          min={0}
          placeholder="enter night price"
        />

        <label htmlFor="price-input">Selling Price</label>
        <input
          id="price-input"
          className="form-control"
          ref={sellingRef}
          type="number"
          min={0}
          placeholder="enter night price"
        />

        <div className="night-popup-actions">
          <div>
            {error && (
              <>
                <BiErrorCircle className="m-1" /> <p>filelds can't be empty</p>
              </>
            )}
          </div>
          <div>
            <button
              type="button"
              className="btn btn-confirm"
              onClick={(e) => handleConfirm(e)}
            >
              Confirm
            </button>
            <button
              type="button"
              className="btn btn-cancel"
              onClick={() => handleNightPricePopup(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NightPrice;
