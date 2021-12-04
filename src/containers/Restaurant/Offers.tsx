import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useStore } from '../../hooks/useStore';
import { observer } from 'mobx-react-lite';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import CheckIcon from '@mui/icons-material/Check';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { CardActions } from '@mui/material';

//Offers page for the customer & staff

const Offers = () => {
  const store = useStore();
  React.useEffect(() => {
    async function getOffers() {
      const offers = await store.restaurantStore.offerStore.getOffers();
      console.log(offers);
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
        </Stack>
        <Grid container spacing={5} sx={{ mt: 5 }}>
          {store.restaurantStore.offerStore.offers &&
            store.restaurantStore.offerStore.offers.map((offer: any) => (
              <Grid item key={offer.id} xs={12} sm={6} md={4}>
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
                    image={offer.photo_main}
                    height="200px"
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {offer.title}
                    </Typography>
                    <Divider sx={{ margin: '20px' }} />
                    <Typography sx={{ textAlign: 'justify' }}>
                      {offer.description}
                    </Typography>
                    <Stack>
                      <Chip
                        icon={<ProductionQuantityLimitsIcon />}
                        label={`No. of items: ${offer.number_of_items}`}
                        variant="outlined"
                        color="secondary"
                        sx={{ margin: '20px 10px' }}
                      />
                      <Chip
                        icon={<ControlPointIcon />}
                        label={`Discount: ${offer.discount} %`}
                        variant="outlined"
                        color="secondary"
                        sx={{ margin: '20px 10px' }}
                      />
                    </Stack>
                  </CardContent>
                  <CardActions>
                    <Chip
                      icon={
                        offer.availability ? (
                          <CheckIcon />
                        ) : (
                          <ErrorOutlineIcon />
                        )
                      }
                      label={
                        offer.availability ? 'Available Now' : 'Not Available'
                      }
                      color={offer.availability ? 'primary' : 'error'}
                    />
                  </CardActions>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default observer(Offers);
