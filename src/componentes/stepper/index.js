import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import useStyles from './styles';
import '../../styles/global.css';

function getSteps() {
  return ['', '', ''];
}

export default function HorizontalStepper({ getStepContent, title }) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
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
      <div className="flexRow itemsCenter">
        {title}
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>
              { getStepContent(activeStep) }
            </Typography>
            <div className="flexRow contentCenter ">
              <button
                disabled={activeStep === 0}
                onClick={handleBack}
                className="btAzul mb2rem"
                type="button"
              >
                Anterior
              </button>
              <button
                className="btLaranja ml1rem mb2rem"
                type="button"
                onClick={handleNext}
              >
                {activeStep === steps.length - 1 ? 'Criar conta' : 'Proximo'}
              </button>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}
