import { makeStyles, createStyles , Theme,fade } from "@material-ui/core";
import { 
    Typography,
    Icon,
    Grid
  } from '@material-ui/core';
  import {
    CalendarToday
  } from '@material-ui/icons';
  import Link from 'next/link'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
    grid: {
        flexDirection: "row",
        display: "flex",
        height: "min-content",
        width: "min-content",
        alignItems: "flex-end",
        cursor: "pointer",
    },
    title: {
        display: 'block',
        // [theme.breakpoints.up('')]: {
        //   display: 'block',
        // },
    },
    })
);

export default function (params:type) {
    const classes = useStyles();
    return (
        <Link href="/">
            <Grid className={classes.grid}>
                <Typography className={classes.title} variant="h4" noWrap> 
                    <Icon fontSize="inherit"><CalendarToday></CalendarToday></Icon>
                </Typography>
                    
                <Typography className={classes.title} variant="h4" noWrap> 
                    Book
                </Typography>
                <Typography className={classes.title} variant="h6" noWrap> 
                    Me
                </Typography>
            </Grid>
        </Link>
    )
}