import React from "react";
import { Box, Typography } from "@material-ui/core";
import useStyles from "../components/index/styles/BoxStyle";
import AppBar from "../components/index/AppBar";

export default function EmptyLayout({ children }) {
  const classes = useStyles();
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      className={classes.root}
    >
      <AppBar />
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        className={classes.logo}
      >
        INDEX
      </Typography>
      <Box className={classes.container}>{children}</Box>
    </Box>
  );
}
