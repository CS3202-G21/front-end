import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useStore } from '../../hooks/useStore';
import { observer } from 'mobx-react-lite';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { Button, FormControl, InputLabel, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import RoomCard from '../../components/RoomCard';

interface RoomsProps {}

const Rooms: React.FC<RoomsProps> = () => {
  const store = useStore();
  const [priceRangeId, setPriceRangeId] = React.useState<any>('');
  const [roomType, setRoomType] = React.useState('');

  const priceRangeHandleChange = (event: SelectChangeEvent) => {
    setPriceRangeId(event.target.value);
  };

  const roomTypeHandleChange = (event: SelectChangeEvent) => {
    setRoomType(event.target.value as string);
  };

  const priceList = [
    { id: 1, minPrice: 0, maxPrice: 20000 },
    { id: 2, minPrice: 20000, maxPrice: 30000 },
    { id: 3, minPrice: 30000, maxPrice: 50000 },
    { id: 4, minPrice: 50000, maxPrice: 80000 },
    { id: 5, minPrice: 80000, maxPrice: 10000 },
  ];
  React.useEffect(() => {
    async function getData() {
      await store.hotelStore.roomStore.getRooms();
      await store.hotelStore.roomStore.getRoomInfo();
      await store.hotelStore.roomStore.getRoomTypes();
    }
    getData();
  }, []);

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        pt: 8,
        pb: 6,
      }}
    >
      <Container maxWidth="lg">
        <Stack
          sx={{ alignItems: 'flex-end' }}
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          <Typography
            component="h2"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Rooms at
          </Typography>
          <Typography
            component="h1"
            variant="h1"
            align="center"
            color="primary"
            gutterBottom
          >
            Cloud Hotel
          </Typography>
        </Stack>
        <Grid
          container
          sx={{ marginTop: '50px', alignItems: 'center' }}
          spacing={2}
        >
          <Grid item sm={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Room Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={roomType}
                label="Room Type"
                onChange={roomTypeHandleChange}
              >
                {store.hotelStore.roomStore.roomTypes.length !== 0 &&
                  store.hotelStore.roomStore.roomTypes.map(
                    (roomType: any, key: number) => (
                      <MenuItem key={key} value={roomType.id}>
                        {roomType.type}
                      </MenuItem>
                    )
                  )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Price</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={priceRangeId}
                label="priceRangeId"
                onChange={priceRangeHandleChange}
              >
                {priceList.map((p: any, key: any) => (
                  <MenuItem key={key} value={p.id}>
                    LKR {p.minPrice !== 0 ? p.minPrice + ' - ' : ''}
                    {p.maxPrice}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={4}>
            <Button
              variant="outlined"
              startIcon={<FilterAltIcon />}
              onClick={() => {
                store.hotelStore.roomStore.getFilterRooms(
                  roomType,
                  priceList.filter((pr) => pr.id === priceRangeId)[0]
                );
              }}
            >
              Filter
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={5} sx={{ marginTop: '20px' }}>
          {store.hotelStore.roomStore.roomInfo &&
            store.hotelStore.roomStore.filterRooms &&
            store.hotelStore.roomStore.filterRooms.map((room: any) => (
              <RoomCard
                key={room.id}
                id={room.id}
                roomInfo={
                  store.hotelStore.roomStore.roomInfo.filter(
                    (roomInfo: any) => roomInfo.id === room.type
                  )[0]
                }
                room_number={room.room_number}
                status={room.status}
                floor={room.floor_number}
              />
            ))}
        </Grid>
      </Container>
    </Box>
  );
};
export default observer(Rooms);
