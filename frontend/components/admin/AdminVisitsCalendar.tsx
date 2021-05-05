import { Grid } from '@material-ui/core';
import { Calendar } from '@material-ui/pickers'
import React from 'react';
import {useStyles} from './styles/AdminVisitsCalendar'

export default function AdminVisitsCalendar(params:type) {
    
  const classes = useStyles();

    return (
      <Grid className={classes.root}>
        <Calendar
          date={new Date()}
          onChange={() => {}}
        />
      </Grid>
        
    )
}