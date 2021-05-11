import React from "react";
import RegisterLayout from "../../layouts/RegisterLayout";
import FinishPayment from "../../components/register/FinishPayment";
import { Typography } from "@material-ui/core";

export default function success() {
  return (
    <FinishPayment image="/images/success.svg">
      <Typography variant="h3">Płatność zakończona powodzeniem</Typography>
      <Typography>Twoja wizyta jest już w pełni zarejestrowana.</Typography>
    </FinishPayment>
  );
}

success.Layout = RegisterLayout;
