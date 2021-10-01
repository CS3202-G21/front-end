import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import CheckIcon from '@mui/icons-material/Check';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Button, Paper, Stack } from '@mui/material';
import ApartmentIcon from '@mui/icons-material/Apartment';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PersonIcon from '@mui/icons-material/Person';
import KingBedIcon from '@mui/icons-material/KingBed';
import { useHistory } from 'react-router';
import { useStore } from '../hooks/useStore';
import { observer } from 'mobx-react-lite';

const RoomCard = (props: any) => {
  const { id, roomInfo, room_number, status, floor } = props;
  const store = useStore();
  const history = useHistory();

  const bookNowHandler = () => {
    store.hotelStore.bookStore.setRoomDetails({
      ...roomInfo,
      roomId: id,
      roomNumber: room_number,
    });
    history.push('/book-now');
  };

  return (
    <Grid item key={id} xs={12} sm={6} md={4}>
      <Card
        elevation={5}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CardMedia
          component="img"
          image={roomInfo.photo_main}
          height="200px"
          alt="random"
        />
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography gutterBottom variant="h5" component="h5" fontWeight="800">
            {roomInfo.title}
          </Typography>
          <Divider sx={{ margin: '20px' }} />
          <Typography sx={{ textAlign: 'justify' }}>
            {roomInfo.description}
          </Typography>
          <Paper
            elevation={12}
            sx={{ bgcolor: 'primary.main', p: 1, margin: '16px -20px' }}
          >
            <Typography
              gutterBottom
              fontWeight="800"
              variant="h5"
              component="h2"
              color="primary.contrastText"
            >
              {`Room Number: ${room_number}`}
            </Typography>
          </Paper>
          <Stack direction="row">
            <Stack direction="column">
              <Chip
                icon={<MonetizationOnIcon />}
                label={`Price: ${roomInfo.price} LKR`}
                variant="outlined"
                color="primary"
                sx={{ margin: '10px' }}
              />
              <Chip
                icon={<ApartmentIcon />}
                label={`Floor: ${floor}`}
                variant="outlined"
                color="primary"
                sx={{ margin: '10px' }}
              />
            </Stack>
            <Stack direction="column">
              <Chip
                icon={<PersonIcon />}
                label={`Adults: ${roomInfo.number_of_adults}`}
                variant="outlined"
                color="primary"
                sx={{ margin: '10px' }}
              />
              <Chip
                icon={<KingBedIcon />}
                label={`Beds: ${roomInfo.number_of_beds}`}
                variant="outlined"
                color="primary"
                sx={{ margin: '10px' }}
              />
            </Stack>
          </Stack>
        </CardContent>
        <CardActions>
          <Chip
            icon={status ? <CheckIcon /> : <ErrorOutlineIcon />}
            label={status ? 'Available' : 'Unavailable'}
            color={status ? 'primary' : 'error'}
            sx={{ margin: '10px' }}
          />
          <Button
            variant="contained"
            color="secondary"
            sx={{ ml: 'auto' }}
            onClick={bookNowHandler}
          >
            Book Now
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
export default observer(RoomCard);
