import React, { useState, useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

import "./GuestsNamesPopup.css";

const GuestsNamesPopup = ({
  type,
  nightObj,
  numberOfGuests,
  showGuestsPopup,
  handleGuestsPopup,
  handleGuestsValues,
  handleRoomsCountValue,
}) => {
  const [guestsCount, setGuestsCount] = useState();
  const [validatedGuests, setValidatedGuests] = useState();

  const handleNameChange = (id, name) => {
    const newState = guestsCount.map((obj) => {
      if (obj.id === id) {
        return { ...obj, name: name };
      }
      return obj;
    });
    // if (type === "create") handleGuestsValues(newState);
    setGuestsCount(newState);
  };

  const handleGuestDelete = (id) => {
    let filteredGuests = guestsCount.filter((guests) => guests.id !== id);
    setGuestsCount(filteredGuests);
    // handleRoomsCountValue(filteredGuests.length);
  };

  const handleConfirm = () => {
    let emptyGuests = guestsCount.filter((guest) => guest.name == null);
    if (emptyGuests.length > 0) {
      setValidatedGuests(emptyGuests.map((guest) => guest.id));
      return;
    }
    if (type === "create") handleGuestsValues(guestsCount);
    handleRoomsCountValue(guestsCount.length);
    nightObj.guests = guestsCount;
    handleGuestsPopup(false);
  };

  const validateInput = (id) => {
    let validation = validatedGuests?.find((x) => x === id) ? "validate" : "";
    if (validation) return "validate";
    else return "";
  };

  const handleCancel = () => {
    setGuestsCount(numberOfGuests);
    handleGuestsPopup(false);
  };

  useEffect(() => {
    let count;
    if (nightObj && type === undefined) {
      count = nightObj.guests;
    } else if (numberOfGuests && type) count = numberOfGuests;
    let arr = [];
    for (let i = 0; i <= count.length - 1; i++) {
      arr.push(count[i]);
    }
    setGuestsCount(arr);
  }, [nightObj, numberOfGuests]);

  // useEffect(() => {
  //   console.log("guestsCount", guestsCount);
  // }, [guestsCount]);

  return (
    <div
      className="pop-background"
      // onClick={() => handleGuestsPopup(false)}
    >
      <div className={`${type === "create" ? "create" : ""} guests-popup`}>
        <div className="title">Guests Names</div>

        <div className="guest-container">
          {guestsCount &&
            guestsCount.map((guest, index) => (
              <div key={index} className="row mx-0 my-3">
                <div
                  className={`${
                    type === "create" ? "col-md-10" : "col-md-6"
                  } name-input`}
                >
                  <label className="filter-lable">Name</label>
                  <input
                    type="text"
                    className={`${validateInput(guest.id)} form-control`}
                    placeholder="Guest Name"
                    value={guest.name ? guest?.name : undefined}
                    // value={guest.name ? guest?.name : nightObj?.find(night => night.id === guest.id)?.name}
                    onChange={(e) => handleNameChange(guest.id, e.target.value)}
                  />
                  {validateInput(guest.id) ? (
                    <span className="validate-span">must enter a name</span>
                  ) : (
                    ""
                  )}
                </div>
                {!type && (
                  <div className="code-input col-md-4">
                    <label className="filter-lable">Code</label>
                    <div>{guest?.confirmation_number}</div>
                  </div>
                )}

                {index > 0 && (
                  <div className="col-md-2 delete-icon">
                    <RiDeleteBin6Line
                      onClick={() => handleGuestDelete(guest.id)}
                    />
                  </div>
                )}
              </div>
            ))}
        </div>
        <div className="row mx-2 close-div">
          <button
            type="button"
            className="col-12 btn btn-confirm"
            onClick={() => handleConfirm()}
          >
            Confirm
          </button>
          <button
            type="button"
            className="col-12 btn btn-cancel"
            onClick={() => handleCancel()}
          >
            Cancel
          </button>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default GuestsNamesPopup;

// import { Modal, Button } from "react-bootstrap";
// <Modal show={showGuestsPopup} onHide={() => handleGuestsPopup(false)} size="xl">
//   <Modal.Header closeButton></Modal.Header>

//   <Modal.Body>
//     <div className="row m-0">
//         <div className="col-6">
//             <input type="text" placeholder="Guest Name"/>
//             <input type="text" placeholder="Confirmation Code"/>
//         </div>
//     </div>
//   </Modal.Body>
//   <Modal.Footer>
//     <Button variant="secondary" >
//       Save
//     </Button>
//   </Modal.Footer>
// </Modal>
