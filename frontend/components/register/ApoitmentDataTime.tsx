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
import useStyles from "./styles/ApoitmentDataTimeStyle";
import theme from "../../src/theme";
import classes from "*.module.css";
import * as DateFns from "date-fns";
//if (window) { window.dateFns = DateFns; }

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

const disableDaysOfWeek = [0,6];
const disableDateOfMonth = [27]
const disableDate = (date) => {
  //debugger;
  return DateFns.isWeekend(date) || 
    disableDateOfMonth.includes(DateFns.getDate(date) )
}

const renderDate = (day, selectedDate, isInCurrentMonth, dayComponent) => {
  // You canalso use our internal <Day /> component
  const freeApoitmentsCount =  DateFns.differenceInCalendarDays(day,new Date());
  if (freeApoitmentsCount > 7 || !isInCurrentMonth) {
    return (dayComponent);
  }
  //debugger;
  let color ="secondary";
  if (freeApoitmentsCount > 5) {
    color ="primary";
  } else if ( freeApoitmentsCount < 3) {
    color="error";
  }
  return (<Badge 
    color={color}
    badgeContent={ freeApoitmentsCount > 0 && !dayComponent.props.disabled ? freeApoitmentsCount : undefined}
    >{dayComponent}</Badge>);
}

const config = {
  apotimentTimeStepp: 15,
  startTimeHour: 9,
  endTimeHour: 15,
}
const ApoitmentDataTime = ({isDateSelected,setIsDateSelected,...props}) => {
  const classes = useStyles();
  const [selectedApotitment ,setSelectedApotitment] = useState('');
  const [ displayedDate , setdisplayedDate ] = useState(
    DateFns.toDate( DateFns.set(new Date(), {hours: config.startTimeHour, minutes: 0}))
  );
  //console.log(displayedDate);

  const apoitmentTimeInterval = DateFns.eachMinuteOfInterval(
    {
    start: DateFns.toDate(displayedDate),
    end: (
      DateFns.getHours( displayedDate) === config.startTimeHour ? 
      DateFns.toDate( DateFns.set(displayedDate, {
        hours: config.endTimeHour,
        minutes: 0
      })) :
      DateFns.toDate( DateFns.add(displayedDate, {
        hours: 1,
        minutes: 0
      }))
      )
  },{step: config.apotimentTimeStepp});

  const result = [];
  apoitmentTimeInterval.forEach( (element, index, elements) => {
    if ( index !== elements.length - 1) {
      result.push((
        <ListItem style={{margin: "0px",padding: "0px"}} disableGutters key={index}>
          <ListItemIcon className={classes.listHours}>
            <Box color="primary" className={classes.hourBox}>
              {`${DateFns.getHours(element)}:
              ${DateFns.getMinutes(element) === 0 ? '00' : DateFns.getMinutes(element)}
              -
              ${DateFns.getHours(elements[index+1])}:
              ${DateFns.getMinutes(elements[index+1])  === 0 ? 
              '00' : 
              DateFns.getMinutes(elements[index+1])
              }`}
            </Box>         
          </ListItemIcon>
        {/* <Divider flexItem color="dark" orientation="vertical"></Divider> */}
          <List className={classes.horizontalList} >
            {Array(3/*  Math.floor(Math.random()*8) % 8 */).fill("").map( (el,ind) => (
              <ListItem disableGutters button 
                selected={ selectedApotitment === index+"_"+ind }
                className={classes.listButton} 
                key={index+"_"+ind}
                onClick={ () => {
                  handleApoitmentSelect(index,1)
                  setSelectedApotitment(index+"_"+ind);
                } }
              >
                <Typography>{`dr. Jan Kowalski`}</Typography>
              </ListItem>
            ))}
              
          </List>
        </ListItem>
        ));
    }
  });

  const handleApoitmentSelect = (dateindex,expertId) => {
    setIsDateSelected(true);
    props.setFieldValue('selectedExpertId',expertId);
    props.setFieldValue('apoitmentDate',apoitmentTimeInterval[dateindex]);
  }

  return (
      <Grid container alignItems="center" justify='center' spacing={2}>
        <Grid item >

          <KeyboardDateTimePicker
            name="apoitmentDate"
            value={displayedDate}
            allowKeyboardControl
            shouldDisableDate={disableDate}
            openTo="date"
            disablePast
            clearable
            minutesStep={15}
            variant="static"
            renderDay={renderDate}
            onChange={(date) => {
              if ( DateFns.differenceInDays(date, displayedDate)) {
                setdisplayedDate( DateFns.set(date,{
                  hours: config.startTimeHour,
                  minutes: 0
                }))
              } else {
                setdisplayedDate(date)
              }   
            }}
          />

        </Grid >
        <Grid item className={classes.apoitmentSelectListItem}  >
          <List disablePadding component="ul" className={classes.list} >
            {result}
          </List>
        </Grid >
      </Grid>
  )
};

export default ApoitmentDataTime;