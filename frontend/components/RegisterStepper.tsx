import React, { useState } from "react";
import { Field, Form, Formik, FormikProps } from "formik";
import {
  Typography,
  Stepper,
  Step,
  Button,
  Container,
  Grid,
  StepIconProps,
  Box,
} from "@material-ui/core";
import ApoitmentDataTime from "./register/ApoitmentDataTime";
import {
  useStyles,
  CustomStepIconStyles,
  CustomStepLabelStyle,
  CustomStepConnector,
} from "./register/styles/RegisterStyles";
import * as yup from "yup";
import clsx from "clsx";
import PeopleIcon from "@material-ui/icons/People";
import EventIcon from "@material-ui/icons/Event";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import PaymentIcon from "@material-ui/icons/Payment";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import SelectService from "./register/SelectService";
import LoginOrRegister from "./register/LoginOrRegister";
import axios from "axios";

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
    "Wybierz rodzaj usługi",
    "Wybierz datę wizyty",
    "Zaloguj się lub wprowadź swoje dane",
    "Opłać kaucję",
  ];
}

function getStepContent(step: number, props, isSubmitLoading) {
  switch (step) {
    case 0:
      return <SelectService {...props} />;
    case 1:
      return <ApoitmentDataTime {...props} />;
    case 2:
      return <LoginOrRegister {...props} isSubmitLoading={isSubmitLoading} />;
    case 3:
      return "This is the bit I really care about!";
    default:
      return "Unknown step";
  }
}

export default function HorizontalLabelPositionBelowStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState<number>(0);
  const [needRegister, setNeedRegister] = useState<boolean>(true);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);
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

  const validationSchema = yup.object({
    email: yup
      .string("Wprowadź email")
      .email("Musisz wprowadzić prawidłowy email")
      .required("Email jest wymagany"),
    password: yup
      .string("Wprowadź hasło")
      .min(8, "Hasło musi zawierać minimum 8 znaków")
      .required("Hasło jest wymagane"),
    phone: yup.string("Wprowadź telefon").required("Telefon jest wymagany"),
    firstName: yup.string("Wprowadź imię").required("Imię jest wymagane"),
    lastName: yup
      .string("Wprowadź nazwisko")
      .required("Nazwisko jest wymagane"),
  });

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
            <Formik
              initialValues={{
                selectedService: "",
                email: "",
                password: "",
                phone: "",
                firstName: "",
                lastName: "",
                selectedExpertId: "",
                apoitmentDate: "",
                isLoading: false,
              }}
              onSubmit={async (values, actions): Promise<void> => {
                setIsSubmitLoading(true);
                if (needRegister) {
                  await axios
                    .post(process.env.BACKEND_HOST + "/auth/register", {
                      email: values.email,
                      password: values.password,
                      first_name: values.firstName,
                      last_name: values.lastName,
                      phone: values.phone,
                    })
                    .then((res) => {
                      console.log(res);
                      setIsAuthorized(true);
                      actions.resetForm();
                    })
                    .catch((err) => {
                      if (err.response.status === 422) {
                        actions.setFieldError(
                          "email",
                          "Ten email jest już używany"
                        );
                      }
                    });
                  setIsSubmitLoading(false);
                }
              }}
              validationSchema={validationSchema}
            >
              {(props) => (
                <Container maxWidth={false}>
                  {getStepContent(activeStep, props, isSubmitLoading)}
                </Container>
              )}
            </Formik>

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
                  disabled={!isAuthorized && activeStep === 2}
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
