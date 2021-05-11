import {
  Backdrop,
  Box,
  Button,
  Fade,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Portal,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { Delete as DeleteIcon, Save as SaveIcon } from "@material-ui/icons";
import { Calendar } from "@material-ui/pickers";
import { styles } from "@material-ui/pickers/views/Calendar/Calendar";
import React, { useEffect, useState } from "react";
import { useStyles } from "./styles/AdminVisitsCalendar";
import { getExperts } from "../../lib/reservationService";
import { Form, Formik } from "formik";
import { Autocomplete, Skeleton } from "@material-ui/lab";

const exampleData = {
  date: "2021-05-11",
  reservations: [
    {
      reservation_id: "1",
      client_first_name: "Jan",
      client_last_name: "Kowalski",
      employee_first_name: "Kuba",
      employee_last_name: "Nowak",
      time_start: "2021-05-11T10:30:00",
      time_end: "2021-05-11T11:30:00",
    },
  ],
};

const MyModal = ({ open, handleClose, children }) => {
  const classes = useStyles();

  const handleSubmit = (values, action) => {};

  const handleDelete = (visitId) => {};

  return (
    <>
      {open && (
        <Formik initialValues={{}} onSubmit={handleSubmit}>
          {(props) => (
            <Form>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={!!open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={!!open}>
                  <div className={classes.modalBody}>
                    <Typography variant="h6">
                      Imie klienta: {open.client_first_name}
                    </Typography>
                    <Typography variant="h6">
                      Nazwisko klienta: {open.client_last_name}
                    </Typography>
                    <Typography variant="h6">
                      Imie pracownika: {open.employee_first_name}
                    </Typography>
                    <Typography variant="h6">
                      Nazwisko pracownika: {open.employee_last_name}
                    </Typography>

                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<DeleteIcon />}
                    >
                      Usun Wizyte
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<SaveIcon />}
                    >
                      Modyfikuj Termin
                    </Button>
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
  const [visitData, setVisitData] = useState();
  const [experts, setExperts] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const container = React.useRef(null);
  const [selectedVisit, setSelectedVisit] = useState();

  const handleClose = () => {
    setSelectedVisit(null);
  };

  useEffect(() => {
    //getExperts().then(res => setExperts(res));
    setTimeout(() => {
      const exampleExperts = [
        {
          id: 1,
          first_name: "Jan",
          last_name: "Kowalski",
        },
        {
          id: 2,
          first_name: "Kuba",
          last_name: "Nowak",
        },
      ];
      setExperts(exampleExperts);
    }, 2000);
  }, []);

  const handleSubmit = (values, actions) => {};

  return (
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
            <MyModal open={selectedVisit} handleClose={handleClose}></MyModal>
            <Box className={classes.calendar}>
              <Box>
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
                      return option.first_name;
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

              <Calendar
                date={new Date()}
                onChange={(date) => {
                  props.setFieldValue("date", date);
                }}
              />
            </Box>

            <Box className={classes.allVisitContainer}>
              {exampleData.reservations.map((reservation, index) => (
                <Button
                  className={classes.listButton}
                  key={reservation.reservation_id}
                  onClick={() =>
                    setSelectedVisit(exampleData.reservations[index])
                  }
                >
                  {"" +
                    reservation.client_first_name +
                    "_" +
                    reservation.employee_first_name}
                </Button>
              ))}
            </Box>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}
