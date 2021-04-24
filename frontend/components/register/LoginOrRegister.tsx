import React from "react";
import {
  TextField,
  withStyles,
  Theme,
  Grid,
  Hidden,
  InputAdornment,
  IconButton,
  Box,
  Button,
} from "@material-ui/core";
import { useSelector } from 'react-redux'
import Image from "next/image";
import useStyles, { WhiteTextField } from "./styles/LoginOrRegisterStyles";
import MaskedInput from "react-text-mask";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import LoadingButton from "../buttons/LoadingButton";

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

export default function LoginOrRegister({ isSubmitLoading, ...props }) {
  const classes = useStyles();
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [hasAccount, setHasAccount] = React.useState<boolean>(true);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return (
    <Grid container alignItems="center" justifycontent="center">
      <Hidden smDown>
        <Grid item md={6}>
          <Image
            src="/images/auth.svg"
            width={400}
            height={300}
            alt="Auth image"
          />
        </Grid>
      </Hidden>
      <Grid item xs={12} md={6} className={classes.formGrid}>
        <form onSubmit={props.handleSubmit}>
          { !isLoggedIn ? (
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
          />) : null}
          {!hasAccount ? (
            <>
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
                error={props.touched.lastName && Boolean(props.errors.lastName)}
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
            </>
          ) : null}
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
            error={props.touched.password && Boolean(props.errors.password)}
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
          <Box display="flex" justifyContent="space-between">
            { !isLoggedIn ? (
            <Button
              className={classes.icon}
              onClick={() => setHasAccount(!hasAccount)}
            >
              {hasAccount ? "Nie mam konta" : "Mam konto"}
            </Button> 
            ) : null}
            <LoadingButton
              loading={isSubmitLoading}
              color="primary"
              variant="contained"
              type="submit"
            >
              { !isLoggedIn ? (hasAccount ? "Zaloguj" : "Zarejestruj") : "Potwierdz"}
            </LoadingButton>
          </Box>
        </form>
      </Grid>
    </Grid>
  );
}
