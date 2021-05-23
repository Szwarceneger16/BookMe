import React from "react";
import { Typography } from "@material-ui/core";
import AdminLayout from "../../layouts/AdminLayout";
import EmployeesManage from "../../components/admin/EmployeesManage";

function Employees(props) {
  return (
    <>
      <Typography variant="h2" component="h1" gutterBottom>
        Pracownicy
      </Typography>
      <EmployeesManage />
    </>
  );
}

Employees.Layout = AdminLayout;

export default Employees;
