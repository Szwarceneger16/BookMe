import { makeStyles, createStyles, Theme } from "@material-ui/core";

export default makeStyles((theme: Theme) =>
  createStyles({
    white: {
      color: theme.palette.white.main,
    },
    marginTop: {
      marginTop: theme.spacing(2),
    },
  })
);

export const selectStyles = makeStyles((theme: Theme) => ({
  select: {
    color: "white",

    "& .MuiSelect-icon": {
      color: theme.palette.white.main,
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.white.main,
      "&:hover": {
        borderColor: theme.palette.white.darker,
      },
    },
  },
  label: {
    color: theme.palette.white.main,
  },
}));
