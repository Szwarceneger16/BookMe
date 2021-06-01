import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";

const drawerWidth = 240;

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {},
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
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: theme.palette.background.dark,
      color: theme.palette.white.main,
    },
    content: {
      marginLeft: drawerWidth,
      maxWidth: `calc(100% - ${drawerWidth}px)`,
      padding: theme.spacing(3),
      [theme.breakpoints.down("xs")]: {
        marginLeft: 0,
        maxWidth: "100%",
      },
    },
    appBarIcon: {
      color: grey[500],
    },
    messagesContainer: {
      paper: {
      maxWidth: 500,
      minWidth: 400,
    },
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
      "&:first-letter": {
        textTransform: "uppercase",
      },
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
