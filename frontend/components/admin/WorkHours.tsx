import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { Calendar, DatePicker, TimePicker } from "@material-ui/pickers";
import { styles } from "@material-ui/pickers/views/Calendar/Calendar";
import React, { useEffect, useState } from "react";
import { useStyles } from "./styles/WorkHours";
import { getExperts } from "../../lib/reservationService";
import { Form, Formik } from "formik";
import { Autocomplete, Skeleton } from "@material-ui/lab";
import * as DateFns from "date-fns";
import axios from "axios";

/* const examplePlaces = {
  "2021-05-11": {
    place_id: 1,
    place_name: "gabinet nr1",
    busy: [
      {
        from: "2021-05-11T10:30:30",
        to: "2021-05-11T11:30:30",
      },
      {
        from: "2021-05-11T12:30:30",
        to: "2021-05-11T13:30:30",
      },
    ],
  },
  "2021-05-12": {
    place_id: 1,
    place_name: "gabinet nr2",
    busy: [
      {
        from: "2021-05-11T11:30:30",
        to: "2021-05-11T12:30:30",
      },
      {
        from: "2021-05-11T16:30:30",
        to: "2021-05-11T17:30:30",
      },
    ],
  },
}; */
const exampleWorkHours = {
  date: "2021-05-14",
  workHours: [
    {
      first_name: "Jan",
      last_name: "Kowalski",
      time_start: "2021-05-14T10:30:00",
      time_end: "2021-05-14T10:30:00",
      place: "Gabinet nr 1",
    },
    {
      first_name: "Tomek",
      last_name: "Nowak",
      time_start: "2021-05-14T10:30:00",
      time_end: "2021-05-14T10:30:00",
      place: "Gabinet nr 2",
    },
    {
      first_name: "Jan",
      last_name: "Kowalski",
      time_start: "2021-05-14T13:30:00",
      time_end: "2021-05-14T15:30:00",
      place: "Gabinet nr 2",
    },
  ],
};

export default function AdminVisitsCalendar(params) {
  const classes = useStyles();
  const [visitData, setVisitData] = useState();
  const [experts, setExperts] = useState();
  const [places, setPlaces] = useState();
  // const [selectedExpert, setSelectedExpert] = useState();
  // const [selectedDate, setSelectedDate] = useState();
  //const [selectedPlace, setSelectedPlace] = useState();

  useEffect(() => {
    //getExperts().then(res => setExperts(res));
    setTimeout(() => {
      // const exampleExperts = [
      //   {
      //     id: 1,
      //     first_name: "Jan",
      //     last_name: "Kowalski",
      //   },
      //   {
      //     id: 2,
      //     first_name: "Kuba",
      //     last_name: "Nowak",
      //   },
      // ];
      axios
        .get(process.env.BACKEND_HOST + "/employees")
        .then((res) => setExperts(res.data.data));
      const examplePlaces = [
        {
          place_id: 1,
          place_name: "gabinet nr1",
        },
        {
          place_id: 2,
          place_name: "gabinet nr2",
        },
      ];
      setPlaces(examplePlaces);
    }, 2000);
  }, []);

  const handleSubmit = (values, actions) => {
    console.log(values);
  };

  // const availablePlaces = places[
  //   DateFns.format(props.values.date, "yyyy-mm-dd")
  // ].busy.
  return (
    <Formik
      // enableReinitialize
      initialValues={{
        expert: null,
        date: new Date(),
        start_time: new Date(),
        end_time: DateFns.addMinutes(new Date(), 15),
        place: null,
      }}
      onSubmit={handleSubmit}
    >
      {(props) => (
        <Form>
          <Grid className={classes.root}>
            <Box className={classes.rootItem}>
              <Box className={classes.flexItemCalendar}>
                <Calendar
                  date={props.values.date}
                  onChange={(date) => props.setFieldValue("date", date)}
                />
              </Box>
              <Box className={classes.flexItemFormFields}>
                <Box className={classes.formItem}>
                  {experts && experts.length > 0 ? (
                    <Autocomplete
                      id="experts-select"
                      value={props.values.expert}
                      onChange={(event, newValue) => {
                        props.setFieldValue("expert", newValue, false);
                      }}
                      options={experts}
                      className={classes.select}
                      getOptionLabel={(option) => {
                        //debugger;
                        return option.first_name + " " + option.last_name;
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Specjalista"
                          variant="outlined"
                        />
                      )}
                    ></Autocomplete>
                  ) : (
                    <Skeleton variant="rect" height={60} />
                  )}
                </Box>
                <Box className={classes.formItem}>
                  {places && places.length > 0 ? (
                    // <FormControl
                    //   variant="filled"
                    //   className={classes.formItem}
                    // >
                    <Autocomplete
                      id="places-select"
                      value={props.values.place}
                      onChange={(event, newValue) => {
                        props.setFieldValue("place", newValue, false);
                      }}
                      options={places}
                      className={classes.select}
                      getOptionLabel={(option) => option.place_name}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Gabinet"
                          variant="outlined"
                        />
                      )}
                    ></Autocomplete>
                  ) : (
                    // </FormControl>
                    <Skeleton variant="rect" height={60} />
                  )}
                </Box>
                <Box className={classes.formItem}>
                  <TimePicker
                    variant="inline"
                    clearable={true}
                    ampm={false}
                    label="Czas rozpoczecia"
                    minutesStep={5}
                    value={props.values.start_time}
                    onChange={(time) => props.setFieldValue("start_time", time)}
                  />
                </Box>
                <Box className={classes.formItem}>
                  <TimePicker
                    clearable={true}
                    ampm={false}
                    label="Czas zakończenia"
                    minutesStep={5}
                    value={props.values.end_time}
                    onChange={(time) => props.setFieldValue("end_time", time)}
                  />
                </Box>

                <Box className={classes.formItem}>
                  <Button type="submit" variant="contained">
                    Dodaj
                  </Button>
                </Box>
              </Box>
            </Box>
            <Box className={classes.busyRoomList}>
              <Typography variant="h4">Lista zajetych gabientow</Typography>
              {exampleWorkHours.workHours.map((workItem, index) => (
                <Button className={classes.busyRoomItem} key={index}>
                  {workItem.first_name +
                    " " +
                    workItem.last_name +
                    " " +
                    DateFns.format(
                      DateFns.parseISO(workItem.time_start),
                      "hh:mm"
                    ) +
                    " " +
                    DateFns.format(
                      DateFns.parseISO(workItem.time_end),
                      "hh:mm"
                    ) +
                    " " +
                    workItem.place}
                </Button>
              ))}
            </Box>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}
