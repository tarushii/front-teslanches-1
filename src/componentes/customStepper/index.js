/* eslint-disable react/destructuring-assignment */
import React from 'react';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './styles.css';
import '../../styles/global.css';
import { useStyles, useColorlibStepIconStyles } from './styles';

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: '1',
    2: '2',
    3: '3',
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
  return ['', '', ''];
}

export default function CustomStepper({ getStepContent, title, data }) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  console.log(data);

  if (activeStep === steps.length) {
    alert('Usuário registrado com sucesso!');
    window.location.href = 'http://localhost:3000/';
  }

  console.log(activeStep);
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
        <Stepper className="mb2rem" alternativeLabel activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>
              {getStepContent(activeStep)}
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
