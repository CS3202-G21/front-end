import * as React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Box } from '@mui/system';
import { useStore } from '../hooks/useStore';
import { observer } from 'mobx-react-lite';
import { Chip, Divider, Stack } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import KingBedIcon from '@mui/icons-material/KingBed';

const RatingCard = (props: any) => {
  const store = useStore();
  const { customer, room_id, customer_review } = props;
  React.useEffect(() => {
    async function getOffers() {
      store.hotelStore.roomStore.getRoomInfoById(room_id);
      store.userStore.getUserById(customer);
    }
    getOffers();
  }, []);

  return (
    <React.Fragment>
      {store.hotelStore.roomStore.roomInfoById && store.userStore.userById && (
        <Card sx={{ display: 'flex' }} elevation={10}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto', width: 400 }}>
              <Typography variant="h5">
                {store.userStore.userById.first_name}{' '}
                {store.userStore.userById.last_name}
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography
                variant="subtitle1"
                color="text.primary"
                component="div"
              >
                {customer_review}
              </Typography>
              <Stack direction="column">
                <Stack direction="row">
                  <Chip
                    icon={<PersonIcon />}
                    label={store.hotelStore.roomStore.roomInfoById.title}
                    color="secondary"
                    sx={{ ml: 0, m: '10px' }}
                  />
                  <Chip
                    icon={<PersonIcon />}
                    label={`Adults: ${store.hotelStore.roomStore.roomInfoById.number_of_adults}`}
                    color="primary"
                    sx={{ m: '10px' }}
                  />
                </Stack>
                <Stack direction="row">
                  <Chip
                    icon={<KingBedIcon />}
                    label={`Beds: ${store.hotelStore.roomStore.roomInfoById.number_of_beds}`}
                    color="primary"
                    sx={{ m: '10px' }}
                  />
                </Stack>
              </Stack>
            </CardContent>
          </Box>
          <CardMedia
            component="img"
            sx={{ height: 250 }}
            image={store.hotelStore.roomStore.roomInfoById.photo_main}
            alt="Live from space album cover"
          />
        </Card>
      )}
    </React.Fragment>
  );
};
export default observer(RatingCard);
