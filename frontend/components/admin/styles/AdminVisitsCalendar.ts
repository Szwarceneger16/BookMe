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
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "wrap",
      justifyContent: "space-evenly",
    },
    busyRoomItem: {
      backgroundColor: theme.palette.common.white,
      borderRadius: theme.spacing(1),
      width: "100%",
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
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2),
    },
    modalBody: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      borderRadius: theme.spacing(1),
      display: "flex",
      flexDirection: "column",
      "& > *": {
        margin: 4,
      },
    },
    calendar: {
      display: "flex",
      justifyContent: "space-around",
    },
    gridItem: {
      padding: theme.spacing(3, 2),
      display: "flex",
      flexDirection: "column",
    },
    description: {
      marginBottom: theme.spacing(2),
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    allVisitContainer: {
      display: "flex",
      flexDirection: "column",
      flexWrap: "wrap",
      width: "100%",
    },
    listButton: {
      backgroundColor: theme.palette.common.white,
      borderRadius: "6px",
      width: "max-content",
      margin: "4px",
      "&.Mui-selected": {
        backgroundColor: theme.palette.info.light,
      },
    },
    label: {
      color: theme.palette.white.main,
    },
    marginTop: {
      marginTop: theme.spacing(2),
    },
    select: {},
  })
);
