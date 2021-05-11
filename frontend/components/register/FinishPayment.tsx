import React from "react";
import { Button, Grid } from "@material-ui/core";
import Image from "next/image";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  white: {
    color: theme.palette.white.main,
    "& > .MuiTypography-root": {
      color: theme.palette.white.main,
    },
  },
  text: {
    paddingLeft: theme.spacing(2),
  },
}));

function FinishPayment({ image, children }) {
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} md={6}>
        <Image src={image} width={500} height={400} />
      </Grid>
      <Grid item xs={12} md={6} className={clsx(classes.white, classes.text)}>
        {children}
        <Link href="/">
          <Button variant="outlined" className={classes.white}>
            Strona główna
          </Button>
        </Link>
        <Link href="/user/dashboard">
          <Button variant="contained" color="primary">
            Panel użytkownika
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
}

export default FinishPayment;
