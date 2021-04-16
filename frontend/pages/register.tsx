import React from "react";
import RegisterLayout from "../layouts/RegisterLayout";
import StaticDataPicker from "../components/DatePicker";

export default function customer() {
  return (
      <>
    <div>Register</div>
    <StaticDataPicker />
    </>
    );
}

customer.Layout = RegisterLayout;