import React from "react";
import VisitHistory from "../../../components/user/VisitHistory";
import { Typography } from "@material-ui/core";
import CustomerLayout from "../../../layouts/AdminLayout";
import WorkHours from "../../../components/admin/WorkHours";

function All(props) {
  return (
    <>
      <Typography variant="h2" component="h1" gutterBottom>
        Zarzadzaj godzinami pracy
      </Typography>
      <WorkHours />
    </>
  );
}

All.Layout = CustomerLayout;

export default All;
