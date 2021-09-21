import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useStore } from '../../hooks/useStore';
import { observer } from 'mobx-react-lite';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

const Offers = () => {
  const store = useStore();
  React.useEffect(() => {
    async function getOffers() {
      const offers = await store.offerStore.getOffers();
      console.log(offers);
    }
    getOffers();
  });

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        pt: 8,
        pb: 6,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          component="h2"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Special
        </Typography>
        <Typography
          component="h1"
          variant="h1"
          align="center"
          color="primary"
          gutterBottom
        >
          Offers
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
        >
          Cloud Hotel offers ultimate comfort and luxury. This 4-storied hotel
          is a beautiful combination of traditional grandeur and modern
          facilities. The 255 exclusive guest rooms are furnished with a range
          of modern amenities such as television and internet access
        </Typography>
        <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          <Button variant="contained">Visit Hotel</Button>
          <Button variant="outlined">Visit Restaurant</Button>
        </Stack>
        {store.offerStore.offers &&
          store.offerStore.offers.map((offer: any) => (
            <Grid item key={offer.id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    // 16:9
                    pt: '56.25%',
                  }}
                  image="https://source.unsplash.com/collection/3759609"
                  alt="random"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {offer.title}
                  </Typography>
                  <Typography>{offer.description}</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Use Now</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Container>
    </Box>
  );
};

export default observer(Offers);
