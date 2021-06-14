import {
  createStyles,
  lighten,
  makeStyles,
  Theme,
} from "@material-ui/core/styles";

const calendarElementsSize = "6rem";
export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      /* "& *.MuiPickersDay-day": {
      width: calendarElementsSize,
      height: calendarElementsSize
    },
    "& *.MuiPickersCalendarHeader-dayLabel": {
      width: calendarElementsSize,
    } */
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2),
    },

    rootItem: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      width: "100%",
      justifyContent: "space-evenly",
      // [theme.breakpoints.down("sm")]: {
      //   width: "min-content",
      // },
    },
    flexItemFormFields: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      width: 300,
      margin: 10,
    },
    formItem: {
      margin: 10,
      width: "inherit",
    },
    flexItemCalendar: {
      display: "flex",
      alignItems: "center",
      overflow: "hidden",
    },
    textField: {
      width: "100%",
    },
    busyRoomList: {
      display: "flex",
      flexDirection: "column",
      alignItems: "start",
    },
    busyRoomItem: {
      backgroundColor: theme.palette.common.white,
      borderRadius: "6px",
      width: "90vw",
      [theme.breakpoints.up("xs")]: {
        width: "90vw",
      },
      [theme.breakpoints.up("md")]: {
        width: "700px",
      },
      margin: "4px",
      "&.Mui-selected": {
        backgroundColor: theme.palette.info.light,
      },
      display: "flex",
      justifyContent: "space-around",
      "& div:first-child": {
        width: "30%",
      },
      "& div": {
        color: theme.palette.primary.main,
      },
    },
    busyRoomItemChild: {},
    label: {
      color: theme.palette.white.main,
    },

    select: {},
  })
);
