import * as React from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import BasicForm from './BasicForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useStore } from '../../hooks/useStore';
import { Button } from '@mui/material';
import { useHistory } from 'react-router';
import { useParams } from 'react-router';

// integration of stripe API

const stripePromise = loadStripe(
  'pk_test_51HGUvrDOqWcprKpuPB7mjHMXK9ecsAjBIIXmRzZG6fVsT2OmRbGNAOkMRTjCSGv3xzruZHrNukXsi1Ie5e8FS7HU00PYo5KVVr'
);

// added a stepper for the payment gateway

const steps = ['Basic Information', 'Review your order', 'Payment details'];

//Checkout page for the users
// renders According to the user type

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);

  let { type } = useParams<any>();

  function getStepContent(step: number, handleBack: any, handleNext: any) {
    switch (step) {
      case 0:
        return (
          <BasicForm
            activeStep={step}
            handleBack={handleBack}
            handleNext={handleNext}
            steps={steps}
          />
        );
      case 1:
        return (
          <Review
            type={type}
            activeStep={step}
            handleBack={handleBack}
            handleNext={handleNext}
            steps={steps}
          />
        );
      case 2:
        return (
          <Elements stripe={stripePromise}>
            <PaymentForm
              type={type}
              activeStep={step}
              handleBack={handleBack}
              handleNext={handleNext}
              steps={steps}
            />
          </Elements>
        );
      default:
        throw new Error('Unknown step');
    }
  }
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const store = useStore();
  const history = useHistory();

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Typography component="h1" variant="h4" align="center">
          Checkout
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <React.Fragment>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your{' '}
                {type === 'booking' ? 'booking' : 'reservation'}.
              </Typography>
              <Typography variant="subtitle1">
                Your {type === 'booking' ? 'booking' : 'reservation'}. number is
                #
                {type === 'booking'
                  ? store.hotelStore.bookStore.bookingData.id
                  : store.restaurantStore.reserveStore.reserveData.id}
                .
              </Typography>
              <Button
                variant="outlined"
                onClick={() => history.push('/')}
                sx={{ m: 3 }}
              >
                Go Back Home
              </Button>
              <Button
                variant="contained"
                onClick={() =>
                  history.push(
                    type === 'booking' ? '/bookings' : '/reservations'
                  )
                }
                sx={{ m: 3, marginLeft: 'auto' }}
              >
                Go to {type === 'booking' ? 'Bookings' : 'Reservations'}
              </Button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep, handleBack, handleNext)}
            </React.Fragment>
          )}
        </React.Fragment>
      </Paper>
    </Container>
  );
}
