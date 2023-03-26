import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

import "./SelectInputType.css";

export const SelectInputType = ({
  value,
  defaultValue,
  placeholder,
  type,
  isMulti,
  options,
  onChange,
  isClearable,
  className,
}) => {
  const animatedComponents = makeAnimated();

  return (
    <Select
      value={value}
      defaultValue={defaultValue}
      isMulti={isMulti}
      isClearable={isClearable}
      name={type.charAt(0).toUpperCase() + type.slice(1)}
      options={options}
      className={`basic-multi-select ${className}`}
      classNamePrefix="Select"
      placeholder={placeholder}
      closeMenuOnSelect={!isMulti}
      components={animatedComponents}
      onChange={onChange}
    />
  );
};
