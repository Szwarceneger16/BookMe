import React from "react";
import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { useFormik } from "formik";
import * as yup from "yup";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import LoadingButton from "../common/buttons/LoadingButton";
import { Save } from "@material-ui/icons";
import authHeader from "../../lib/authHeader";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setMessage } from "../../src/actions/message";
import useStyles from "./style/SettingsFormStyles";

const validationSchema = yup.object({
  password: yup
    .string("Wprowadź swoje hasło")
    .min(8, "Hasło powinno zawierać co najmniej 8 znaków")
    .required("Hasło jest wymagane"),
  new_password: yup
    .string("Wprowadź nowe hasło")
    .min(8, "Hasło powinno zawierać co najmniej 8 znaków")
    .required("Nowe hasło jest wymagane"),
  new_password_2: yup
    .string("Powtórz nowe hasło")
    .min(8, "Hasło powinno zawierać co najmniej 8 znaków")
    .required("Powtórzenie hasła jest wymagane")
    .oneOf([yup.ref("new_password"), null], "Hasła muszą być identyczne"),
});

function ChangePasswordSettings(props) {
  const classes = useStyles();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = React.useState(false);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      password: "",
      new_password: "",
      new_password_2: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, actions) => {
      setIsSubmitLoading(true);

      await axios
        .post(
          process.env.BACKEND_HOST + "/user/change-password",
          {
            password: values.password,
            new_password: values.new_password,
          },
          {
            headers: authHeader(),
          }
        )
        .then((res) => {
          dispatch(setMessage("Pomyślnie zmieniono hasło", "success"));
          actions.resetForm();
        })
        .catch((err) => {
          dispatch(setMessage("Wystąpił błąd podczas zmiany hasła", "error"));
          if (err.response && err.response.status == 405) {
            actions.setFieldError("password", "Podane hasło nie zgadza się");
          }
        });
      setIsSubmitLoading(false);
    },
  });

  return (
    <Paper className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={4}>
          <Typography variant="h5" gutterBottom>
            Zmień hasło
          </Typography>
          <Typography variant="caption">
            Aby zmienić hasło do konta należy najpierw podać stare hasło, a
            następnie nowe. Musisz pamiętać o tym, aby hasło miało minimum 8
            znaków.
          </Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <form onSubmit={formik.handleSubmit} className={classes.form}>
            <TextField
              fullWidth
              id="password"
              label="Hasło"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              name="password"
              className={classes.field}
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              id="new_password"
              label="Nowe hasło"
              type={showNewPassword ? "text" : "password"}
              variant="outlined"
              name="new_password"
              className={classes.field}
              value={formik.values.new_password}
              onChange={formik.handleChange}
              error={
                formik.touched.new_password &&
                Boolean(formik.errors.new_password)
              }
              helperText={
                formik.touched.new_password && formik.errors.new_password
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle new password visibility"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      onMouseDown={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              id="new_password_2"
              label="Powtórz nowe hasło"
              type={showNewPassword ? "text" : "password"}
              variant="outlined"
              name="new_password_2"
              className={classes.field}
              value={formik.values.new_password_2}
              onChange={formik.handleChange}
              error={
                formik.touched.new_password_2 &&
                Boolean(formik.errors.new_password_2)
              }
              helperText={
                formik.touched.new_password_2 && formik.errors.new_password_2
              }
              // InputProps={{
              //   endAdornment: (
              //     <InputAdornment position="end">
              //       <IconButton
              //         aria-label="toggle new password visibility"
              //         onClick={() => setShowNewPassword(!showNewPassword)}
              //         onMouseDown={() => setShowNewPassword(!showNewPassword)}
              //       >
              //         {showNewPassword ? <Visibility /> : <VisibilityOff />}
              //       </IconButton>
              //     </InputAdornment>
              //   ),
              // }}
            />
            <Box display="flex" justifyContent="flex-end">
              <LoadingButton
                loading={isSubmitLoading}
                color="primary"
                variant="contained"
                type="submit"
                startIcon={<Save />}
                className={classes.field}
              >
                Zmień
              </LoadingButton>
            </Box>
          </form>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ChangePasswordSettings;
