import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { useStore } from '../../hooks/useStore';

// review page of the payment gateway

export default function Review(props: any) {
  const { type, activeStep, handleBack, handleNext, steps } = props;
  const store = useStore();

  const onSubmitHandler = async (data: any) => {
    handleNext();
  };
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      {type === 'booking' ? (
        <List disablePadding>
          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText
              primary={store.hotelStore.bookStore.roomDetails.title}
              secondary={`Room Number: ${store.hotelStore.bookStore.roomDetails.roomNumber}`}
            />
            <Typography variant="body2">
              Dates: {store.hotelStore.bookStore.bookingData.start_date} -{' '}
              {store.hotelStore.bookStore.bookingData.end_date}
            </Typography>
          </ListItem>
          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText primary="Total" />
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {store.hotelStore.bookStore.bookingData.total_price}
            </Typography>
          </ListItem>
        </List>
      ) : (
        <List disablePadding>
          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText
              primary={store.restaurantStore.reserveStore.reserveData.meal_time}
              secondary={`Reserve Number: ${store.restaurantStore.reserveStore.reserveData.id}`}
            />
            <ListItemText
              primary={`Date:
              ${store.restaurantStore.reserveStore.reserveData.reserved_date}`}
              secondary={`Restaurant:
              ${store.restaurantStore.reserveStore.reserveData.restaurant}`}
            />
          </ListItem>
          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText primary="Total" />
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {store.restaurantStore.reserveStore.reserveData.num_of_people}
            </Typography>
          </ListItem>
        </List>
      )}

      <Box sx={{ display: 'flex', width: '100%' }}>
        {activeStep !== 0 && (
          <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
            Back
          </Button>
        )}
        <Button
          type="submit"
          variant="contained"
          onClick={onSubmitHandler}
          sx={{ mt: 3, ml: 1, marginLeft: 'auto' }}
        >
          {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
        </Button>
      </Box>
    </React.Fragment>
  );
}
