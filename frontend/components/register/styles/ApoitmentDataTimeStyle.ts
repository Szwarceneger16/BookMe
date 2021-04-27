import { makeStyles, createStyles, Theme } from "@material-ui/core";

export default makeStyles((theme: Theme) => ({
    root: {
      flexGrow: 1,
      padding: "10px",
      margin: "10px"
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    horizontalList: {
      display: 'flex',
      flexDirection: 'row',
      wrap: "nowrap",
      minHeight: "48px",
      "& div": {
        // border: "1px solid grey", 
        padding: "4px",
      }
    },
    listHours: {
      width: "100px",
      justifyContent: "center",
      alignSelf: "stretch",
      borderBottom: "1px solid black"
    },
    apoitmentSelectListItem: {
      height: "min-content",
      [theme.breakpoints.up(1538)]: {
        height: "60vh",
      },
      overflow: "auto",
      minWidth: "400px",
      width: "80vw",
      maxWidth: "1000px",
      margin: "0px !important",
      padding: "0px !important",
      backgroundColor: theme.palette.primary.main,
      alignItems: "center",
      display: "flex",
      // scrollbarWidth: "none",
    },
    list: {
      width: "fit-content",
      height: "100%",
      padding: "10px 0px"
      //overflow: "clip",
    },
    listButton: {
      backgroundColor: theme.palette.primary.light,
      borderRadius: "6px",
      margin: "0px 4px"
    },
    hourBox: {
      borderRadius: "10px",
      margin: "auto",
      padding: "3px",
      borderStyle: "1px solid",
      backgroundColor: theme.palette.primary.contrastText,
    }
  }));