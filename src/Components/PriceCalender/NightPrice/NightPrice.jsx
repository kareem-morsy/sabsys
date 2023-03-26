import React, { useEffect, useRef } from "react";

import "./NightPrice.css";

const NightPrice = ({ handleNightPricePopup, handlePrice }) => {
  const inputRef = useRef();

  const handleConfirm = (e) => {
    if (e.key === "Enter" || e.key === undefined) {
    handlePrice(inputRef.current.value);
    handleNightPricePopup(false);
    }
  };

  // useEffect(() => {
    // inputRef.current.focus(); 
  // }, []);

  return (
    <div
      className="night-pop-background"
      // onClick={() => handleNightPricePopup(false)}
    >
      <div className="night-popup">
        <label htmlFor="price-input">Night Price</label>
        <input
          id="price-input"
          className="form-control"
          ref={inputRef}
          type="number"
          min={0}
          placeholder="enter night price"
          onKeyUp={(e) => handleConfirm(e)}
        />

        <div className="night-popup-actions">
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
  );
};

export default NightPrice;
