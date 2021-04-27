import React from "react";
import IndexLayout from "../layouts/IndexLayout";
import { Grid, Typography } from "@material-ui/core";
import Image from "next/image";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100%",
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
        <Grid item xs={12} md={6} className={classes.flexContainer}>
          <Image src="/images/booked.svg" height={400} width={500} />
        </Grid>
        <Grid item xs={12} md={6} className={classes.flexText}>
          <Typography variant="h3" className={classes.whiteText}>
            Co to jest BookMe?
          </Typography>
          <Typography className={classes.whiteText}>
            BookMe to system do zarządzania rezerwacjami w różnych placówkach.
            Dodaj poszczególne usługi, oraz specjalistów i ciesz się wygodnym
            zarządzaniem wizytami w Twojej placówce.
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

index.Layout = IndexLayout;
