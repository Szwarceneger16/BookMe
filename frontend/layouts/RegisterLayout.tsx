import React from "react";
import { Box, Typography } from "@material-ui/core";
import useStyles from "../components/register/styles/BoxStyle";
import { useLogin } from "../lib/authService";
import BookMeLogo from "../components/common/BookMeLogo";

export default function EmptyLayout({ children }) {
  const classes = useStyles();
  useLogin();
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      className={classes.root}
    >
      <BookMeLogo color="white" />
      <Box className={classes.container}>{children}</Box>
    </Box>
  );
}
