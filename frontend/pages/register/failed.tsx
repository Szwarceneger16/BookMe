import React from "react";
import RegisterLayout from "../../layouts/RegisterLayout";
import { Typography } from "@material-ui/core";
import FinishPayment from "../../components/register/FinishPayment";

export default function failed() {
  return (
    <FinishPayment image="/images/fail.svg">
      <Typography variant="h3">Płatność zakończona niepowodzeniem</Typography>
      <Typography>Możesz ponowić płatność w panelu użytkownika.</Typography>
    </FinishPayment>
  );
}

failed.Layout = RegisterLayout;
