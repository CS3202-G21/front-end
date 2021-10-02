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
  const [data, setData] = React.useState<any>();
  const [roomData, setRoomData] = React.useState<any>();
  React.useEffect(() => {
    async function getData() {
      store.hotelStore.roomStore.getRoomInfoById(room_id);
      store.userStore.getUserById(customer).then((res) => {
        setData(store.userStore.userById);
      });

      setRoomData(store.hotelStore.roomStore.roomInfoById);
    }
    getData();
  }, []);

  return (
    <React.Fragment>
      {store.hotelStore.roomStore.roomInfoById && store.userStore.userById && (
        <Card sx={{ display: 'flex' }} elevation={10}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto', width: 400 }}>
              {data && (
                <Typography variant="h5">
                  {data.first_name} {data.last_name}
                </Typography>
              )}

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
                    label={roomData.title}
                    color="secondary"
                    sx={{ ml: 0, m: '10px' }}
                  />
                  <Chip
                    icon={<PersonIcon />}
                    label={`Adults: ${roomData.number_of_adults}`}
                    color="primary"
                    sx={{ m: '10px' }}
                  />
                </Stack>
                <Stack direction="row">
                  <Chip
                    icon={<KingBedIcon />}
                    label={`Beds: ${roomData.number_of_beds}`}
                    color="primary"
                    sx={{ m: '10px' }}
                  />
                </Stack>
              </Stack>
            </CardContent>
          </Box>
          <CardMedia
            component="img"
            sx={{ width: 400 }}
            image={roomData.photo_main}
            alt="Live from space album cover"
          />
        </Card>
      )}
    </React.Fragment>
  );
};
export default observer(RatingCard);
