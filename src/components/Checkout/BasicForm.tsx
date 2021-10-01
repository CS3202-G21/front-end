import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../hooks/useStore';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  address1: yup.string().required(),
  address2: yup.string(),
  city: yup.string().required(),
  state: yup.string(),
  zip: yup.string().min(5).max(32).required(),
  mobile: yup.string().min(10).max(12).required(),
});

const BasicForm = (props: any) => {
  const store = useStore();
  const { activeStep, handleBack, handleNext, steps } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<any>({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = async (data: any) => {
    handleNext();
    console.log(data);
    // store.authStore.setUsername(data.username);
    // store.authStore.setFName(data.firstName);
    // store.authStore.setLName(data.lastName);
    // store.authStore.setEmail(data.email);
    // store.authStore.setPassword(data.password);
    // reset();
    // history.push('/home');
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Basic Information
      </Typography>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmitHandler)}
        sx={{ mt: 3 }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register('firstName')}
              autoComplete="firstName"
              name="firstName"
              required
              fullWidth
              id="firstName"
              label="First Name"
              error={errors.firstName ? true : false}
              helperText={errors.firstName?.message}
              autoFocus
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register('lastName')}
              autoComplete="lastName"
              name="lastName"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              error={errors.lastName ? true : false}
              helperText={errors.lastName?.message}
              autoFocus
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...register('address1')}
              required
              id="address1"
              name="address1"
              label="Address line 1"
              fullWidth
              autoComplete="shipping address-line1"
              variant="standard"
              autoFocus
              error={errors.address1 ? true : false}
              helperText={errors.address1?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...register('address2')}
              id="address2"
              name="address2"
              label="Address line 2"
              fullWidth
              autoComplete="shipping address-line2"
              variant="standard"
              autoFocus
              error={errors.address2 ? true : false}
              helperText={errors.address2?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register('city')}
              required
              id="city"
              name="city"
              label="City"
              fullWidth
              autoComplete="shipping address-level2"
              variant="standard"
              autoFocus
              error={errors.city ? true : false}
              helperText={errors.city?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register('state')}
              id="state"
              name="state"
              label="State/Province/Region"
              fullWidth
              variant="standard"
              autoFocus
              error={errors.state ? true : false}
              helperText={errors.state?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register('zip')}
              required
              id="zip"
              name="zip"
              label="Zip / Postal code"
              fullWidth
              autoComplete="shipping postal-code"
              variant="standard"
              autoFocus
              error={errors.zip ? true : false}
              helperText={errors.zip?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register('mobile')}
              required
              id="mobile"
              name="mobile"
              label="Mobile Number"
              fullWidth
              autoComplete="Mobile Number"
              variant="standard"
              autoFocus
              error={errors.mobile ? true : false}
              helperText={errors.mobile?.message}
            />
          </Grid>
          <Box sx={{ marginLeft: 'auto' }}>
            {activeStep !== 0 && (
              <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                Back
              </Button>
            )}
            <Button type="submit" variant="contained" sx={{ mt: 3, ml: 1 }}>
              {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
            </Button>
          </Box>
          {/* <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox color="secondary" name="saveAddress" value="yes" />
            }
            label="Use this address for payment details"
          />
        </Grid> */}
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default observer(BasicForm);
