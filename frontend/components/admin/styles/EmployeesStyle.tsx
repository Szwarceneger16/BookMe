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
      color: theme.palette.info.dark,
    },
    root: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
    },
    paper: {
      width: "100%",
      margin: theme.spacing(2),
    },

    rootItem: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      width: "100%",
      justifyContent: "center",
      alignItems: "end",
      padding: theme.spacing(2),
    },
    flexItemFormFields: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      width: 300,
      margin: theme.spacing(0, 2),
      height: "max-content",
    },
    formItem: {
      margin: theme.spacing(2, 0),
      width: "inherit",
      "&:first-child": {
        marginTop: 0,
      },
    },
  })
);

export const WhiteTextField = withStyles((theme: Theme) => ({
  root: {
    "& .Mui-error": {
      color: theme.palette.error.light,
    },
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: theme.palette.info.dark,
      },
      "&.Mui-error:hover fieldset": {
        borderColor: theme.palette.info.dark,
      },
    },
    "& input:-webkit-autofill": {
      "-webkit-box-shadow": "0 0 0px 1000px white inset",
      backgroundColor: "rgb(255, 255, 255) !important",
      backgroundImage: "none !important",
    },
    "& .MuiInputBase-input": {
      "&:-webkit-autofill, &:-internal-autofill-selected": {
        backgroundColor: "rgba(255, 255, 255, 0.1) !important",
      },
    },
  },
}))(TextField);
