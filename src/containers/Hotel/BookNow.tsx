import * as React from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Alert, Button, Card, Divider, Stack } from '@mui/material';
import DatePicker from '../../components/DatePicker';
import SendIcon from '@mui/icons-material/Send';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../hooks/useStore';
import HorizontalCard from '../../components/HorizontalCard';
import { useHistory } from 'react-router';

interface BookNowProps {}

const BookNow: React.FC<BookNowProps> = () => {
  const [startingDate, setStartingDate] = React.useState<any>(new Date());
  const [endingDate, setEndingDate] = React.useState<any>(new Date());
  const [error, setError] = React.useState(false);
  const store = useStore();
  const history = useHistory();

  const bookNowHandler = async () => {
    await store.hotelStore.bookStore
      .bookNow(
        store.hotelStore.bookStore.roomDetails.roomId,
        store.userStore.currentUser?.id,
        startingDate.toISOString().split('T')[0],
        endingDate.toISOString().split('T')[0]
      )
      .then((res) => {
        if (res === 'success') {
          history.push('/checkout/booking');
        } else {
          setError(true);
        }
      });
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
    </Container>
  );
};
export default observer(BookNow);
