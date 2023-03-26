import React, { useState } from "react";
import moment from "moment-hijri";
import {
  CalendarComponent,
  Inject,
  Islamic,
} from "@syncfusion/ej2-react-calendars";
import moments from "moment";

const DatePickerCalender = ({
  id,
  mode,
  state,
  handleGregorianInputChange,
}) => {
  const [showCalender, setShowCalender] = useState(false);

  const handleChange = (e) => {
    setShowCalender(false);
    handleGregorianInputChange(id, e.target.value);
  };

  const test = (args) => {
    if(moments(args.date).isBefore(moments(new Date()))){
      args.isDisabled = true;
    }
    // if (args.date.getDay() === 0 || args.date.getDay() === 6) {
    //   /*set 'true' to disable the weekends*/
    //   args.isDisabled = true;
    // }
  }

  return (
    <span
      className="e-input-group e-control-wrapper e-date-wrapper e-valid-input e-error"
      style={{ width: "100%" }}
    >
      <input
        id="datepicker"
        className="datePicker e-control e-datepicker e-lib e-input e-keyboard"
        placeholder="Enter date"
        aria-placeholder="Enter date"
        name="datepicker"
        aria-live="assertive"
        aria-atomic="true"
        aria-haspopup="true"
        aria-activedescendant="null"
        aria-owns="datepicker_options"
        aria-expanded="false"
        role="combobox"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        aria-invalid="true"
        aria-disabled="false"
        tabIndex="0"
        value={
          mode === "Islamic" && state
            ? moment(state).format("iYYYY-iM-iD")
            : moment(state).format("YYYY-M-D")
        }
        onChange={(e) => handleChange(e)}
      />
      <span
        className="e-clear-icon e-clear-icon-hide"
        aria-label="close"
        role="button"
      ></span>
      <span
        className="e-input-group-icon e-date-icon e-icons"
        aria-label="select"
        onClick={() => setShowCalender((prev) => !prev)}
      ></span>
      {showCalender && (
        <CalendarComponent
        renderDayCell={(args) => test(args)}
          calendarMode={mode}
          onChange={(e) => handleChange(e)}
        >
          <Inject services={[Islamic]} />
        </CalendarComponent>
      )}
    </span>
  );
};

export default DatePickerCalender;
