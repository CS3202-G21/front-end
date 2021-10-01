import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, Chip, Divider, Stack, TextField } from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PersonIcon from '@mui/icons-material/Person';
import KingBedIcon from '@mui/icons-material/KingBed';
import { useStore } from '../hooks/useStore';
import { observer } from 'mobx-react-lite';
import ReviewsIcon from '@mui/icons-material/Reviews';

const HorizontalTile = (props: any) => {
  const { data } = props;
  const store = useStore();
  // "id": 10,
  //           "restaurant_id": 1,
  //           "customer_id": 3,
  //           "meal_time": "lunch",
  //           "num_of_people": 10,
  //           "reserved_date": "2021-09-28",
  //           "customer_arrival": false,
  //           "date_added": "2021-09-21T15:20:35.234000Z"
  return (
    <Card sx={{ display: 'flex', m: 5 }} elevation={10}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Stack direction="row" spacing={4}>
            <Stack direction="column" width="200px">
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

            <Stack direction="column" width="200px">
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
            <Stack direction="column">
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
          </Stack>
        </CardContent>
      </Box>
    </Card>
  );
};
export default observer(HorizontalTile);
