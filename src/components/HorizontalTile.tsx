import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, Chip, Divider, Stack, TextField } from '@mui/material';
import { useStore } from '../hooks/useStore';
import { observer } from 'mobx-react-lite';
import ReviewsIcon from '@mui/icons-material/Reviews';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const HorizontalTile = (props: any) => {
  const { data } = props;
  const store = useStore();
  const [checkInActive, setCheckInActive] = React.useState<any>();
  const [checkOutActive, setCheckOutActive] = React.useState<any>();
  const [review, setReview] = React.useState('Good Experience');
  const [paid, setPaid] = React.useState<any>();
  const [isReviewed, setIsReviewed] = React.useState<any>();
  const [userData, setUserData] = React.useState<any>();

  React.useEffect(() => {
    async function getData() {
      store.userStore.getUserById(data.customer_id).then((res) => {
        setUserData(store.userStore.userById);
      });
      setIsReviewed(data.customer_review === '' ? false : true);
      setReview(
        data.customer_review === '' ? 'Good Experience' : data.customer_review
      );
      setCheckInActive(data.checked_in);
      setCheckOutActive(data.checked_out);
      setPaid(data.payment_status);
    }
    getData();
  }, []);

  return (
    <Card sx={{ display: 'flex', m: 5 }} elevation={10}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Stack direction="row" spacing={4}>
            <Stack direction="column">
              <Typography color="primary.main">Booking Number: </Typography>
              <Typography
                gutterBottom
                variant="h5"
                component="h5"
                fontWeight="800"
              >
                {data.id}
              </Typography>
              <Divider sx={{ margin: '20px' }} />
              <Typography color="primary.main">Room Number: </Typography>
              <Typography
                gutterBottom
                variant="h5"
                component="h5"
                fontWeight="800"
              >
                {
                  store.hotelStore.roomStore.rooms.filter(
                    (room: any) => room.id === data.room_id
                  )[0].room_number
                }
              </Typography>
            </Stack>
            <Stack direction="column">
              <Divider orientation="vertical" />
            </Stack>

            <Stack
              direction="column"
              width="200px"
              sx={{ alignSelf: 'center' }}
            >
              <Typography sx={{ textAlign: 'justify' }}>
                Start Date: {data.start_date}
              </Typography>
              <Typography sx={{ textAlign: 'justify' }}>
                End Date: {data.end_date}
              </Typography>
            </Stack>
            <Stack direction="column">
              <Divider orientation="vertical" />
            </Stack>
            {store.userStore.userClass === 2 && (
              <Stack direction="column">
                {checkInActive ? (
                  <Button
                    disabled={true}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Check In
                  </Button>
                ) : (
                  <Button
                    disabled={false}
                    onClick={async () => {
                      await store.hotelStore.bookStore.checkIn(data.id);
                      setCheckInActive(true);
                    }}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Check In
                  </Button>
                )}
                {checkOutActive ? (
                  <Button
                    disabled={true}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Check Out
                  </Button>
                ) : (
                  <Button
                    disabled={false}
                    onClick={async () => {
                      await store.hotelStore.bookStore.checkOut(data.id);
                      setCheckOutActive(true);
                    }}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Check Out
                  </Button>
                )}
                {userData && (
                  <Button
                    disabled={paid}
                    onClick={async () => {
                      await store.hotelStore.bookStore.payBooking(
                        data.id,
                        store.userStore.userClass,
                        userData.username
                      ); //change the is to username
                      setPaid(true);
                    }}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    {paid ? 'Paid' : 'Pay Now'}
                  </Button>
                )}
              </Stack>
            )}
            {store.userStore.userClass === 0 && (
              <>
                <Stack direction="column">
                  <Chip
                    icon={<MonetizationOnIcon />}
                    label={`Price: ${data.total_price} LKR`}
                    variant="outlined"
                    color="primary"
                    sx={{ margin: '10px' }}
                  />
                  {data.customer_review !== '' && (
                    <Chip
                      icon={<ReviewsIcon />}
                      label={`Reviews Added`}
                      variant="outlined"
                      color="primary"
                      sx={{ margin: '10px' }}
                    />
                  )}
                </Stack>
                <Stack direction="column">
                  <Divider orientation="vertical" />
                </Stack>
                <Stack direction="column" width="200px">
                  {isReviewed ? (
                    <Typography color="primary.main">{review}</Typography>
                  ) : (
                    <>
                      <TextField
                        id="outlined-multiline-static"
                        label="Multiline"
                        fullWidth
                        multiline
                        rows={4}
                        value={review}
                        onChange={(event) => setReview(event.target.value)}
                      />
                      <Button
                        onClick={() => {
                          store.hotelStore.bookStore.addReview(data.id, review);
                          setIsReviewed(true);
                        }}
                      >
                        Add Review
                      </Button>
                    </>
                  )}
                </Stack>
              </>
            )}
          </Stack>
        </CardContent>
      </Box>
    </Card>
  );
};
export default observer(HorizontalTile);
