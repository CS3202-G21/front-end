import * as React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useStore } from '../hooks/useStore';
import { observer } from 'mobx-react-lite';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import RatingCard from '../components/RatingCard';

const Rating = () => {
  const store = useStore();
  React.useEffect(() => {
    async function getOffers() {
      await store.hotelStore.roomStore.getRooms();
      await store.hotelStore.roomStore.getReviews();
      await store.hotelStore.roomStore.getRoomInfo();
    }
    getOffers();
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
            Our Reviews
          </Typography>
          <Typography
            component="h1"
            variant="h1"
            align="center"
            color="primary"
            gutterBottom
          >
            & Ratings
          </Typography>
        </Stack>
        <Stack
          direction="column"
          spacing={4}
          justifyContent="center"
          margin={10}
        >
          {store.hotelStore.roomStore.reviews &&
            store.hotelStore.roomStore.roomInfo &&
            store.hotelStore.roomStore.reviews.map((review: any, key: any) => (
              <Stack direction="row" justifyContent="center">
                <RatingCard
                  key={key}
                  customer={review.customer}
                  room_id={review.room_id}
                  customer_review={review.customer_review}
                />
              </Stack>
            ))}
        </Stack>
      </Container>
    </Box>
  );
};

export default observer(Rating);
