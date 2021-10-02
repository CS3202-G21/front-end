import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Alert, Button, Container, Divider, Paper, Stack } from '@mui/material';
import { useStore } from '../hooks/useStore';
import { observer } from 'mobx-react-lite';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import SendIcon from '@mui/icons-material/Send';
import { useHistory } from 'react-router';

const StaffCheckout = () => {
  const store = useStore();
  const history = useHistory();
  const [value, setValue] = React.useState('paid');
  const [error, setError] = React.useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };
  const checkoutHandler = async () => {
    value === 'paid'
      ? await store.hotelStore.bookStore
          .payBooking(
            store.hotelStore.bookStore.receptionistCheckoutData.reservation_id,
            store.userStore.userClass,
            store.hotelStore.bookStore.receptionistCheckoutData.customer
          )
          ?.then((response) => {
            if (response === 'success') {
              history.push('/bookings');
            } else {
              setError(true);
            }
          })
      : history.push('/bookings');
  };
  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Typography component="h1" variant="h4" align="center">
          Checkout
        </Typography>
        <Stack
          direction="column"
          justifyContent="center"
          spacing={2}
          sx={{ m: 5 }}
        >
          <Divider />
        </Stack>
        <Typography
          component="h6"
          variant="h6"
          align="center"
          color="secondary.main"
        >
          Select the payment option
        </Typography>
        <FormControl component="fieldset">
          <FormLabel component="legend">Payment option</FormLabel>
          <RadioGroup
            aria-label="gender"
            defaultValue="paid"
            name="radio-buttons-group"
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel
              value="paid"
              control={<Radio />}
              label="Paid through Cash"
            />
            <FormControlLabel
              value="payLater"
              control={<Radio />}
              label="Pay Later"
            />
          </RadioGroup>
        </FormControl>
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          sx={{ alignItems: 'center', m: 5 }}
          onClick={checkoutHandler}
        >
          Go to Check Out
        </Button>
        {error && (
          <Alert severity="error">{store.hotelStore.bookStore.errors}</Alert>
        )}
      </Paper>
    </Container>
  );
};

export default observer(StaffCheckout);
