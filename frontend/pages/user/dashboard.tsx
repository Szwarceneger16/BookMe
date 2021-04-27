import React from "react";
import CustomerLayout from "../../layouts/CustomerLayout";
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import authHeader from "../../lib/authHeader";
import { Skeleton } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

function Dashboard(props) {
  const user = useSelector((state) => state.auth.user);
  const [dashboardData, setDashboardData] = React.useState(null);

  React.useEffect(() => {
    axios
      .get(process.env.BACKEND_HOST + "/user/dashboard-info", {
        headers: authHeader(),
      })
      .then((res) => {
        setDashboardData(res.data.data);
      })
      .catch((err) => console.log(err.response.config));
  }, []);

  const classes = useStyles();
  return (
    <>
      <Typography variant="h3" component="h2" gutterBottom>
        Witaj {user.first_name},
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <Typography variant="h4" component="h3" color="primary">
              {dashboardData ? (
                dashboardData.user_reservations_count
              ) : (
                <Skeleton variant="rect" width={50} height={40} />
              )}
            </Typography>
            <Typography variant="h6" component="p">
              Tyle wizyt już odbyłeś
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <Typography variant="h4" component="h3" color="primary">
              {dashboardData ? (
                dashboardData.all_reservations_count
              ) : (
                <Skeleton variant="rect" width={50} height={40} />
              )}
            </Typography>
            <Typography variant="h6" component="p">
              Tyle wizyt już mieliśmy
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell scope="row">
                    <b>Imię</b>
                  </TableCell>
                  <TableCell align="center">{user.first_name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell scope="row">
                    <b>Nazwisko</b>
                  </TableCell>
                  <TableCell align="center">{user.last_name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell scope="row">
                    <b>Email</b>
                  </TableCell>
                  <TableCell align="center">{user.email}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell scope="row">
                    <b>Numer telefonu</b>
                  </TableCell>
                  <TableCell align="center">{user.phone}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
}

Dashboard.Layout = CustomerLayout;

export default Dashboard;
