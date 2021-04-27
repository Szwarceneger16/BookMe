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
import LoadingButton from "../elements/buttons/LoadingButton";
import { Save } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import axios from "axios";
import authHeader from "../../lib/authHeader";
import { setMessage } from "../../src/actions/message";
import MaskedInput from "react-text-mask";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import * as yup from "yup";
import useStyles from "./style/SettingsFormStyles";

interface TextMaskCustomProps {
  inputRef: (ref: HTMLInputElement | null) => void;
}
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
  phone: yup.string("Wprowadź numer telefonu"),
});

function ChangeContactSettings(props) {
  const [isSubmitLoading, setIsSubmitLoading] = React.useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = useSelector((state) => state.auth.user);

  const formik = useFormik({
    initialValues: {
      email: user.email,
      phone: user.phone,
    },
    validationSchema: validationSchema,
    onSubmit: async (values, actions) => {
      setIsSubmitLoading(true);
      await axios
        .post(
          process.env.BACKEND_HOST + "/user/update-data",
          {
            email: formik.values.email,
            phone: formik.values.phone,
          },
          {
            headers: authHeader(),
          }
        )
        .then((res) => {
          dispatch(
            setMessage("Pomyślnie zmieniono dane użytkownika", "success")
          );
        })
        .catch((err) => {
          actions.setFieldError("email", "Podany email jest zajęty");
          console.log(err.response);
          dispatch(
            setMessage(
              "Wystąpił błąd przy zmianie informacji użytkownika",
              "error"
            )
          );
        });
      setIsSubmitLoading(false);
    },
  });

  return (
    <Paper>
      <Grid container spacing={1} className={classes.root}>
        <Grid item xs={12} md={4}>
          <Typography variant="h5" gutterBottom>
            Dane użytkownika
          </Typography>
          <Typography variant="caption">
            W tej sekcji możesz zmienić swój email i telefon. Pamiętaj, że są
            one wymagane do przypomnień.
          </Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <form onSubmit={formik.handleSubmit} className={classes.form}>
            <TextField
              fullWidth
              id="email"
              label="Email"
              type="email"
              variant="outlined"
              name="email"
              className={classes.field}
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              fullWidth
              id="phone"
              label="Numer telefonu"
              type="text"
              variant="outlined"
              name="phone"
              className={classes.field}
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
              InputProps={{
                inputComponent: TextMaskCustom as any,
              }}
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

export default ChangeContactSettings;
