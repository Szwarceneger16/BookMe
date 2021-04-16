import React, { useState } from "react";
import { DatePicker } from "@material-ui/pickers";

const StaticDatePicker = () => {
  const [date, changeDate] = useState(new Date());

  // prettier-ignore
  return (
      <DatePicker
        autoOk
        orientation="landscape"
        variant="static"
        // disableToolbar
        openTo="date"
        inputVariant="standard"
        value={date}
        onChange={changeDate}
      />
  );
};

export default StaticDatePicker;