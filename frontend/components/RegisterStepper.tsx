import React, { useState } from "react";
import { 
  DatePicker ,
  TimePicker ,
  DateTimePicker
} from "@material-ui/pickers";
import { Field, Form, Formik, FormikProps } from 'formik';
import {
  Typography,
  makeStyles,
  Stepper ,
  Step ,
  StepLabel ,
  Theme,
  Button,
  Container,
  createStyles,
  Grid
} from "@material-ui/core";
import ApoitmentDataTime from "../components/ApoitmentDataTime";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    mainContainer: {
        minHeight: "80vh"
    },
    stepperButtons: {
        paddingBottom: theme.spacing(2) ,
        paddingRight: theme.spacing(2) ,
        // backgroundColor: theme.palette.grey[600]
    }
  }),
);

function getSteps() {
    return ['Select campaign settings', 'Create an ad group', 'Create an ad'];
  }
  
function getStepContent(step: number) {
    switch (step) {
      case 0:
        return 'Select campaign settings...';
      case 1:
        return (<ApoitmentDataTime></ApoitmentDataTime>);
      case 2:
        return 'This is the bit I really care about!';
      default:
        return 'Unknown step';
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
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>All steps completed</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
                 <Formik
                    initialValues={{ name: 'jared' }}
                    onSubmit={(values, actions) => {
                      setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        actions.setSubmitting(false);
                      }, 1000);
                    }}

                  >{
                    (props) => (
                      <Container maxWidth="lg" className={classes.mainContainer} >
                        {getStepContent(activeStep)}
                      </Container>
                    )
                  }</Formik>
              
            
            <Grid container 
                // alignContent="flex-end" 
                // alignItems="flex-end" 
                justify="flex-end"
                direction="row" 
                className={classes.stepperButtons}
            >
                <Grid item>
                    <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        className={classes.backButton}
                    >
                        Back
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={handleNext}>
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                </Grid>
            </Grid>
          </div>
        )}
      </div>
    </div>
  );
}