import React, { useState } from "react";
import { DatePicker, TimePicker, DateTimePicker } from "@material-ui/pickers";
import {
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  Button,
  Container,
  Grid,
  withStyles,
  makeStyles,
  StepIconProps,
  Theme,
  Box,
} from "@material-ui/core";
import ApoitmentDataTime from "./ApoitmentDataTime";
import {
  useStyles,
  CustomStepIconStyles,
  CustomStepLabelStyle,
  CustomStepConnector,
} from "./register/styles/RegisterStyles";
import clsx from "clsx";
import PeopleIcon from "@material-ui/icons/People";
import EventIcon from "@material-ui/icons/Event";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import PaymentIcon from "@material-ui/icons/Payment";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";

function CustomStepIcon(props: StepIconProps) {
  const classes = CustomStepIconStyles();
  const { active, completed } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <PeopleIcon />,
    2: <EventIcon />,
    3: <LockOpenIcon />,
    4: <PaymentIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

function getSteps() {
  return [
    "Wybierz rodzaj usługi i specjalistę",
    "Wybierz datę wizyty",
    "Zaloguj się lub wprowadź swoje dane",
    "Opłać kaucję",
  ];
}

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return "Select campaign settings...";
    case 1:
      return <ApoitmentDataTime></ApoitmentDataTime>;
    case 2:
      return "This is the bit I really care about!";
    case 3:
      return "This is the bit I really care about!";
    default:
      return "Unknown step";
  }
}

export default function HorizontalLabelPositionBelowStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        className={classes.stepper}
        connector={<CustomStepConnector />}
      >
        {steps.map((label) => (
          <Step key={label}>
            <CustomStepLabelStyle StepIconComponent={CustomStepIcon}>
              {label}
            </CustomStepLabelStyle>
          </Step>
        ))}
      </Stepper>
      <Box className={classes.contentBox}>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <>
            <Container maxWidth="lg">{getStepContent(activeStep)}</Container>

            <Grid
              container
              // alignContent="flex-end"
              // alignItems="flex-end"
              justify="flex-end"
              direction="row"
              className={classes.stepperButtons}
            >
              <Grid item>
                <Button
                  variant="outlined"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.backButton}
                  startIcon={<NavigateBeforeIcon />}
                >
                  Wróć
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  endIcon={<NavigateNextIcon />}
                >
                  {activeStep === steps.length - 1 ? "Zakończ" : "Dalej"}
                </Button>
              </Grid>
            </Grid>
          </>
        )}
      </Box>
    </div>
  );
}
