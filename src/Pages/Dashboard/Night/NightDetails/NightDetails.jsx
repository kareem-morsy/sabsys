import React, { useState, useEffect } from "react";
import { MdModeEditOutline } from "react-icons/md";

import "./NightDetails.css";
import { SelectInputType } from "../../../../Components/Select/SelectInputType";

const NightDetails = ({ type, night, extras, extraNight, updateNight }) => {
  const [newPrice, setNewPrice] = useState();
  const [extrasArr, setExtrasArr] = useState();
  const [editPrice, setEditPrice] = useState(false);
  const [chosenExtras, setChosenExtras] = useState(
    extraNight?.extras?.map((extra) => ({
      id: extra.id,
      extra_id: extra.extra_id,
      value: extra.id,
      label: extra.extra_name,
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
    console.log("NightDetalisGetendata", night);
    if (chosenExtras) {
      sliceArray(chosenExtras, 2);
      console.log("chosenExtras", chosenExtras);
      let slotExtra = chosenExtras.map((extra) => ({
        id: extra.id ? extra.id : null,
        extra_id: extra.id ? extra.extra_id : extra.value,
        night_id: extra.value,
        price: extra.price,
      }));
      console.log("slotExtra", slotExtra);
      console.log("extraNight?.extras", extraNight?.extras);
      extraNight.extras = slotExtra;
      updateNight(night.id, extraNight);
    }
  }, [chosenExtras]);

  useEffect(() => {
    if (newPrice) {
      extraNight.selling_price = newPrice;
      updateNight(night.id, extraNight);
    }
  }, [newPrice]);

  useEffect(() => {
    console.log(extraNight);
    if (!type) {
      setNewPrice(extraNight?.selling_price);
    }
    console.log("extrasnabhan");
  }, [extraNight]);

  return (
    <div className="night-div row mx-0 my-2">
      <div className="action-div col-md-2 col-sm-12">
        <span>{extraNight?.date}</span>
      </div>

      <div className="col-md-3 col-sm-12">
        <label className="filter-lable">Extras</label>
        <SelectInputType
          isMulti={true}
          className="input"
          type="extras"
          value={chosenExtras?.length > 0 && chosenExtras}
          isClearable={true}
          placeholder="Extras"
          options={extras
            ?.filter(
              (elem) => !chosenExtras?.find(({ label }) => elem.title === label)
            )
            .map((extra) => ({
              value: extra.id,
              label: extra.title,
              price: +extra.selling_price,
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
                {extraNight?.nightPrice
                  ? extraNight?.nightPrice
                  : extraNight?.night_price}
              </span>
              {newPrice && newPrice !== extraNight?.nightPrice ? (
                <span>${newPrice} </span>
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
              <li key={extra.id}>
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
