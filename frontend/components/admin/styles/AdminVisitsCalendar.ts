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
      borderRadius: "6px",
      width: "95vw",
      // [theme.breakpoints.up("xs")]: {
      //   width: "60vw",
      // },
      [theme.breakpoints.up("sm")]: {
        width: "50vw",
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
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2),
    },
    modalBody: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      display: "flex",
      flexDirection: "column",
      "& > *": {
        margin: 4,
        "& .MuiButtonGroup-grouped": {
          margin: 8,
        },
      },
    },
    calendar: {
      /*     day: {
      fontSize: "22px",
      color: "red"
    }, */
      width: "min-content",
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
    select: {
      color: "white",

      "& .MuiSelect-icon": {
        color: theme.palette.white.main,
      },
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.white.main,
        "&:hover": {
          borderColor: theme.palette.white.dark,
        },
      },
    },
  })
);
