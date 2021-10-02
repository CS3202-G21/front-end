import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useStore } from '../../hooks/useStore';
import { observer } from 'mobx-react-lite';
import { Container, Paper } from '@mui/material';
import HorizontalTileReservation from '../../components/HorizontalTileReservation';

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const Reservations = () => {
  const theme = useTheme();
  const store = useStore();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };
  React.useEffect(() => {
    async function getData() {
      await store.restaurantStore.getRestaurants();
      if (store.userStore.userClass === 0) {
        await store.restaurantStore.reserveStore.getReservations();
      } else if (store.userStore.userClass === 3) {
        await store.restaurantStore.reserveStore.getTodayReservations();
      }
    }
    getData();
  }, [store.restaurantStore.reserveStore.getTodayReservationData]);

  return (
    <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 }, textAlign: 'center' }}
      >
        <Box sx={{ bgcolor: 'background.paper', width: '100%', m: 'auto' }}>
          <AppBar position="static">
            {store.userStore.userClass === 3 && (
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="secondary"
                textColor="inherit"
                variant="fullWidth"
                aria-label="full width tabs example"
              >
                <Tab label="Today Reservations" {...a11yProps(0)} />
              </Tabs>
            )}
            {store.userStore.userClass === 0 && (
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="secondary"
                textColor="inherit"
                variant="fullWidth"
                aria-label="full width tabs example"
              >
                <Tab label="Current Reservations" {...a11yProps(0)} />
                <Tab label="Past Reservations" {...a11yProps(1)} />
                <Tab label="All Reservations" {...a11yProps(2)} />
              </Tabs>
            )}
          </AppBar>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              {store.userStore.userClass === 0
                ? store.restaurantStore.reserveStore.getReservationData &&
                  store.restaurantStore.restaurants &&
                  store.restaurantStore.reserveStore.getReservationData
                    .filter(
                      (reservation: any) =>
                        reservation.customer_arrival !== true
                    )
                    .map((reservation: any) => (
                      <HorizontalTileReservation data={reservation} />
                    ))
                : store.userStore.userClass === 3
                ? store.restaurantStore.reserveStore.getTodayReservationData &&
                  store.restaurantStore.restaurants &&
                  store.restaurantStore.reserveStore.getTodayReservationData.map(
                    (reservation: any) => (
                      <HorizontalTileReservation data={reservation} />
                    )
                  )
                : ''}
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              {store.restaurantStore.reserveStore.getReservationData &&
                store.restaurantStore.restaurants &&
                store.restaurantStore.reserveStore.getReservationData
                  .filter(
                    (reservation: any) => reservation.customer_arrival === true
                  )
                  .map((reservation: any) => (
                    <HorizontalTileReservation data={reservation} />
                  ))}
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
              {store.restaurantStore.reserveStore.getReservationData &&
                store.restaurantStore.restaurants &&
                store.restaurantStore.reserveStore.getReservationData.map(
                  (reservation: any) => (
                    <HorizontalTileReservation data={reservation} />
                  )
                )}
            </TabPanel>
          </SwipeableViews>
        </Box>
      </Paper>
    </Container>
  );
};
export default observer(Reservations);
