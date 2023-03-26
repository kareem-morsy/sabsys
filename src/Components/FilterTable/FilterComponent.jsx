import React from "react";

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <form className="d-flex">
    <input
      className="mx-2 form-control"
      id="search"
      type="text"
      placeholder="Filter By Name"
      aria-label="Search Input"
      value={filterText}
      onChange={onFilter}
    />
    <button className="btn bg-gold" type="button" onClick={onClear}>
      Reset
    </button>
  </form>
);

export default FilterComponent;
