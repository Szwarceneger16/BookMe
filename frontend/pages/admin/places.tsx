import React from "react";
import { Typography } from "@material-ui/core";
import AdminLayout from "../../layouts/AdminLayout";
import PlacesComponent from "../../components/admin/Places";

function Places(props) {
  return (
    <>
      <Typography variant="h2" component="h1" gutterBottom>
        Miejsca
      </Typography>
      <PlacesComponent />
    </>
  );
}

Places.Layout = AdminLayout;

export default Places;
