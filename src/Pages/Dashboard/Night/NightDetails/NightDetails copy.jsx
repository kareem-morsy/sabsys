import React, { useState, useEffect } from "react";
import { MdModeEditOutline } from "react-icons/md";

import "./NightDetails.css";
import extras from "../../../../Data/Extras.json";
import { SelectInputType } from "../../../../Components/Select/SelectInputType";

const NightDetails = ({
  type,
  night,
  extraNight,
  updateNight,
  calculateTotal,
}) => {
  
  const [newPrice, setNewPrice] = useState(extraNight?.selling_price);
  const [extrasArr, setExtrasArr] = useState();
  const [editPrice, setEditPrice] = useState(false);
  const [chosenExtras, setChosenExtras] = useState(
    extraNight.extras.map((extra) => ({
      value: extra.extra_id,
      label: extra.name,
      isDisabled: extra.isActive === 0 ? true : false,
      price: extra.price,
      type: extra.type,
    }))
  );

  const onChooseExtras = (extras) => setChosenExtras(extras);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setNewPrice(e.target.value);
      setEditPrice(false);
    }
  };

  const handleBlur = (price) => {
    if (price === "") setNewPrice(null);
    else setNewPrice(price);
    setEditPrice(false);
  };

  const sliceArray = (arr, n) => {
    const array = arr.slice();
    const chunks = [];
    while (array.length) chunks.push(array.splice(0, n));
    setExtrasArr(chunks);
  };

  useEffect(() => {
    if (chosenExtras) {
      sliceArray(chosenExtras, 2);
      extraNight.extras = chosenExtras.map((extra) => ({
        // id: extra.value,
        extra_id: extra.value,
        night_id: 0,
        type: extra.type,
        name: extra.label,
        price: extra.price,
      }));
      updateNight(night.id, extraNight);
      // calculateTotal();
    }
  }, [chosenExtras]);

  useEffect(() => {
    if (newPrice) {
      extraNight.selling_price = newPrice;
      updateNight(night.id, extraNight);
    }
  }, [newPrice]);

  // useEffect(() => {
  //   extraNight.nightPrice = price;
  //   updateNight(night.id, extraNight);
  // }, []);

  // useEffect(() => {
  //   if (extraNight && type === undefined) {
  //     setChosenExtras(
  //       extraNight.extra.map((extra) => ({
  //         value: extra.extra_id,
  //         label: extra.name,
  //         isDisabled: extra.isActive === 0 ? true : false,
  //         price: extra.price,
  //         type: extra.type,
  //       }))
  //     );
  //   }
  // }, [extraNight]);

  return (
    <div className="night-div row mx-0 my-2">
      <div className="action-div col-md-2 col-sm-12">
        <span>{extraNight?.date}</span>
      </div>

      <div className="col-md-3 col-sm-12">
        <label className="filter-lable">Extras</label>
        <SelectInputType
          className="input"
          type="extras"
          // value={(type && test) ? test : chosenExtras}
          value={chosenExtras.length > 0 && chosenExtras}
          isMulti={true}
          isClearable={true}
          placeholder="Extras"
          options={extras.map((extra) => ({
            value: extra.id,
            label: extra.title,
            isDisabled: extra.isActive === 0 ? true : false,
            price: extra.price,
            type: extra.type,
          }))}
          onChange={onChooseExtras}
        />
      </div>

      <div className="price-div col-md-3 col-sm-12">
        <div>
          <span className="m-2">Night Price:</span>
          {editPrice ? (
            <input
              type="text"
              className="price-input"
              defaultValue={newPrice ? newPrice : extraNight?.nightPrice}
              onKeyUp={(e) => handleKeyPress(e)}
              onBlur={(e) => handleBlur(e.target.value)}
            />
          ) : (
            <>
              <span
                className={`${
                  newPrice && newPrice !== extraNight?.nightPrice ? "price" : ""
                }`}
              >
                {" "}
                ${extraNight?.nightPrice}
              </span>
              {newPrice && newPrice !== extraNight?.nightPrice ? (
                <span>{newPrice} </span>
              ) : (
                ""
              )}
              <MdModeEditOutline
                className="edit-icon"
                onClick={() => setEditPrice(true)}
              />
            </>
          )}
        </div>
      </div>
      <div className="extras-list col-md-4 col-sm-12">
        {extrasArr?.map((extrasArray, index) => (
          <div key={index}>
            {extrasArray.map((extra) => (
              <li>
                <span>{extra.label}:</span> ${extra.price}
              </li>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NightDetails;
