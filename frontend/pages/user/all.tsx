import React from "react";
import VisitHistory from "../../components/user/VisitHistory";
import { Typography } from "@material-ui/core";
import CustomerLayout from "../../layouts/CustomerLayout";

function All(props) {
  return (
    <>
      <Typography variant="h2" component="h1">
        Wszystkie wizyty
      </Typography>
      <VisitHistory />
    </>
  );
}

All.Layout = CustomerLayout;

export default All;
