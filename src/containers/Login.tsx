import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useStore } from '../hooks/useStore';
import { useHistory } from 'react-router-dom';
import { Alert } from '@mui/material';
import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { login } from '../services/AuthServices';

//Yup Schema for the customer login form validation

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

//Login Page for the customer

const Login = () => {
  const store = useStore();
  const history = useHistory();
  const [error, setError] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<any>({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = async (data: any) => {
    console.log(data);
    var response;
    if (store.authStore) {
      store.authStore.setUsername(data.username);
      store.authStore.setPassword(data.password);
      response = await store.authStore.login();
    } else {
      response = await login(data.username, data.password);
    }

    if (response === 'success') {
      history.push('/');
      reset();
    } else if (response === 'error') {
      setError(store.authStore.errors);
    }
  };
  return (
    <Grid
      container
      id="main"
      component="main"
      sx={{
        height: '100vh',
      }}
    >
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage:
            'url(https://source.unsplash.com/MXbM1NrRqtI/1600x900)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light'
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmitHandler)}
            sx={{ mt: 1 }}
          >
            <TextField
              {...register('username')}
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              error={errors.username ? true : false}
              helperText={errors.username?.message}
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              {...register('password')}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              error={errors.password ? true : false}
              helperText={errors.password?.message}
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              disabled={
                store.authStore
                  ? store.authStore.inProgress
                    ? true
                    : false
                  : false
              }
              type="submit"
              fullWidth
              variant="contained"
              aria-label="submit"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            {error && <Alert severity="error">{error}</Alert>}
            <Grid container>
              <Grid item xs>
                <Link href="/staff" variant="body2">
                  Staff Member?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default observer(Login);
