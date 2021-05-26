import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { clearMessage } from "../src/actions/message";
import { SnackbarProvider, useSnackbar } from "notistack";

export default function MessagesProvider({ children }) {
  return (
    <SnackbarProvider maxSnack={3}>
      <Messages>{children}</Messages>
    </SnackbarProvider>
  );
}

function Messages({ children }) {
  const { message, severity } = useSelector((state) => state.message);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (message) {
      enqueueSnackbar(message, { variant: severity });
      dispatch(clearMessage());
    }
  }, [message]);

  return <>{children}</>;
}
