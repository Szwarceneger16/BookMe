import { Badge, Box, Paper, Typography } from "@material-ui/core";
import React from "react";
import SpecialistLayout from "../../../layouts/SpecialistLayout";
import * as DateFns from "date-fns";
import axios from "axios";
import { Calendar } from "@material-ui/pickers";
import {
  createMuiTheme,
  createStyles,
  makeStyles,
} from "@material-ui/core/styles";
import { DataGrid, ColDef, GridOverlay } from "@material-ui/data-grid";
import { useSelector } from "react-redux";
import classes from "*.module.css";

const columns: ColDef[] = [
  { field: "name", headerName: "Klient", width: 200 },
  { field: "service", headerName: "Usługa", width: 200 },
  { field: "time", headerName: "Czas trwania", width: 150 },
];

const defaultTheme = createMuiTheme();
const useStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      root: {
        flexDirection: "column",
        "& .ant-empty-img-1": {
          fill: theme.palette.type === "light" ? "#aeb8c2" : "#262626",
        },
        "& .ant-empty-img-2": {
          fill: theme.palette.type === "light" ? "#f5f5f7" : "#595959",
        },
        "& .ant-empty-img-3": {
          fill: theme.palette.type === "light" ? "#dce0e6" : "#434343",
        },
        "& .ant-empty-img-4": {
          fill: theme.palette.type === "light" ? "#fff" : "#1c1c1c",
        },
        "& .ant-empty-img-5": {
          fillOpacity: theme.palette.type === "light" ? "0.8" : "0.08",
          fill: theme.palette.type === "light" ? "#f5f5f5" : "#fff",
        },
      },
      label: {
        marginTop: theme.spacing(1),
      },
      grid: {
        gridTemplateColumns: "308px 1fr",
        [theme.breakpoints.down("sm")]: {
          gridTemplateColumns: "1fr",
        },
      },
      databox: {
        marginLeft: theme.spacing(1),
        [theme.breakpoints.down("sm")]: {
          marginLeft: 0,
        },
      },
    }),
  { defaultTheme }
);

function CustomNoRowsOverlay() {
  const classes = useStyles();

  return (
    <GridOverlay className={classes.root}>
      <svg
        width="120"
        height="100"
        viewBox="0 0 184 152"
        aria-hidden
        focusable="false"
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(24 31.67)">
            <ellipse
              className="ant-empty-img-5"
              cx="67.797"
              cy="106.89"
              rx="67.797"
              ry="12.668"
            />
            <path
              className="ant-empty-img-1"
              d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
            />
            <path
              className="ant-empty-img-2"
              d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
            />
            <path
              className="ant-empty-img-3"
              d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
            />
          </g>
          <path
            className="ant-empty-img-3"
            d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
          />
          <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
            <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
            <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
          </g>
        </g>
      </svg>
      <div className={classes.label}>Brak danych dla podanego dnia</div>
    </GridOverlay>
  );
}

const prepareReservationsList = (reservationResponse) => {
  return reservationResponse.map((reservation) => ({
    id: reservation.reservation_id,
    name: reservation.client_first_name + " " + reservation.client_last_name,
    service: reservation.service,
    time:
      reservation.time_start.substring(0, 5) +
      " - " +
      reservation.time_end.substring(0, 5),
  }));
};

function All(props) {
  const [days, setDays] = React.useState([]);
  const [allReservation, setAllReservation] = React.useState([]);
  const [date, setDate] = React.useState(new Date());
  const user = useSelector((state) => state.auth.user);
  const classes = useStyles();

  const getActualWorkHours = (date) => {
    axios
      .post(process.env.BACKEND_HOST + "/get-all-reservations", {
        date: DateFns.formatISO(date, { representation: "date" }),
        employee_id: user.employee_id,
      })
      .then((res) =>
        setAllReservation(prepareReservationsList(res.data.data.reservations))
      );
  };
  React.useEffect(() => {
    getActualWorkHours(new Date());
    axios
      .post(process.env.BACKEND_HOST + "/employee/all-reservations-info", {
        employee_id: user.employee_id,
      })
      .then((res) => setDays(res.data.data))
      .catch((err) => console.error(err.response));
  }, []);

  const renderDay = (day, selectedDate, isInCurrentMonth, dayComponent) => {
    if (dayComponent.props.disabled) {
      return dayComponent;
    }

    const dayAsISOStringDate = DateFns.formatISO(day, {
      representation: "date",
    });

    const isCurrentDay = days.find(
      (currentDay) => dayAsISOStringDate === currentDay.date
    );
    return (
      <Badge color="secondary" badgeContent={isCurrentDay?.counter || 0}>
        {dayComponent}
      </Badge>
    );
  };

  const handleDateChange = (newDate) => {
    getActualWorkHours(newDate);
    setDate(newDate);
  };

  return (
    <>
      <Typography variant="h3" component="h2" gutterBottom>
        Wizyty
      </Typography>

      <Box display="grid" className={classes.grid}>
        <Paper>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            height="100%"
            padding={1}
          >
            <Box overflow="hidden">
              <Calendar
                date={date}
                onChange={handleDateChange}
                renderDay={renderDay}
              />
            </Box>
          </Box>
        </Paper>
        <Box className={classes.databox} height="100%">
          <Paper style={{ height: 400 }}>
            <DataGrid
              rows={allReservation}
              columns={columns}
              disableColumnMenu
              disableColumnSelector
              disableSelectionOnClick
              pagination
              pageSize={5}
              rowsPerPageOptions={[5, 10, 20]}
              components={{
                NoRowsOverlay: CustomNoRowsOverlay,
              }}
            />
          </Paper>
        </Box>
      </Box>
    </>
  );
}

All.Layout = SpecialistLayout;

export default All;
