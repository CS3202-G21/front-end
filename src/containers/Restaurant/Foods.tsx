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
import FoodCard from '../../components/FoodCard';

interface FoodsProps {}

const Foods: React.FC<FoodsProps> = () => {
  const store = useStore();
  const [type, setType] = React.useState('');
  const [restaurant, setRestaurant] = React.useState('');

  const typeList = [
    { id: 'appetizer', title: 'Appetizer' },
    { id: 'main', title: 'Main' },
    { id: 'dessert', title: 'Dessert' },
    { id: 'drink', title: 'Drink' },
  ];

  const typeHandleChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };

  const restaurantHandleChange = (event: SelectChangeEvent) => {
    setRestaurant(event.target.value as string);
  };
  React.useEffect(() => {
    async function getData() {
      await store.restaurantStore.offerStore.getOffers();
      await store.restaurantStore.foodStore.getFoods();
      await store.restaurantStore.getRestaurants();
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
            Food &
          </Typography>
          <Typography
            component="h1"
            variant="h1"
            align="center"
            color="primary"
            gutterBottom
          >
            Beverages
          </Typography>
        </Stack>
        <Grid
          container
          sx={{ marginTop: '50px', alignItems: 'center' }}
          spacing={2}
        >
          <Grid item sm={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                label="Type"
                onChange={typeHandleChange}
              >
                {typeList.length !== 0 &&
                  typeList.map((type, key) => (
                    <MenuItem key={key} value={type.id}>
                      {type.title}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Restaurant</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={restaurant}
                label="Restaurant"
                onChange={restaurantHandleChange}
              >
                {store.restaurantStore.restaurants &&
                  store.restaurantStore.restaurants.map(
                    (restaurant: any, key: number) => (
                      <MenuItem key={key} value={restaurant.id}>
                        {restaurant.title}
                      </MenuItem>
                    )
                  )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={4}>
            <Button
              variant="outlined"
              startIcon={<FilterAltIcon />}
              onClick={() => {
                store.restaurantStore.foodStore.getFilterFoods(
                  type,
                  restaurant
                );
              }}
            >
              Filter
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={5} sx={{ mt: 5 }}>
          {store.restaurantStore.foodStore.filterFoods &&
            store.restaurantStore.foodStore.filterFoods.map((food: any) => (
              <FoodCard
                id={food.id}
                photo={food.photo_main}
                title={food.title}
                description={food.description}
                availability={food.availability}
                price={food.price}
              />
            ))}
        </Grid>
      </Container>
    </Box>
  );
};
export default observer(Foods);
