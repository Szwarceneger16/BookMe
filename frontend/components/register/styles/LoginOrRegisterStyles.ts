import {
  TextField,
  withStyles,
  Theme,
  makeStyles,
  createStyles,
} from "@material-ui/core";

export default makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      marginBottom: theme.spacing(2),
    },
    formGrid: {
      paddingTop: theme.spacing(2),
    },
    icon: {
      color: theme.palette.white.main,
    },
  })
);

export const WhiteTextField = withStyles((theme: Theme) => ({
  root: {
    "& label.Mui-focused": {
      color: theme.palette.white.main,
    },
    "& .MuiFormLabel-root": {
      color: theme.palette.white.main,
    },
    "& .Mui-error": {
      color: theme.palette.error.light,
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: theme.palette.white.main,
      },
      "&:hover fieldset": {
        borderColor: theme.palette.white.darker,
      },
      "&.Mui-error:hover fieldset": {
        borderColor: theme.palette.error.light,
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.white.main,
        borderWidth: 2,
      },
    },
    "& input:-webkit-autofill": {
      "-webkit-box-shadow": "0 0 0px 1000px white inset",
      backgroundColor: "rgb(255, 255, 255) !important",
      backgroundImage: "none !important",
    },
    "& .MuiInputBase-input": {
      color: theme.palette.white.main,
      "&:-webkit-autofill, &:-internal-autofill-selected": {
        backgroundColor: "rgba(255, 255, 255, 0.1) !important",
      },
    },
  },
}))(TextField);
