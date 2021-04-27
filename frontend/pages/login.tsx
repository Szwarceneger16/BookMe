import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {
  Box,
  Divider,
  IconButton,
  InputAdornment,
  Paper,
} from "@material-ui/core";
import BookMeLogo from "../components/elements/BookMeLogo";
import { useFormik } from "formik";
import axios from "axios";
import { setMessage } from "../src/actions/message";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import LoadingButton from "../components/elements/buttons/LoadingButton";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { useRouter } from "next/router";
import { login } from "../src/actions/auth";
import { authService } from "../lib/authService";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
  },
  paper: {
    padding: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const validationSchema = yup.object({
  email: yup
    .string("Wprowadź email")
    .email("Musisz wprowadzić prawidłowy email"),
  password: yup
    .string("Wprowadź swoje hasło")
    .min(8, "Hasło powinno zawierać co najmniej 8 znaków")
    .required("Hasło jest wymagane"),
});

export default function Login() {
  const classes = useStyles();
  const [isSubmitLoading, setIsSubmitLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { login } = authService();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, actions) => {
      setIsSubmitLoading(true);
      const response = await login({
        email: values.email,
        password: values.password,
      });
      if (response) {
        actions.resetForm();
        dispatch(setMessage("Pomyślnie się zalogowałeś", "success"));
        router.push("user/dashboard");
      } else {
        actions.setFieldError("email", "Niepoprawny email lub hasło");
      }
      setIsSubmitLoading(false);
    },
  });

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <Paper className={classes.paper}>
        <BookMeLogo />
        <Box p={2} mb={2}>
          <Divider />
        </Box>
        <Typography component="h4" variant="h5">
          Logowanie
        </Typography>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            required
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            id="password"
            label="Hasło"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            name="password"
            required
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
          <LoadingButton
            loading={isSubmitLoading}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Zaloguj się
          </LoadingButton>
        </form>
      </Paper>
    </Container>
  );
}
