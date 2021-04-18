import React, { useState } from "react";
import { 
  DatePicker ,
  TimePicker ,
  DateTimePicker
} from "@material-ui/pickers";
import {
  Typography,
  makeStyles,
  Grid,
  GridListTile,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Badge,
  Divider

} from "@material-ui/core";
// import {
//   InboxIcon ,
//   DraftsIcon 
// } from '@material-ui/icons'
import moment from "moment";
import theme from "../src/theme";
import classes from "*.module.css";

const exampleData = {
  dateFrom: "2021-04-18",
  dateTo: "2021-04-21",
  data: [
    /* first day */[
      { doctorId: 23, time:[
        {
          startTime: "11:30", 
          endTime:"16:30"
        }
      ]},
      { doctorId: 21, time: [
        {
          startTime: "11:30", 
          endTime:"16:30"
        }
      ]}
      
    ],
    /* second day */[

    ],
    /* third day */[

    ]
  ]
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  horizontalList: {
    display: 'flex',
    flexDirection: 'row',
    wrap: "nowrap",
    padding: 0,
    "& li": {
      textOverflow: "clip",
      width: "fit-conent",
    }
  },
  listHours: {
    width: "100px",
    justifyContent: "center",
    backgroundColor: theme.palette.secondary.light,
    alignSelf: "stretch",
    borderBottom: "1px solid black"
  },
  mainGrid: {
    maxHeight: "60vh", 
    overflow: "auto"
  }
}));

const disableDaysOfWeek = [0,6];
const disableDateOfMonth = [27]
const disableDate = (date) => {
  //debugger;
  return disableDaysOfWeek.includes(date.day()) || 
    disableDateOfMonth.includes(date.date())
}

const renderDate = (day, selectedDate, isInCurrentMonth, dayComponent) => {
  // You canalso use our internal <Day /> component
  const futureDateCount =  day.date() - moment().date();
  //debugger;
  return (<Badge 
    color="secondary"
    badgeContent={ futureDateCount > 0 && !dayComponent.props.disabled ? futureDateCount : undefined}
    >{dayComponent}</Badge>);
}

const ApoitmentDataTime = () => {
  const classes = useStyles();
  const [date, changeDate] = useState(moment(new Date()));

  // prettier-ignore
  return (
      <Grid container alignItems="center" justify='center'>
        <Grid item >
          <DateTimePicker key="abc"
            value={date}
            allowKeyboardControl
            onChange={changeDate}
            shouldDisableDate={disableDate}
            openTo="date"
            disablePast
            minutesStep={15}
            variant="static"
            renderDay={renderDate}
          />

        </Grid >
        <Grid item className={classes.mainGrid}>
          {/* example list */}
          <List disablePadding component="ul" >
            {Array(25).fill("").map( (element,index) => (
              <ListItem style={{margin: "0px",padding: "0px"}} disableGutters key={index}>
                <ListItemIcon className={classes.listHours}>
                  <Typography color="primary">
                    {`${9+Math.floor(index/4)}:${15*(index%4)}${index%4?"":"0"} - ${9+Math.floor((index+1)/4)}:${15*((index+1)%4)}${(index+1)%4?"":"0"}`} 
                  </Typography>         
                </ListItemIcon>
                <Divider flexItem color="dark" orientation="vertical"></Divider>
                <List className={classes.horizontalList} >
                  <ListItem disableGutters><Typography>{`dr. Jan Kowalski ${index}`}</Typography></ListItem>
                  <ListItem disableGutters><Typography>{`dr. Jan Kowalski ${index}`}</Typography></ListItem>
                  <ListItem disableGutters><Typography>{`dr. Jan Kowalski ${index}`}</Typography></ListItem>
                  <ListItem disableGutters><Typography>{`dr. Jan Kowalski ${index}`}</Typography></ListItem>
                </List>
                
                {/* <ListItemText primary={`dr. Jan Kowalski ${index}`} /> */}
              </ListItem>
              )
            )}
          </List>
        </Grid >
      </Grid>
  )
};

export default ApoitmentDataTime;