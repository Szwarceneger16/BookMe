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
      width: "max-content",
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
      /*     day: {
      fontSize: "22px",
      color: "red"
    }, */
    },
    busyRoomList: {
      display: "flex",
      flexDirection: "column",
      alignItems: "start",
    },
    busyRoomItem: {
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
