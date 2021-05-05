import React from "react";
import { Typography } from "@material-ui/core";
import CustomerLayout from "../../layouts/AdminLayout";

function All(props) {
  return (
    <>
      <Typography variant="h2" component="h1">
        Odwołaj wizytę
      </Typography>
    </>
  );
}

All.Layout = CustomerLayout;

export default All;
