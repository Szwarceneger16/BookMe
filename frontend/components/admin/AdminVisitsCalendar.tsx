import { Box, Button, Grid } from '@material-ui/core';
import { Calendar } from '@material-ui/pickers'
import { styles } from '@material-ui/pickers/views/Calendar/Calendar';
import React from 'react';
import {useStyles} from './styles/AdminVisitsCalendar'

export default function AdminVisitsCalendar(params:type) {
    
  const classes = useStyles();

    return (
      <Grid className={classes.root}>
        <Box>
        <Calendar
          date={new Date()}
          onChange={() => {}}
        />
        </Box>
        
        <Box className={classes.allVisitContainer}>
          {Array(4).fill("").map((element,index) => (
            <Button className={classes.listButton}  key={index}>{""+index+index+index}</Button>
          ))}
        </Box>
      </Grid>
        
    )
}