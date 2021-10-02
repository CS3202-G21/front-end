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
import HorizontalTile from '../../components/HorizontalTile';

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

const Booking = () => {
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
      await store.hotelStore.roomStore.getRooms();
      if (store.userStore.userClass === 0) {
        await store.hotelStore.bookStore.getBookings();
      } else if (store.userStore.userClass === 2) {
        await store.hotelStore.bookStore.getTodayBookings();
      }
    }
    getData();
  }, []);

  return (
    <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 }, textAlign: 'center' }}
      >
        <Box sx={{ bgcolor: 'background.paper', width: '100%', m: 'auto' }}>
          <AppBar position="static">
            {store.userStore.userClass === 2 && (
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="secondary"
                textColor="inherit"
                variant="fullWidth"
                aria-label="full width tabs example"
              >
                <Tab label="Today Bookings" {...a11yProps(0)} />
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
                <Tab label="Current Bookings" {...a11yProps(0)} />
                <Tab label="Past Bookings" {...a11yProps(1)} />
                <Tab label="All Bookings" {...a11yProps(2)} />
              </Tabs>
            )}
          </AppBar>

          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            {store.userStore.userClass === 0 ? (
              <TabPanel value={value} index={0} dir={theme.direction}>
                {store.hotelStore.bookStore.getBookingData &&
                  store.hotelStore.roomStore.rooms &&
                  store.hotelStore.bookStore.getBookingData
                    .filter((booking: any) => booking.checkIn !== true)
                    .map((booking: any) => <HorizontalTile data={booking} />)}
              </TabPanel>
            ) : store.userStore.userClass === 2 ? (
              <TabPanel value={value} index={0} dir={theme.direction}>
                {store.hotelStore.bookStore.getTodayBookingData &&
                  store.hotelStore.roomStore.rooms &&
                  store.hotelStore.bookStore.getTodayBookingData.map(
                    (reservation: any) => <HorizontalTile data={reservation} />
                  )}
              </TabPanel>
            ) : (
              <div />
            )}
            <TabPanel value={value} index={1} dir={theme.direction}>
              {store.hotelStore.bookStore.getBookingData &&
                store.hotelStore.roomStore.rooms &&
                store.hotelStore.bookStore.getBookingData
                  .filter((booking: any) => booking.checked_out === true)
                  .map((booking: any) => <HorizontalTile data={booking} />)}
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
              {store.hotelStore.bookStore.getBookingData &&
                store.hotelStore.roomStore.rooms &&
                store.hotelStore.bookStore.getBookingData.map(
                  (booking: any) => <HorizontalTile data={booking} />
                )}
            </TabPanel>
          </SwipeableViews>
        </Box>
      </Paper>
    </Container>
  );
};
export default observer(Booking);
