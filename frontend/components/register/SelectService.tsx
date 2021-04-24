import React from "react";
import Image from "next/image";
import Skeleton from "@material-ui/lab/Skeleton";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import useStyles, { selectStyles } from "./styles/SelectServiceStyles";
import axios from "axios";

interface Service{
  id: number;
  title: string;
}

export default function SelectService(props) {
  const classes = useStyles();
  const select_styles = selectStyles();
  const [services, setServices] = React.useState<Service[]>([]);

  React.useEffect(async (): Promise<void> => {
    await axios.get(process.env.BACKEND_HOST + "/services")
        .then( res => setServices(res.data.data));
  }, []);

  return (
    <Grid container justifycontent="center" alignItems="center">
      <Grid item xs={12} md={6}>
        <Image src="/images/pick.svg" width={400} height={300} />
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h5" component="h3" className={classes.white}>
          Wybierz usługę.
        </Typography>
        <Typography className={classes.white}>
          Aby rozpocząć wybierz usługę, z której chcesz skorzystać.
        </Typography>
          {services.length > 0 ? (
              <>
              <FormControl variant="outlined" fullWidth className={classes.marginTop}>
                  <InputLabel
                      id="services-select-label"
                      className={select_styles.label}
                  >
                      Usługi
                  </InputLabel>
            <Select
              labelId="services-select-label"
              id="services-select"
              label="Usługi"
              name="selectedService"
              className={select_styles.select}
              value={props.values.selectedService}
              onChange={props.handleChange}
            >
              {services.map((service) => (
                <MenuItem key={service.id} value={service.id}>
                  {service.title}
                </MenuItem>
              ))}
            </Select>
              </FormControl>
              </>
          ) : (
            <Skeleton variant="rect" style={{width: "100%"}} height={60} />
          )}

      </Grid>
    </Grid>
  );
}
