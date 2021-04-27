import { createStyles, makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
      marginTop: theme.spacing(2),
    },
    field: {
      marginTop: theme.spacing(2),
    },
    form: {
      display: "flex",
      flexDirection: "column",
    },
  })
);
