import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
  Paper,
} from "@material-ui/core";
import useStyles, { WhiteTextField } from "./styles/EmployeesStyle";
import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { Autocomplete, Skeleton } from "@material-ui/lab";
import { useDispatch } from "react-redux";
import MaskedInput from "react-text-mask";
import * as yup from "yup";
import { setMessage } from "../../src/actions/message";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { authService } from "../../lib/authService";
import axios from "axios";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

function TextMaskCustom(props: TextMaskCustomProps) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref: any) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/\d/, /\d/, /\d/, " ", /\d/, /\d/, /\d/, " ", /\d/, /\d/, /\d/]}
      placeholderChar={"\u2000"}
    />
  );
}

const validationSchema = yup.object({
  email: yup
    .string("Wprowadź email")
    .email("Musisz wprowadzić prawidłowy email"),
  password: yup
    .string("Wprowadź hasło")
    .min(5, "Hasło musi zawierać minimum 8 znaków")
    .required("Hasło jest wymagane"),
  phone: yup.string("Wprowadź telefon"),
  firstName: yup.string("Wprowadź imię"),
  lastName: yup.string("Wprowadź nazwisko"),
});

export default function AdminVisitsCalendar(params) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [employees, setExperts] = useState();
  const [services, setServices] = useState<Service[]>();

  const getEmployees = () => {
    return axios
      .get(process.env.BACKEND_HOST + "/employees")
      .then((res) => setExperts(res.data.data))
      .catch((err) => console.error(err));
  };

  useEffect(async () => {
    getEmployees();
    axios
      .get(process.env.BACKEND_HOST + "/services")
      .then((res) => setServices(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (employee_id, setSubmitting, resetForm) => {
    if (!employee_id) return;
    setSubmitting(true);
    axios
      .delete(process.env.BACKEND_HOST + "/employees/" + employee_id)
      .then((res) => {
        dispatch(setMessage("Pomyślnie usunieto", "success"));
        getEmployees();
        resetForm();
      })
      .catch((err) => {
        dispatch(setMessage("Nie udało sie usunac", "error"));
      })
      .finally(() => setSubmitting(false));
  };

  const handleServiceAdd = async (values, actions) => {
    if (!values.service) {
      dispatch(setMessage("Usluga jest wymagana", "error"));
      actions.setSubmiting(false);
      return;
    }
    if (!values.employee) {
      dispatch(setMessage("Pracownik jest wymagany", "error"));
      actions.setSubmitting(false);
      return;
    }

    axios
      .post(process.env.BACKEND_HOST + "/services/assign", {
        employee_id: values.employee.id,
        services: [values.service.id],
      })
      .then((res) => {
        dispatch(setMessage("Pomyślnie przypisano", "success"));
        actions.resetForm();
      })
      .catch((err) => {
        dispatch(setMessage("Nie udało sie przypisac", "error"));
      })
      .finally(() => actions.setSubmitting(false));
  };

  const handleRegister = async (values, actions) => {
    if (!values.email) {
      actions.setFieldError("email", "Email jest wymagany");
      actions.setSubmiting(false);
      return;
    }
    if (!values.phone) {
      actions.setFieldError("phone", "Telefon jest wymagany");
      actions.setSubmitting(false);
      return;
    }
    if (!values.firstName) {
      actions.setFieldError("firstName", "Imię jest wymagane");
      actions.setSubmitting(false);
      return;
    }
    if (!values.lastName) {
      actions.setFieldError("lastName", "Nazwisko jest wymagane");
      actions.setSubmitting(false);
      return;
    }

    axios
      .post(process.env.BACKEND_HOST + "/employees", {
        email: values.email,
        password: values.password,
        first_name: values.firstName,
        last_name: values.lastName,
        phone: values.phone,
        job_title: values.job_title,
        account_type: values.account_type,
      })
      .then((res) => {
        dispatch(setMessage("Pomyślnie dodano", "success"));
        getEmployees();
      })
      .catch((err) => {
        Object.entries(err.response.data.errors).forEach(([key, values]) => {
          actions.setFieldError(key, values[0]);
        });

        dispatch(setMessage("Nie udało sie dodac", "error"));
      })
      .finally(() => actions.setSubmitting(false));
  };

  return (
    <Grid className={classes.root}>
      <Paper className={classes.rootItem}>
        <Box className={classes.flexItemFormFields}>
          <Formik
            // enableReinitialize
            initialValues={{
              email: "",
              password: "",
              phone: "",
              firstName: "",
              lastName: "",
              job_title: "",
              account_type: "",
              service: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleRegister}
          >
            {(props) => (
              <Form>
                <WhiteTextField
                  fullWidth
                  id="job_title"
                  label="Tytuł"
                  variant="outlined"
                  className={classes.textField}
                  name="job_title"
                  value={props.values.job_title}
                  onChange={props.handleChange}
                  error={
                    props.touched.job_title && Boolean(props.errors.job_title)
                  }
                  helperText={props.touched.job_title && props.errors.job_title}
                />
                <FormControl component="fieldset">
                  <FormLabel component="legend">Typ konta</FormLabel>
                  <RadioGroup
                    aria-label="account_type"
                    name="account_type"
                    value={props.values.account_type}
                    onChange={props.handleChange}
                    row
                  >
                    <FormControlLabel
                      value="ADMIN"
                      control={<Radio />}
                      label="Admin"
                    />
                    <FormControlLabel
                      value="EMPLOYEE"
                      control={<Radio />}
                      label="Pracownik"
                    />
                  </RadioGroup>
                </FormControl>
                <WhiteTextField
                  fullWidth
                  id="email"
                  label="Email"
                  variant="outlined"
                  type="email"
                  className={classes.textField}
                  name="email"
                  value={props.values.email}
                  onChange={props.handleChange}
                  error={props.touched.email && Boolean(props.errors.email)}
                  helperText={props.touched.email && props.errors.email}
                />
                <WhiteTextField
                  fullWidth
                  id="firstName"
                  label="Imie"
                  variant="outlined"
                  name="firstName"
                  className={classes.textField}
                  value={props.values.firstName}
                  onChange={props.handleChange}
                  error={
                    props.touched.firstName && Boolean(props.errors.firstName)
                  }
                  helperText={props.touched.firstName && props.errors.firstName}
                />
                <WhiteTextField
                  fullWidth
                  id="lastName"
                  label="Nazwisko"
                  variant="outlined"
                  name="lastName"
                  className={classes.textField}
                  value={props.values.lastName}
                  onChange={props.handleChange}
                  error={
                    props.touched.lastName && Boolean(props.errors.lastName)
                  }
                  helperText={props.touched.lastName && props.errors.lastName}
                />
                <WhiteTextField
                  fullWidth
                  id="phone"
                  name="phone"
                  label="Numer telefonu"
                  variant="outlined"
                  className={classes.textField}
                  value={props.values.phone}
                  onChange={props.handleChange}
                  InputProps={{
                    inputComponent: TextMaskCustom as any,
                  }}
                  error={props.touched.phone && Boolean(props.errors.phone)}
                  helperText={props.touched.phone && props.errors.phone}
                />
                <WhiteTextField
                  fullWidth
                  id="password"
                  label="Hasło"
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  className={classes.textField}
                  name="password"
                  className={classes.password}
                  value={props.values.password}
                  onChange={props.handleChange}
                  error={
                    props.touched.password && Boolean(props.errors.password)
                  }
                  helperText={props.touched.password && props.errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          onMouseDown={() => setShowPassword(!showPassword)}
                          className={classes.icon}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Box className={classes.formItem}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    endIcon={<PersonAddIcon />}
                  >
                    Dodaj pracownika
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
        <Box className={classes.flexItemFormFields}>
          <Formik
            enableReinitialize
            initialValues={{
              employee: null /* (employees && employees[0]) ?? "" */,
              service: null /* (services && services[0]) ?? "" */,
            }}
            // validationSchema={yup.object({employee: yup.string()})}
            onSubmit={handleServiceAdd}
          >
            {(props) => (
              <Form>
                <Box className={classes.formItem}>
                  {employees && employees.length > 0 ? (
                    <Autocomplete
                      id="employees-select"
                      value={props.values.employee}
                      onChange={(event, newValue) => {
                        props.setFieldValue("employee", newValue, false);
                      }}
                      options={employees}
                      className={classes.select}
                      getOptionLabel={(option) => {
                        //debugger;
                        return option.first_name + " " + option.last_name;
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Specjalista"
                          variant="outlined"
                        />
                      )}
                    ></Autocomplete>
                  ) : (
                    <Skeleton variant="rect" height={60} />
                  )}
                </Box>
                <Box className={classes.formItem}>
                  <Button
                    variant="contained"
                    onClick={() =>
                      handleDelete(
                        props.values.employee.id,
                        props.setSubmitting,
                        props.resetForm
                      )
                    }
                    disabled={props.isSubmitting}
                  >
                    Usun Pracownika
                  </Button>
                </Box>
                <Divider></Divider>
                <Box className={classes.formItem}>
                  {services && services.length > 0 ? (
                    <Autocomplete
                      id="services-select"
                      value={props.values.service}
                      onChange={(event, newValue) => {
                        props.setFieldValue("service", newValue, false);
                      }}
                      options={services}
                      className={classes.select}
                      getOptionLabel={(option) => {
                        //debugger;
                        return option.title?.toString() || option.title + "";
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Usługa"
                          variant="outlined"
                        />
                      )}
                    ></Autocomplete>
                  ) : (
                    <Skeleton variant="rect" height={60} />
                  )}
                </Box>
                <Box className={classes.formItem}>
                  <Button variant="contained" type="submit">
                    Dodaj specjalność
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Paper>
    </Grid>
  );
}
