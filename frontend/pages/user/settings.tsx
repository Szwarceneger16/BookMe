import React from "react";
import { Typography } from "@material-ui/core";
import CustomerLayout from "../../layouts/CustomerLayout";
import ChangePasswordSettings from "../../components/user/ChangePasswordSettings";
import { useSelector } from "react-redux";
import ChangeContactSettings from "../../components/user/ChangeContactSettings";

function Settings(props) {
  const user = useSelector((state) => state.auth.user);
  return (
    <>
      <Typography variant="h3" component="h2">
        Ustawienia
      </Typography>
      <ChangePasswordSettings />
      <ChangeContactSettings />
    </>
  );
}

Settings.Layout = CustomerLayout;

export default Settings;
