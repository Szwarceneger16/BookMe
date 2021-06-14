import {
  Backdrop,
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Fade,
  Grid,
  List,
  ListItem,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { Delete as DeleteIcon, Save as SaveIcon } from "@material-ui/icons";
import { Calendar, Day, TimePicker } from "@material-ui/pickers";
import { styles } from "@material-ui/pickers/views/Calendar/Calendar";
import React, { useEffect, useState } from "react";
import { useStyles } from "./styles/AdminVisitsCalendar";
import { getExperts } from "../../lib/reservationService";
import * as DateFns from "date-fns";
import { Form, Formik } from "formik";
import { Autocomplete, Skeleton } from "@material-ui/lab";
import axios from "axios";

const MyModal = ({ visitData, handleClose, children }) => {
  const classes = useStyles();
  const todayAsIsoString = DateFns.formatISO(new Date(), {
    representation: "date",
  });

  const handleSubmit = (values, action) => {
    console.log(values);
  };

  const handleDelete = (visitId) => {};

  return (
    <>
      {visitData && (
        <Formik
          initialValues={{
            datetime_start: DateFns.parseISO(
              todayAsIsoString + "T" + visitData.time_start
            ),
            datetime_end: DateFns.parseISO(
              todayAsIsoString + "T" + visitData.time_end
            ),
            client_id: 1,
            employee_id: 1,
            place_id: 1,
            service_id: 1,
          }}
          onSubmit={handleSubmit}
        >
          {(props) => (
            <Form>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={!!visitData}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={!!visitData}>
                  <div className={classes.modalBody}>
                    <Typography variant="h6">
                      Imie klienta: {visitData.client_first_name}
                    </Typography>
                    <Typography variant="h6">
                      Nazwisko klienta: {visitData.client_last_name}
                    </Typography>
                    <Typography variant="h6">
                      Imie pracownika: {visitData.employee_first_name}
                    </Typography>
                    <Typography variant="h6">
                      Nazwisko pracownika: {visitData.employee_last_name}
                    </Typography>

                    <Box>
                      <TimePicker
                        value={props.values.datetime_start}
                        ampm={false}
                        onChange={(newValue) =>
                          props.setFieldValue("datetime_start", newValue, false)
                        }
                      />
                    </Box>

                    <Box>
                      <TimePicker
                        value={props.values.datetime_end}
                        ampm={false}
                        onChange={(newValue) =>
                          props.setFieldValue("datetime_end", newValue, false)
                        }
                      />
                    </Box>

                    <ButtonGroup variant="contained" color="primary">
                      <Button
                        color="secondary"
                        startIcon={<DeleteIcon />}
                        onClick={handleDelete}
                      >
                        Usun Wizyte
                      </Button>
                      <Button
                        color="primary"
                        startIcon={<SaveIcon />}
                        type="submit"
                      >
                        Modyfikuj Termin
                      </Button>
                    </ButtonGroup>
                  </div>
                </Fade>
              </Modal>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default function AdminVisitsCalendar(params) {
  const classes = useStyles();
  const [allReservation, setAllReservation] = useState();
  const [experts, setExperts] = useState();
  const container = React.useRef(null);
  const [selectedVisit, setSelectedVisit] = useState();

  const getActualWorkHours = (date) => {
    axios
      .post(process.env.BACKEND_HOST + "/get-all-reservations", {
        date: DateFns.formatISO(date, { representation: "date" }),
      })
      .then((res) => setAllReservation(res.data.data));
  };

  const handleClose = () => {
    setSelectedVisit(null);
  };

  useEffect(() => {
    axios
      .get(process.env.BACKEND_HOST + "/employees")
      .then((res) => setExperts(res.data.data));

    getActualWorkHours(new Date());
  }, []);

  const handleSubmit = (values, actions) => {};

  return (
    <Paper>
      <Formik
        // enableReinitialize
        initialValues={{
          expert: null,
          date: new Date(),
        }}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <Form>
            <Grid className={classes.root}>
              <MyModal
                visitData={selectedVisit}
                handleClose={handleClose}
              ></MyModal>
              <Grid item xs={12} className={classes.calendar}>
                <Grid container>
                  <Grid item xs={12} md={6} className={classes.gridItem}>
                    <Typography className={classes.description}>
                      Aby wyświetlić wizyty w danym dniu, najpierw wybierz
                      specjalistę następnie dzień.
                    </Typography>
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
                  </Grid>

                  <Grid item xs={12} md={6} className={classes.gridItem}>
                    <Calendar
                      date={props.values.date}
                      onChange={(date) => {
                        props.setFieldValue("date", date);
                        getActualWorkHours(date);
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <List className={classes.allVisitContainer}>
                  {allReservation ? (
                    allReservation.reservations.map((reservation, index) => (
                      <ListItem
                        button
                        className={classes.busyRoomItem}
                        key={index}
                        onClick={() =>
                          setSelectedVisit(allReservation.reservations[index])
                        }
                      >
                        <Box>
                          {reservation.employee_first_name +
                            " " +
                            reservation.employee_last_name}
                        </Box>
                        <Box>
                          {reservation.client_first_name +
                            " " +
                            reservation.client_last_name}
                        </Box>
                        <Box>
                          {reservation.time_start.substring(0, 5) +
                            "-" +
                            reservation.time_end.substring(0, 5)}
                        </Box>
                      </ListItem>
                    ))
                  ) : (
                    <CircularProgress />
                  )}
                </List>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Paper>
  );
}
