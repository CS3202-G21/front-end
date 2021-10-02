import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, Divider, Stack } from '@mui/material';
import { useStore } from '../hooks/useStore';
import { observer } from 'mobx-react-lite';

const HorizontalTile = (props: any) => {
  const { data } = props;
  const store = useStore();
  const [isMarked, setIsMarked] = React.useState<any>();

  React.useEffect(() => {
    setIsMarked(data.customer_arrival);
  }, []);

  return (
    <Card sx={{ display: 'flex', m: 5 }} elevation={10}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Stack direction="row" spacing={4}>
            <Stack direction="column">
              <Typography color="primary.main">Restaurant: </Typography>
              <Typography
                gutterBottom
                variant="h5"
                component="h5"
                fontWeight="800"
              >
                {
                  store.restaurantStore.restaurants.filter(
                    (restaurant: any) => restaurant.id === data.restaurant_id
                  )[0].title
                }
              </Typography>
              <Divider sx={{ margin: '20px' }} />
              <Typography color="primary.main">Meal Time: </Typography>
              <Typography
                gutterBottom
                variant="h5"
                component="h5"
                fontWeight="800"
              >
                {data.meal_time}
              </Typography>
            </Stack>
            <Stack direction="column">
              <Divider orientation="vertical" />
            </Stack>

            <Stack direction="column" sx={{ alignSelf: 'center' }}>
              <Typography sx={{ textAlign: 'justify' }}>
                Date: {data.reserved_date}
              </Typography>
              <Typography sx={{ textAlign: 'justify' }}>
                Number of People: {data.num_of_people}
              </Typography>
            </Stack>
            <Stack direction="column">
              <Divider orientation="vertical" />
            </Stack>
            {store.userStore.userClass === 0 && (
              <Stack direction="column">
                <Typography sx={{ textAlign: 'justify' }}>
                  Restaurant Details
                </Typography>
                <Divider sx={{ margin: '20px' }} />
                <Typography sx={{ textAlign: 'justify' }}>
                  Floor Number:{' '}
                  {
                    store.restaurantStore.restaurants.filter(
                      (restaurant: any) => restaurant.id === data.restaurant_id
                    )[0].floor_number
                  }
                </Typography>
                <Typography sx={{ textAlign: 'justify' }}>
                  Type:{' '}
                  {
                    store.restaurantStore.restaurants.filter(
                      (restaurant: any) => restaurant.id === data.restaurant_id
                    )[0].type
                  }
                </Typography>
              </Stack>
            )}
            <Stack direction="column" sx={{ alignSelf: 'center' }}>
              <Card>
                <CardMedia
                  component="img"
                  sx={{ width: 300 }}
                  image={
                    store.restaurantStore.restaurants.filter(
                      (restaurant: any) => restaurant.id === data.restaurant_id
                    )[0].photo_main
                  }
                  alt="Live from space album cover"
                />
              </Card>
            </Stack>
            {store.userStore.userClass === 3 && (
              <Stack
                direction="column"
                width="200px"
                sx={{ alignSelf: 'center' }}
              >
                {isMarked ? (
                  <Button
                    disabled={true}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Mark as Arrived
                  </Button>
                ) : (
                  <Button
                    disabled={false}
                    onClick={async () => {
                      await store.restaurantStore.reserveStore.markArrival(
                        data.id
                      );
                      setIsMarked(true);
                    }}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Mark as Arrived
                  </Button>
                )}
              </Stack>
            )}
          </Stack>
        </CardContent>
      </Box>
    </Card>
  );
};
export default observer(HorizontalTile);
