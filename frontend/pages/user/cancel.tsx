import React from "react";
import { Typography } from "@material-ui/core";
import CustomerLayout from "../../layouts/CustomerLayout";
import CancelReservation from "../../components/user/cancel/CancelReservation";

function Cancel(props) {
  return (
    <>
      <Typography variant="h2" component="h1">
        Odwołaj wizyty
      </Typography>
      <CancelReservation></CancelReservation>
    </>
  );
}

Cancel.Layout = CustomerLayout;

export default Cancel;
