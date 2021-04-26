import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  logo: {
    padding: theme.spacing(2),
  },
  itemButton: {
    color: theme.palette.white.main,
    minWidth: 40,
  },
  nested: {
    "& > *": {
      paddingLeft: theme.spacing(5),
    },
  },
  listItem: {
    padding: `${theme.spacing(1)}px ${theme.spacing(4)}px`,
  },
  selected: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    "&::before": {
      content: "''",
      position: "absolute",
      display: "block",
      top: 0,
      left: 0,
      bottom: 0,
      width: 4,
      backgroundColor: theme.palette.primary.main,
    },
  },
  subitem: {
    "&::before": {
      content: "''",
      position: "absolute",
      display: "block",
      top: "50%",
      left: theme.spacing(6),
      width: 6,
      height: 6,
      borderRadius: "50%",
      backgroundColor: theme.palette.white.main,
      transform: "translateY(-50%)",
    },
  },
  subitemActive: {
    position: "relative",
    "&::before": {
      backgroundColor: theme.palette.primary.main,
    },
  },
  listItemText: {
    display: "flex",
    alignItems: "center",
    "& span": {
      paddingTop: 2,
      fontSize: "0.9rem",
      fontWeight: 300,
    },
  },
}));
