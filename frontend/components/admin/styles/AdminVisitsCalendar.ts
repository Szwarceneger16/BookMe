import { createStyles, lighten, makeStyles, Theme } from '@material-ui/core/styles';

const calendarElementsSize = "6rem";
export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      "& *.MuiPickersDay-day": {
        width: calendarElementsSize,
        height: calendarElementsSize
      },
      "& *.MuiPickersCalendarHeader-dayLabel": {
        width: calendarElementsSize,
      }
      
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    calendar: {
      day: {
        fontSize: "22px",
        color: "red"
      },
  }
  })
);