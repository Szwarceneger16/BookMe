import React, { useState } from "react";
import { Field, Form, Formik, useFormik, FormikProps } from "formik";
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
import { authService } from "../lib/authService";
import { reservationService } from "../lib/reservationService";
import { useDispatch, useSelector } from "react-redux";
import { login as loginAction } from "../src/actions/auth";
import { setMessage } from "../src/actions/message";
import * as DateFns from "date-fns";
import { useRouter } from "next/router";
import Payment from "./register/Payment";
import LoadingButton from "./elements/buttons/LoadingButton";

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

function getStepContent(
  step: number,
  props,
  isSubmitLoading,
  setIsSubmitLoading,
  hasAccount,
  setHasAccount,
  isAuthorized,
  isDateSelected,
  setIsDateSelected
) {
  switch (step) {
    case 0:
      return <SelectService {...props} />;
    case 1:
      return (
        <ApoitmentDataTime
          {...props}
          setIsDateSelected={setIsDateSelected}
          isDateSelected={isDateSelected}
        />
      );
    case 2:
      return (
        <LoginOrRegister
          {...props}
          isSubmitLoading={isSubmitLoading}
          hasAccount={hasAccount}
          setHasAccount={setHasAccount}
          isAuthorized={isAuthorized}
        />
      );
    case 3:
      return <Payment setIsSubmitLoading={setIsSubmitLoading} />;
    default:
      return "Unknown step";
  }
}

export default function HorizontalLabelPositionBelowStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState<number>(0);
  const [hasAccount, setHasAccount] = useState<boolean>(true);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [isDateSelected, setIsDateSelected] = useState<boolean>(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const authUser = useSelector((state) => state.auth.user);
  const steps = getSteps();
  const dispatch = useDispatch();
  const router = useRouter();

  const { register, checkPassword, login } = authService();
  const { setNewReservation } = reservationService();

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
      .email("Musisz wprowadzić prawidłowy email"),
    password: yup
      .string("Wprowadź hasło")
      .min(5, "Hasło musi zawierać minimum 8 znaków")
      .required("Hasło jest wymagane"),
    phone: yup.string("Wprowadź telefon"),
    firstName: yup.string("Wprowadź imię"),
    lastName: yup.string("Wprowadź nazwisko"),
  });

  const formik = useFormik({
    initialValues: {
      selectedService: "",
      email: "",
      password: "",
      phone: "",
      firstName: "",
      lastName: "",
      selectedExpertId: "",
      apoitmentDateStart: "",
      apoitmentDateEnd: "",
    },
    onSubmit: async (values, actions): Promise<void> => {
      if (activeStep === steps.length - 1) {
        console.log(values);
        // console.log(hasAccount,isAuthorized,isLoggedIn);

        // let result;
        // if (hasAccount) {
        //   result = await setNewReservation({
        //     client_id: authUser.id,
        //     place_id: 1,
        //     service_id: values.selectedService,
        //     employee_id: values.selectedExpertId,
        //     datetime_start: DateFns.parseJSON(values.apoitmentDateStart),
        //     datetime_end: DateFns.parseJSON(values.apoitmentDateEnd),
        //   });
        // } else {

        // }
        const result = await setNewReservation({
          client_id: 1 /* authUser.id */,
          place_id: 1,
          service_id: values.selectedService,
          employee_id: values.selectedExpertId,
          datetime_start: DateFns.parseJSON(values.apoitmentDateStart),
          datetime_end: DateFns.parseJSON(values.apoitmentDateEnd),
        });

        if (result) {
          dispatch(setMessage("Wizyta zarezerwowana", "success"));
          //router.push("/");
        } else {
          dispatch(setMessage("Nie udało się zarezerwowac wizyty", "error"));
        }
      } else {
        setIsSubmitLoading(true);
        if (isLoggedIn) {
          // When user is logged in
          await checkPassword(values.password)
            .then((res) => {
              dispatch(setMessage("Pomyślnie się zautoryzowałeś", "success"));
              setIsAuthorized(true);
            })
            .catch((err) => {
              dispatch(
                setMessage(
                  "Wygląda na to, że podałeś złe hasło. Spróbuj jeszcze raz",
                  "error"
                )
              );
              actions.setFieldError("password", "Hasła się nie zgadzają.");
            });
        } else if (!isLoggedIn && !hasAccount) {
          // When user wanna register
          //Can be better option but doesnt block handle submit
          if (!values.email) {
            actions.setFieldError("email", "Email jest wymagany");
            setIsSubmitLoading(false);
            return;
          }
          if (!values.phone) {
            actions.setFieldError("phone", "Telefon jest wymagany");
            setIsSubmitLoading(false);
            return;
          }
          if (!values.firstName) {
            actions.setFieldError("firstName", "Imię jest wymagane");
            setIsSubmitLoading(false);
            return;
          }
          if (!values.lastName) {
            actions.setFieldError("lastName", "Nazwisko jest wymagane");
            setIsSubmitLoading(false);
            return;
          }
          const response = await register({
            email: values.email,
            password: values.password,
            first_name: values.firstName,
            last_name: values.lastName,
            phone: values.phone,
          });
          if (response) {
            setIsAuthorized(true);
            dispatch(
              setMessage(
                "Pomyślnie się zarejestrowałeś. Możesz przejść dalej",
                "success"
              )
            );
            //actions.resetForm();
          } else {
            actions.setFieldError("email", "Ten email jest już używany");
          }
        } else if (!isLoggedIn && hasAccount) {
          // When user wanna login
          if (!values.email) {
            actions.setFieldError("email", "Email jest wymagany");
            setIsSubmitLoading(false);
            return;
          }
          const response = await login({
            email: values.email,
            password: values.password,
          });
          if (response) {
            setIsAuthorized(true);
            //actions.resetForm();
            dispatch(
              setMessage(
                "Pomyślnie się zalogowałeś. Możesz przejść dalej",
                "success"
              )
            );
          } else {
            actions.setFieldError("email", "Niepoprawny email lub hasło");
          }
        }
      }
      setIsSubmitLoading(false);
    },
    validationSchema: validationSchema,
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
        <>
          <Container maxWidth={false}>
            {getStepContent(
              activeStep,
              formik,
              isSubmitLoading,
              setIsSubmitLoading,
              hasAccount,
              setHasAccount,
              isAuthorized,
              isDateSelected,
              setIsDateSelected
            )}
          </Container>

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
              <LoadingButton
                loading={activeStep === steps.length - 1 && isSubmitLoading}
                variant="contained"
                color="primary"
                onClick={() => {
                  activeStep === steps.length - 1
                    ? formik.handleSubmit()
                    : handleNext();
                }}
                endIcon={<NavigateNextIcon />}
                disabled={
                  (!isAuthorized && activeStep === 2) ||
                  (activeStep === 1 && !isDateSelected) ||
                  isSubmitLoading
                }
                type={activeStep === steps.length - 1 ? "submit" : ""}
                form={activeStep === steps.length - 1 ? "payment" : ""}
              >
                {activeStep === steps.length - 1 ? "Zapłać" : "Dalej"}
              </LoadingButton>
            </Grid>
          </Grid>
        </>
      </Box>
    </div>
  );
}
