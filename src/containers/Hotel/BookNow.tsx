import * as React from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Alert, Button, Card, Divider, Stack, TextField } from '@mui/material';
import DatePicker from '../../components/DatePicker';
import SendIcon from '@mui/icons-material/Send';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../hooks/useStore';
import HorizontalCard from '../../components/HorizontalCard';
import { useHistory } from 'react-router';
import { Box } from '@mui/system';

interface BookNowProps {}

const BookNow: React.FC<BookNowProps> = () => {
  const [startingDate, setStartingDate] = React.useState<any>(new Date());
  const [endingDate, setEndingDate] = React.useState<any>(new Date());
  const [error, setError] = React.useState(false);
  const [dateError, setDateError] = React.useState(false);
  const [dateErrorMsg, setDateErrorMsg] = React.useState('');
  const [username, setUsername] = React.useState('');
  const store = useStore();
  const history = useHistory();

  const bookNowHandler = async () => {
    if (startingDate.getDate() >= new Date().getDate()) {
      setDateError(false);
      if (endingDate.getDate() > startingDate.getDate()) {
        setDateError(false);
        await store.hotelStore.bookStore
          .bookNow(
            store.hotelStore.bookStore.roomDetails.roomId,
            store.userStore.userClass === 2
              ? username
              : store.userStore.currentUser?.id,
            startingDate.toISOString().split('T')[0],
            endingDate.toISOString().split('T')[0],
            store.userStore.userClass === 2 ? false : true
          )
          .then((res) => {
            if (res === 'success') {
              store.userStore.userClass === 2
                ? history.push('/checkout-staff')
                : history.push('/checkout/booking');
            } else {
              setError(true);
            }
          });
      } else {
        setDateErrorMsg(
          'Select a date where end date is greater than start date'
        );
        setDateError(true);
      }
    } else {
      setDateErrorMsg('Select a future as start date');
      setDateError(true);
    }
  };

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
          Book Now
        </Typography>
        <Divider />
        {store.hotelStore.bookStore.roomDetails && (
          <Stack direction="row" justifyContent="center" spacing={5} m={8}>
            <HorizontalCard roomData={store.hotelStore.bookStore.roomDetails} />
          </Stack>
        )}{' '}
        <Divider />
        {store.userStore.userClass === 2 && (
          <Stack
            direction="column"
            justifyContent="center"
            spacing={5}
            m={8}
            sx={{ alignItems: 'center' }}
          >
            <Typography
              component="h6"
              variant="h6"
              align="center"
              color="secondary.main"
            >
              Enter Customer Username
            </Typography>
            <Box maxWidth="sm" sx={{ margin: 'auto' }}>
              <TextField
                value={username}
                id="outlined-basic"
                label="Username"
                variant="outlined"
                onChange={(event) => setUsername(event.target.value)}
              />
            </Box>
          </Stack>
        )}
        <Stack direction="row" justifyContent="center" spacing={4} m={3}>
          <Stack direction="column" justifyContent="center" spacing={2}>
            <Card elevation={10}>
              <Typography
                component="h6"
                variant="h6"
                align="center"
                color="secondary.main"
                p={3}
              >
                Select the starting date
              </Typography>
              <DatePicker value={startingDate} setValue={setStartingDate} />
            </Card>
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
                Select the ending date
              </Typography>
              <DatePicker value={endingDate} setValue={setEndingDate} />
            </Card>
          </Stack>
        </Stack>
        <Button
          disabled={store.hotelStore.bookStore.inProgress ? true : false}
          variant="contained"
          endIcon={<SendIcon />}
          sx={{ alignItems: 'center', m: 5 }}
          onClick={bookNowHandler}
        >
          Go to Check Out
        </Button>
      </Paper>
      {error && (
        <Alert severity="error">{store.hotelStore.bookStore.errors}</Alert>
      )}
      {dateError && dateErrorMsg !== '' && (
        <Alert severity="error">{dateErrorMsg}</Alert>
      )}
    </Container>
  );
};
export default observer(BookNow);
