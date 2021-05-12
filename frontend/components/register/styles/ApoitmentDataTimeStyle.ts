import { makeStyles, createStyles, Theme } from "@material-ui/core";

export default makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    padding: "10px",
    margin: "10px",
    height: "100%",
    justifyContent: "center",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  // horizontalList: {
  //   display: 'flex',
  //   flexDirection: 'row',
  //   wrap: "nowrap",
  //   minHeight: "48px",
  //   "& div": {
  //     // border: "1px solid grey",
  //     padding: "4px",
  //   }
  // },
  // listHours: {
  //   width: "100px",
  //   justifyContent: "center",
  //   alignSelf: "stretch",
  //   borderBottom: "1px solid black",
  // },
  apoitmentDataPicker: {
    width: "min-content",
  },
  apoitmentSelectListItem: {
    [theme.breakpoints.up("md")]: {
      flex: 1,
    },
    maxWidth: "800px",
    margin: "2px !important",
    padding: "2px !important",
    backgroundColor: theme.palette.primary.light,
    alignItems: "center",
    display: "flex",
    borderRadius: "10px",
  },
  // list: {
  //   width: "fit-content",
  //   height: "100%",
  //   padding: "10px 0px",
  //   //overflow: "clip",

  // },
  listButton: {
    backgroundColor: theme.palette.common.white,
    borderRadius: "6px",
    margin: "4px",
    "&.Mui-selected": {
      backgroundColor: theme.palette.info.light,
    },
  },
  reservationContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignSelf: "center",
  },
  // hourBox: {
  //   borderRadius: "10px",
  //   margin: "auto",
  //   padding: "3px",
  //   borderStyle: "1px solid",
  //   backgroundColor: theme.palette.primary.contrastText,
  // }
}));
