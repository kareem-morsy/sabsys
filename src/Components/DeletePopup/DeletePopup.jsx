import React from "react";
import { BsExclamationCircle } from "react-icons/bs";

const DeletePopup = ({ handleDeletePopup, handleDelete, night }) => {
  return (
    <div className="pop-background" onClick={() => handleDeletePopup(false)}>
      <div className="delete-popup">
        <BsExclamationCircle />
        <p>are you sure you want to delete?</p>
        <div className="d-flex justify-content-center">
          <button
            type="button"
            className="btn btn-confirm"
            onClick={() => handleDelete(night.id)}
          >
            Yes
          </button>
          <button
            type="button"
            className="btn btn-cancel"
            onClick={() => handleDeletePopup(false)}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;
