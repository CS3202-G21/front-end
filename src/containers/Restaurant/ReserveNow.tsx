import * as React from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import {
  Alert,
  Button,
  Card,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Stack,
  TextField,
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import DatePicker from '../../components/DatePicker';
import SendIcon from '@mui/icons-material/Send';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../hooks/useStore';
import { useHistory } from 'react-router';
import Box from '@mui/material/Box';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  numberOfPeople: yup
    .number()
    .typeError('You must specify a number greater than 0')
    .integer()
    .min(1)
    .max(100)
    .required(),
});

interface ReserveNowProps {}

const ReserveNow: React.FC<ReserveNowProps> = () => {
  const [date, setDate] = React.useState<any>(new Date());
  const [error, setError] = React.useState(false);
  const store = useStore();
  const history = useHistory();
  const [restaurant, setRestaurant] = React.useState('');
  const [mealTime, setMealTime] = React.useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<any>({
    resolver: yupResolver(schema),
  });

  const mealTimeList = [
    { id: 0, title: 'Breakfast' },
    { id: 1, title: 'Lunch' },
    { id: 2, title: 'Dinner' },
  ];
  const restaurantHandleChange = (event: SelectChangeEvent) => {
    setRestaurant(event.target.value as string);
  };
  const mealTimeHandleChange = (event: SelectChangeEvent) => {
    setMealTime(event.target.value as string);
  };
  const reserveNowHandler = async (data: any) => {
    await store.restaurantStore.reserveStore
      .reserveNow(
        restaurant,
        mealTime,
        date.toISOString().split('T')[0],
        data.numberOfPeople
      )
      .then((res) => {
        if (res === 'success') {
          console.log(res);
          history.push('/checkout/reservation');
        } else {
          setError(true);
        }
      });
  };
  React.useEffect(() => {
    async function getData() {
      await store.restaurantStore.getRestaurants();
    }
    getData();
  }, []);

  return (
    <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 }, textAlign: 'center' }}
      >
        <Typography
          component="h1"
          variant="h4"
          align="center"
          color="primary.main"
          p={3}
        >
          Reserve Now
        </Typography>
        <Divider />
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(reserveNowHandler)}
          sx={{ mt: 3 }}
        >
          <Stack direction="row" justifyContent="center" spacing={4} m={3}>
            <Stack direction="column" justifyContent="center" spacing={2}>
              <Typography
                component="h6"
                variant="h6"
                align="center"
                color="primary.main"
              >
                Select the Restaurant
              </Typography>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Restaurant
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={restaurant}
                  label="Restaurant"
                  onChange={restaurantHandleChange}
                >
                  {store.restaurantStore.restaurants &&
                    store.restaurantStore.restaurants.map(
                      (restaurant: any, key: number) => (
                        <MenuItem key={key} value={restaurant.id}>
                          {restaurant.title}
                        </MenuItem>
                      )
                    )}
                </Select>
              </FormControl>
              <Divider />
              <Typography
                component="h6"
                variant="h6"
                align="center"
                color="primary.main"
              >
                Select the Meal Time
              </Typography>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Meal Time</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={mealTime}
                  label="Meal Time"
                  onChange={mealTimeHandleChange}
                >
                  {mealTimeList.map((time: any, key: number) => (
                    <MenuItem key={key} value={time.id}>
                      {time.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Divider />
              <Typography
                component="h6"
                variant="h6"
                align="center"
                color="primary.main"
              >
                Number of People
              </Typography>
              <TextField
                {...register('numberOfPeople')}
                required
                type="number"
                onChange={(event: any) =>
                  event.target.value < 0
                    ? (event.target.value = 0)
                    : event.target.value
                }
                id="numberOfPeople"
                name="numberOfPeople"
                label="Number of People"
                fullWidth
                autoComplete="Number of People"
                variant="outlined"
                autoFocus
                error={errors.numberOfPeople ? true : false}
                helperText={errors.numberOfPeople?.message}
              />
            </Stack>
            <Stack direction="column" justifyContent="center" spacing={2}>
              <Divider orientation="vertical" />
            </Stack>
            <Stack direction="column" justifyContent="center" spacing={2}>
              <Card elevation={10}>
                <Typography
                  component="h6"
                  variant="h6"
                  align="center"
                  color="secondary.main"
                  p={3}
                >
                  Select the date
                </Typography>
                <DatePicker value={date} setValue={setDate} />
              </Card>
            </Stack>
          </Stack>
          <Button
            type="submit"
            disabled={store.hotelStore.bookStore.inProgress ? true : false}
            variant="contained"
            endIcon={<SendIcon />}
            sx={{ alignItems: 'center', m: 5 }}
          >
            Go to Check Out
          </Button>
        </Box>
      </Paper>
      {error && (
        <Alert severity="error">
          {store.restaurantStore.reserveStore.errors}
        </Alert>
      )}
    </Container>
  );
};
export default observer(ReserveNow);
