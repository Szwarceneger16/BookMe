import React from "react";
import Image from "next/image";
import clsx from "clsx";
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

const SERVICES = [
  { id: 2, name: "Kardiolog" },
  { id: 3, name: "Ginekolog" },
  { id: 4, name: "Badanie wzroku" },
  { id: 5, name: "Sesja u fizjoterapeuty" },
];

export default function SelectService(props) {
  const classes = useStyles();
  const select_styles = selectStyles();
  const [services, setServices] = React.useState([]);

  React.useEffect(async () => {
    //TODO
    //Async save to state
    setServices(SERVICES);
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
        <FormControl variant="outlined" fullWidth className={classes.marginTop}>
          <InputLabel
            id="services-select-label"
            className={select_styles.label}
          >
            Usługi
          </InputLabel>
          {services.length > 0 ? (
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
                  {service.name}
                </MenuItem>
              ))}
            </Select>
          ) : (
            <Skeleton variant="rect" width={300} height={30} />
          )}
        </FormControl>
      </Grid>
    </Grid>
  );
}
