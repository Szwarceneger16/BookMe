import React from "react";
import IndexLayout from "../layouts/IndexLayout";
import { Grid, Typography } from "@material-ui/core";
import Image from "next/image";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100%",
  },
  flexItem: {
    padding: "20px",
  },
  flexContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  flexText: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    borderRadius: theme.spacing(1),
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(1),
    },
    padding: theme.spacing(2),
  },
  whiteText: {
    color: theme.palette.white.main,
  },
}));

export default function index() {
  const classes = useStyles();
  return (
    <>
      <Grid container className={classes.container}>
        <Grid item xs={12} md={7} className={classes.flexText}>
          <Typography variant="h2" className={classes.whiteText} gutterBottom>
            <b>Co to jest BookMe?</b>
          </Typography>
          <Typography className={classes.whiteText}>
            <b>BookMe</b> to system do zarządzania rezerwacjami w różnych
            placówkach. Dodaj poszczególne usługi, oraz specjalistów i ciesz się
            wygodnym zarządzaniem wizytami w Twojej placówce.
          </Typography>
        </Grid>
        <Grid item></Grid>
      </Grid>
    </>
  );
}

index.Layout = IndexLayout;
