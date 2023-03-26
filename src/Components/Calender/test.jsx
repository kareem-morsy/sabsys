import { useState } from "react";
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";

import "./test.css"

const Test = () => {
    // const [state1, setState1] = useState({
    //     selection: {
    //       startDate: new Date(),
    //       endDate: null,
    //       key: 'selection'
    //     },
    //     compare: {
    //       startDate: new Date(),
    //       endDate: addDays(new Date(), 3),
    //       key: 'compare'
    //     }
    //   });

  const [state, setState] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const [disabledState, setDisabledState] = useState({
    startDate: new Date(),
    endDate: addDays(new Date(), 3),
    // endDate: new Date(),
    key: "compare",
  });

  

  return (
    <DateRangePicker
      onChange={(item) => setState({ ...state, ...item })}
      months={1}
      minDate={addDays(new Date(), -30)}
      maxDate={addDays(new Date(), 30)}
      direction="vertical"
      scroll={{ enabled: true }}
      ranges={[state, disabledState]}
    // ranges={[state1.selection, state1.compare]}

    />
  );
};
export default Test;
