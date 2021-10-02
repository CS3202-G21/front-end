import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { observer } from 'mobx-react-lite';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useStore } from '../../hooks/useStore';

import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from '@stripe/react-stripe-js';

import StripeInput from './StripeInput';
import { Alert } from '@mui/material';

const PaymentForm = (props: any) => {
  const stripeJS = useStripe();
  const store = useStore();
  const elements = useElements();
  const [error, setError] = React.useState(false);
  const { type, activeStep, handleBack, handleNext, steps } = props;

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!stripeJS || !elements) {
      return;
    }

    await stripeJS
      .createPaymentMethod({
        type: 'card',
        //@ts-ignore
        card: elements.getElement(CardNumberElement),
        billing_details: {
          address: {
            city: 'Bandarawela',
            country: 'US',
            line1: '62/2',
            line2: 'Diyabibila',
            postal_code: '90100',
            state: 'Uva',
          },
          email: 'wimukthibw@gmail.com',
          name: 'Wyy',
          phone: '0766195350',
        },
      })
      .then((res) => {
        if (!res.error) {
        } else {
          setError(true);
        }
      });
    if (type === 'booking') {
      await store.hotelStore.bookStore
        .payBooking(
          store.hotelStore.bookStore.bookingData.reservation_id,
          store.userStore.userClass,
          store.hotelStore.bookStore.bookingData.customer
        )
        ?.then((response) => {
          if (response === 'success') {
            handleNext();
          } else {
            setError(true);
          }
        });
    } else {
      // code to pay table reservation
      // await store.hotelStore.bookStore
      //   .payBooking(
      //     store.hotelStore.bookStore.receptionistCheckoutData.reservation_id,
      //     store.userStore.userClass,
      //     store.hotelStore.bookStore.receptionistCheckoutData.customer
      //   )
      //   ?.then((response) => {
      //     if (response === 'success') {
      //       handleNext();
      //     } else {
      //       setError(true);
      //     }
      //   });
    }
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="cardName"
              label="Name on card"
              fullWidth
              autoComplete="cc-name"
              variant="standard"
              autoFocus
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              InputProps={{
                //@ts-ignore
                inputComponent: StripeInput,
                inputProps: {
                  component: CardNumberElement,
                },
              }}
              required
              id="cardNumber"
              fullWidth
              autoComplete="cc-number"
              variant="standard"
              autoFocus
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              InputProps={{
                inputProps: {
                  component: CardExpiryElement,
                },
                //@ts-ignore
                inputComponent: StripeInput,
              }}
              required
              id="expDate"
              fullWidth
              autoComplete="cc-exp"
              variant="standard"
              autoFocus
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              InputProps={{
                inputProps: {
                  component: CardCvcElement,
                },
                //@ts-ignore
                inputComponent: StripeInput,
              }}
              required
              id="cvv"
              fullWidth
              autoComplete="cc-csc"
              variant="standard"
              autoFocus
            />
          </Grid>
          <Box sx={{ display: 'flex', width: '100%' }}>
            {activeStep !== 0 && (
              <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                Back
              </Button>
            )}
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, ml: 1, marginLeft: 'auto' }}
            >
              {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
            </Button>
          </Box>
          {error && <Alert severity="error">Invalid Credentials!</Alert>}
        </Grid>
      </form>
    </React.Fragment>
  );
};
export default observer(PaymentForm);
