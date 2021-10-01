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

            <Stack direction="column" width="200px">
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
              {data.customer_review !== '' ? (
                <>
                  <Typography color="primary.main">
                    {data.customer_review}
                  </Typography>
                </>
              ) : (
                <>
                  <TextField
                    id="outlined-multiline-static"
                    label="Multiline"
                    fullWidth
                    multiline
                    rows={4}
                    defaultValue="Good Experience"
                  />
                  <Button>Add Review</Button>
                </>
              )}
            </Stack>
          </Stack>
        </CardContent>
      </Box>
    </Card>
  );
};
export default observer(HorizontalTile);