import React, { useEffect, useState } from "react";
import {
  KeyboardDatePicker,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";
import { Grid, Badge, Button } from "@material-ui/core";
import useStyles from "./styles/ApoitmentDataTimeStyle";
import * as DateFns from "date-fns";
import { getAvailableReservation } from "../../lib/reservationService";
import { useDispatch } from "react-redux";
import { setMessage } from "../../src/actions/message";

const lowApotimentCOunts = 3;
const mediumApotimentCOunts = 7;

const config = {
  apotimentTimeStepp: 15,
  startTimeHour: 9,
  endTimeHour: 15,
};
const ApoitmentDataTime = ({
  isDateSelected,
  setIsDateSelected,
  handleBack,
  ...props
}) => {
  const classes = useStyles();
  const [availableReservation, setAvailableReservation] =
    React.useState<{}>(null);
  const availableReservationKeys = availableReservation
    ? Object.keys(availableReservation)
    : [];
  const dispatch = useDispatch();
  const [displayedDate, setDisplayedDate] = useState<Date>(
    // DateFns.toDate( DateFns.set(new Date(), {hours: config.startTimeHour, minutes: 0}))
    availableReservationKeys.length
      ? DateFns.parseISO(availableReservationKeys[0])
      : null
  );

  React.useEffect(() => {
    getAvailableReservation(
      props.values.selectedService,
      props.values.selectedExpert
    ).then((res) => {
      if (res.status === 200 && res.data) {
        const dates = Object.keys(res.data);
        if (dates) {
          setAvailableReservation(res.data);
          setDisplayedDate(DateFns.parseISO(dates[0]));
        }
      } else {
        dispatch(setMessage("Brak dostepnych godzin do rezerwacji", "error"));
        handleBack();
      }
    });
    return;
  }, []);

  const disableDate = (date) => {
    return !availableReservationKeys.includes(
      DateFns.formatISO(date, { representation: "date" })
    );
  };
  const renderDate = (day, selectedDate, isInCurrentMonth, dayComponent) => {
    if (dayComponent.props.disabled) {
      return dayComponent;
    }

    const dayAsISOStringDate = DateFns.formatISO(day, {
      representation: "date",
    });
    const freeApoitmentsCount =
      availableReservation[dayAsISOStringDate].counter;
    let color: string = "primary";

    if (freeApoitmentsCount < lowApotimentCOunts) {
      color = "error";
    } else if (freeApoitmentsCount < mediumApotimentCOunts) {
      color = "secondary";
    }

    return (
      <Badge
        color={color}
        badgeContent={
          freeApoitmentsCount > 0 && !dayComponent.props.disabled
            ? freeApoitmentsCount
            : undefined
        }
      >
        {dayComponent}
      </Badge>
    );
  };

  const displayedDateAsString = displayedDate
    ? DateFns.formatISO(DateFns.toDate(displayedDate || new Date()), {
        representation: "date",
      })
    : "";
  const handleApoitmentSelect = (hourIndex: number) => {
    setIsDateSelected(true);
    const selectedHours =
      availableReservation[displayedDateAsString].available_status[hourIndex];
    props.setFieldValue(
      "apoitmentDateStart",
      DateFns.parseISO(displayedDateAsString + "T" + selectedHours.from)
    );
    props.setFieldValue(
      "apoitmentDateEnd",
      DateFns.parseISO(displayedDateAsString + "T" + selectedHours.to)
    );
    setDisplayedDate(
      DateFns.parseISO(displayedDateAsString + "T" + selectedHours.from)
    );
  };

  const result =
    displayedDate &&
    availableReservation[displayedDateAsString].available_status.map(
      (fromToObject, index) => (
        <Button
          className={classes.listButton}
          key={index}
          disabled={DateFns.isEqual(
            displayedDate,
            DateFns.parseISO(displayedDateAsString + "T" + fromToObject.from)
          )}
          onClick={() => {
            handleApoitmentSelect(index);
          }}
        >
          {fromToObject.from.substring(0, 5) +
            " - " +
            fromToObject.to.substring(0, 5)}
        </Button>
      )
    );

  return (
    <Grid container alignItems="center" justify="center" spacing={2}>
      <Grid item className={classes.apoitmentDataPicker}>
        {displayedDate && (
          <KeyboardDatePicker
            name="apoitmentDate"
            value={displayedDate}
            allowKeyboardControl
            shouldDisableDate={disableDate}
            openTo="date"
            disablePast
            clearable
            // minutesStep={15}
            variant="static"
            renderDay={renderDate}
            onChange={(date) => {
              setDisplayedDate(date);
            }}
          />
        )}
      </Grid>
      <Grid item className={classes.apoitmentSelectListItem}>
        <div className={classes.reservationContainer}>{result}</div>
      </Grid>
    </Grid>
  );
};

export default ApoitmentDataTime;

// const apoitmentTimeInterval = DateFns.eachMinuteOfInterval(
//   {
//   start: DateFns.toDate(displayedDate),
//   end: (
//     DateFns.getHours( displayedDate) === config.startTimeHour ?
//     DateFns.toDate( DateFns.set(displayedDate, {
//       hours: config.endTimeHour,
//       minutes: 0
//     })) :
//     DateFns.toDate( DateFns.add(displayedDate, {
//       hours: 1,
//       minutes: 0
//     }))
//     )
// },{step: config.apotimentTimeStepp});
