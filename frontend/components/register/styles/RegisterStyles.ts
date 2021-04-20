import {
  makeStyles,
  createStyles,
  Theme,
  withStyles,
  StepLabel,
  StepConnector,
} from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      height: "100%",
      display: "grid",
      gridTemplateRows: "auto 1fr",
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    contentBox: {
      height: "100%",
      overflowY: "auto",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    stepper: {
      backgroundColor: "transparent",
    },
    stepperButtons: {
      padding: theme.spacing(2),
      display: "flex",
      justifyContent: "space-between",
      // backgroundColor: theme.palette.grey[600]
    },
    stepperLabel: {
      color: theme.palette.white,
    },
  })
);

export const CustomStepLabelStyle = withStyles((theme: Theme) => ({
  label: {
    color: "#ddd",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  active: {
    fontWeight: "bold !important",
    color: "#fff !important",
  },
  completed: {
    color: "#fff !important",
  },
}))(StepLabel);

export const CustomStepConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    "& $line": {
      backgroundColor: "white",
    },
  },
  completed: {
    "& $line": {
      backgroundColor: "white",
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderRadius: 1,
  },
})(StepConnector);

export const CustomStepIconStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#ddd",
    zIndex: 1,
    color: theme.palette.primary.main,
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundColor: "#fff",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  },
  completed: {
    backgroundColor: "#fff",
  },
}));
