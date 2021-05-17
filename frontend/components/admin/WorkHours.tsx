import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItem,
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
import { useDispatch } from "react-redux";
import { setMessage } from "../../src/actions/message";

/* const examplePlaces = {
  "2021-05-11": {
    place_id_id: 1,
    place_id_name: "gabinet nr1",
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
    place_id_id: 1,
    place_id_name: "gabinet nr2",
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
// const exampleWorkHours = {
//   date: "2021-05-14",
//   workHours: [
//     {
//       first_name: "Jan",
//       last_name: "Kowalski",
//       time_start: "2021-05-14T10:30:00",
//       time_end: "2021-05-14T10:30:00",
//       place_id: "Gabinet nr 1",
//     },
//     {
//       first_name: "Tomek",
//       last_name: "Nowak",
//       time_start: "2021-05-14T10:30:00",
//       time_end: "2021-05-14T10:30:00",
//       place_id: "Gabinet nr 2",
//     },
//     {
//       first_name: "Jan",
//       last_name: "Kowalski",
//       time_start: "2021-05-14T13:30:00",
//       time_end: "2021-05-14T15:30:00",
//       place_id: "Gabinet nr 2",
//     },
//   ],
// };

export default function AdminVisitsCalendar(params) {
  const classes = useStyles();
  const [actualWorkHours, setActualWorkHours] = useState();
  const [employee_ids, setExperts] = useState();
  const [place_ids, setPlaces] = useState();
  const dispatch = useDispatch();

  const getActualWorkHours = (date) => {
    axios
      .post(process.env.BACKEND_HOST + "/list-workhours", {
        date: DateFns.formatISO(date, { representation: "date" }),
      })
      .then((res) => setActualWorkHours(res.data.data));
  };

  useEffect(() => {
    axios
      .get(process.env.BACKEND_HOST + "/employees")
      .then((res) => setExperts(res.data.data));

    getActualWorkHours(new Date());

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
  }, []);

  const handleSubmit = (values, actions) => {
    const datetime_start =
      DateFns.formatISO(values.date, { representation: "date" }) +
      "T" +
      DateFns.formatISO(values.datetime_start, { representation: "time" });
    const datetime_end =
      DateFns.formatISO(values.date, { representation: "date" }) +
      "T" +
      DateFns.formatISO(values.datetime_end, { representation: "time" });

    axios
      .post(process.env.BACKEND_HOST + "/workHours", {
        datetime_start,
        datetime_end,
        employee_id: values.employee.id,
        place_id: values.place.place_id,
      })
      .then((res) => {
        dispatch(setMessage("Dodano godzine pracy", "success"));
        getActualWorkHours(values.date);
      })
      .catch(() => {
        dispatch(setMessage("Nie udalo sie dodac godziny pracy", "error"));
      });
    console.log(values);
  };

  // const availablePlaces = place_ids[
  //   DateFns.format(props.values.date, "yyyy-mm-dd")
  // ].busy.
  return (
    <Formik
      // enableReinitialize
      initialValues={{
        employee: null,
        date: new Date(),
        datetime_start: new Date(),
        datetime_end: DateFns.addMinutes(new Date(), 15),
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
                  onChange={(date) => {
                    props.setFieldValue("date", date);
                    getActualWorkHours(date);
                  }}
                />
              </Box>
              <Box className={classes.flexItemFormFields}>
                <Box className={classes.formItem}>
                  {employee_ids && employee_ids.length > 0 ? (
                    <Autocomplete
                      id="employee_ids-select"
                      value={props.values.employee}
                      onChange={(event, newValue) => {
                        props.setFieldValue("employee", newValue, false);
                      }}
                      options={employee_ids}
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
                  {place_ids && place_ids.length > 0 ? (
                    // <FormControl
                    //   variant="filled"
                    //   className={classes.formItem}
                    // >
                    <Autocomplete
                      id="place_ids-select"
                      value={props.values.place}
                      onChange={(event, newValue) => {
                        props.setFieldValue("place", newValue, false);
                      }}
                      options={place_ids}
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
                    clearable="true"
                    ampm={false}
                    label="Czas rozpoczecia"
                    minutesStep={5}
                    value={props.values.datetime_start}
                    onChange={(time) =>
                      props.setFieldValue("datetime_start", time)
                    }
                  />
                </Box>
                <Box className={classes.formItem}>
                  <TimePicker
                    clearable="true"
                    ampm={false}
                    label="Czas zakończenia"
                    minutesStep={5}
                    value={props.values.datetime_end}
                    onChange={(time) =>
                      props.setFieldValue("datetime_end", time)
                    }
                  />
                </Box>

                <Box className={classes.formItem}>
                  <Button type="submit" variant="contained">
                    Dodaj
                  </Button>
                </Box>
              </Box>
            </Box>
            <Box /* className={classes.busyRoomList} */>
              <Typography variant="h4">Lista zajetych gabientow</Typography>
              <List>
                {actualWorkHours &&
                  actualWorkHours.work_hours.map((workItem, index) => (
                    <ListItem
                      button
                      className={classes.busyRoomItem}
                      key={index}
                    >
                      <Box /* className={classes.busyRoomItemChild} */>
                        {workItem.first_name + " " + workItem.last_name}
                      </Box>
                      <Box /* className={classes.busyRoomItemChild} */>
                        {
                          workItem.time_start
                          // DateFns.format(
                          //   DateFns.parseISO(workItem.time_start),
                          //   "hh:mm"
                          // )
                        }
                      </Box>
                      <Box /* className={classes.busyRoomItemChild} */>
                        {
                          workItem.time_end
                          // DateFns.format(
                          //   DateFns.parseISO(workItem.time_end),
                          //   "hh:mm"
                          // )
                        }
                      </Box>
                      <Box /* className={classes.busyRoomItemChild} */>
                        {workItem.place}
                      </Box>
                    </ListItem>
                  ))}
              </List>
            </Box>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}
