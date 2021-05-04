import React from "react";
import RegisterLayout from "../../layouts/RegisterLayout";
import RegisterStepper from "../../components/RegisterStepper";

export default function customer() {
  return (
    <>
      <RegisterStepper></RegisterStepper>
    </>
  );
}

customer.Layout = RegisterLayout;
