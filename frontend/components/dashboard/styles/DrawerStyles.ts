import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";

const drawerWidth = 240;

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      backgroundColor: "transparent",
      boxShadow: "none",
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginLeft: theme.spacing(2),
      color: theme.palette.primary.main,
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: theme.palette.background.dark,
      color: theme.palette.white.main,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    appBarIcon: {
      color: grey[500],
    },
    messagesContainer: {
      maxWidth: 500,
    },
    messagesTitle: {
      margin: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    },
    messageItem: {
      margin: `${theme.spacing(1)}px ${theme.spacing(1)}px ${theme.spacing(
        1
      )}px`,
      borderRadius: theme.spacing(1),
      maxWidth: "100%",
      display: "flex",
      alignItems: "center",
    },
    messageTexts: {
      width: "100%",
      marginLeft: theme.spacing(1),
      display: "flex",
      flexDirection: "column",
    },
    messageName: {
      fontSize: ".9em",
      fontWeight: 400,
    },
    messageShort: {
      fontSize: ".7em",
      fontWeight: 300,
      color: grey[700],
      textOverflow: "hidden",
    },
    messagesExpandMore: {
      display: "flex",
      justifyContent: "center",
    },
    notificationIcon: {
      backgroundColor: theme.palette.primary.main,
    },
  })
);
