import { makeStyles, createStyles, Theme } from "@material-ui/core";
//import Background from "public/images/index.jpg"

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      height: "100vh",
      backgroundImage: `url(/images/index.jpg)`,
      overflowY: "hidden",
    },
    container: {
      backgroundColor: "rgba(0, 0, 0, 0.2)",
      borderRadius: theme.spacing(2),
      height: "85vh",
      width: "90%",
      [theme.breakpoints.down("xs")]: {
        width: "100%",
      },
    },
    logo: {
      color: "white",
      alignSelf: "flex-start",
      marginLeft: "5%",
    },
  })
);
