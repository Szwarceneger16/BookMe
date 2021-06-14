import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Paper,
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
import AddAlarmIcon from "@material-ui/icons/AddAlarm";

export default function AdminVisitsCalendar(params) {
  const classes = useStyles();
  const [actualWorkHours, setActualWorkHours] = useState();
  const [employee_ids, setExperts] = useState();
  const [places, setPlaces] = useState();
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

    axios
      .get(process.env.BACKEND_HOST + "/places")
      .then((res) => {
        setPlaces(res.data.data);
      })
      .catch((err) => console.error(err));
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
        place_id: values.place.id,
      })
      .then((res) => {
        dispatch(setMessage("Dodano godzine pracy", "success"));
        getActualWorkHours(values.date);
      })
      .catch(() => {
        dispatch(setMessage("Nie udalo sie dodac godziny pracy", "error"));
      });
  };
  const renderTextField = (props) => {
    return (
      <TextField
        variant="outlined"
        onClick={props.onClick}
        value={props.value}
        onChange={props.onChange}
        label={props.label}
      />
    );
  };
  // const availablePlaces = place_ids[
  //   DateFns.format(props.values.date, "yyyy-mm-dd")
  // ].busy.
  return (
    <Paper>
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
                  <Box>
                    <Calendar
                      date={props.values.date}
                      onChange={(date) => {
                        props.setFieldValue("date", date);
                        getActualWorkHours(date);
                      }}
                    />
                  </Box>
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
                    {places && places.length > 0 ? (
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
                        options={places}
                        className={classes.select}
                        getOptionLabel={(option) => option.name}
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
                      clearable="true"
                      ampm={false}
                      label="Czas rozpoczecia"
                      minutesStep={5}
                      value={props.values.datetime_start}
                      onChange={(time) =>
                        props.setFieldValue("datetime_start", time)
                      }
                      TextFieldComponent={renderTextField}
                      className={classes.textField}
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
                      TextFieldComponent={renderTextField}
                    />
                  </Box>

                  <Box className={classes.formItem}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      endIcon={<AddAlarmIcon />}
                    >
                      Dodaj godziny
                    </Button>
                  </Box>
                </Box>
              </Box>
              <Box
                width="100%"
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <Typography variant="h4">Lista zajętych gabientów</Typography>
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
                          {workItem.time_start.slice(0, -3) +
                            " - " +
                            workItem.time_end.slice(0, -3)}
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
    </Paper>
  );
}
