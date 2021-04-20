import React, { useState } from "react";
import { Field, Form, Formik, FormikProps } from 'formik';
import { 
  DatePicker ,
  TimePicker ,
  DateTimePicker,
  KeyboardDateTimePicker
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
  Box,
  Divider

} from "@material-ui/core";
// import {
//   InboxIcon ,
//   DraftsIcon 
// } from '@material-ui/icons'
import theme from "../src/theme";
import classes from "*.module.css";
import * as DateFns from "date-fns";

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
    padding: "2px",
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
    minHeight: "48px",
    "& div": {
      // border: "1px solid grey", 
      padding: "4px",
    }
  },
  listHours: {
    width: "100px",
    justifyContent: "center",
    alignSelf: "stretch",
    borderBottom: "1px solid black"
  },
  mainGrid: {
    maxHeight: "60vh", 
    overflow: "auto",
    minWidth: "400px",
    maxWidth: "1000px",
    margin: "10px",
    // scrollbarWidth: "none",
  },
  list: {
    backgroundColor: theme.palette.primary.main,
    width: "fit-content",
    //overflow: "clip",
  },
  listButton: {
    backgroundColor: theme.palette.primary.light,
    borderRadius: "6px",
    margin: "0px 4px"
  },
  hourBox: {
    borderRadius: "10px",
    margin: "auto",
    padding: "5px",
    borderStyle: "1px solid",
    backgroundColor: theme.palette.primary.contrastText,
  }
}));

const disableDaysOfWeek = [0,6];
const disableDateOfMonth = [27]
const disableDate = (date) => {
  //debugger;
  return DateFns.isWeekend(date) || 
    disableDateOfMonth.includes(DateFns.getDate(date) )
}

const renderDate = (day, selectedDate, isInCurrentMonth, dayComponent) => {
  // You canalso use our internal <Day /> component
  const freeApoitmentsCount =  DateFns.getDate(day) - new Date().getDate();
  //debugger;
  let color ="secondary";
  if (freeApoitmentsCount > 5) {
    color = "primary";
  } else if ( freeApoitmentsCount < 3) {
    color="error";
  }
  return (<Badge 
    color={color}
    badgeContent={ freeApoitmentsCount > 0 && !dayComponent.props.disabled ? freeApoitmentsCount : undefined}
    >{dayComponent}</Badge>);
}

const apotimentTimeStepp = 15;
const ApoitmentDataTime = () => {
  const classes = useStyles();
  //const [date, changeDate] = useState(new Date());

  // prettier-ignore
  return (
      <Grid container alignItems="center" justify='center' spacing={2}>
        <Grid item >
        <Field name="lastName">
        {( { field, form, ...other}) => (
          <KeyboardDateTimePicker
            name={field.name}
            value={field.value}
            allowKeyboardControl
            shouldDisableDate={disableDate}
            openTo="date"
            disablePast
            minutesStep={15}
            variant="static"
            renderDay={renderDate}
            onChange={date => form.setFieldValue(field.name, date, false)}
            {...other}
          />
        )}</Field>
        </Grid >
        <Grid item className={classes.mainGrid}  >
          {/* example list */}
          <List disablePadding component="ul" className={classes.list} >
            {Array(25).fill("").map( (element,index) => (
              <ListItem style={{margin: "0px",padding: "0px"}} disableGutters key={index}>
                <ListItemIcon className={classes.listHours}>
                  <Box color="primary" className={classes.hourBox}>
                    {`${9+Math.floor(index/4)}:${15*(index%4)}${index%4?"":"0"} - ${9+Math.floor((index+1)/4)}:${15*((index+1)%4)}${(index+1)%4?"":"0"}`} 
                  </Box>         
                </ListItemIcon>
                {/* <Divider flexItem color="dark" orientation="vertical"></Divider> */}
                <List className={classes.horizontalList} >
                  {Array( Math.floor(Math.random()*8) % 8).fill("").map( (el,ind) => (
                    <ListItem disableGutters button className={classes.listButton} key={index+"_"+ind}  ><Typography>{`dr. Jan Kowalski`}</Typography></ListItem>
                  ))}
                    
                  {/* <ListItem button  ><Typography>{`dr. Jan Kowalski ${index}`}</Typography></ListItem>
                  <ListItem button ><Typography>{`dr. Jan Kowalski ${index}`}</Typography></ListItem>
                  <ListItem button  ><Typography>{`dr. Jan Kowalski ${index}`}</Typography></ListItem> */}
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