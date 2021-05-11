import { createStyles, lighten, makeStyles, Theme } from '@material-ui/core/styles';

const calendarElementsSize = "6rem";
export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
  root: {
    width: '100%',
    /* "& *.MuiPickersDay-day": {
      width: calendarElementsSize,
      height: calendarElementsSize
    },
    "& *.MuiPickersCalendarHeader-dayLabel": {
      width: calendarElementsSize,
    } */
    
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  calendar: {
/*     day: {
      fontSize: "22px",
      color: "red"
    }, */
    
  },
  allVisitContainer: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
  },
  listButton: {
    backgroundColor: theme.palette.common.white,
    borderRadius: "6px",
    width: 'max-content',
    margin: "4px",
    '&.Mui-selected': {
      backgroundColor: theme.palette.info.light,
    },
  },
  })
);