import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Login from './containers/Login';
import { Rating } from './containers/Rating';
import Home from './containers/Home';
import Header from './components/Header';
import Register from './containers/Register';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { styled } from '@mui/material/styles';
import { Footer } from './components/Footer';
import Offers from './containers/Restaurant/Offers';
import { Booking } from './containers/Hotel/Booking';
import { BookNow } from './containers/Hotel/BookNow';
import Rooms from './containers/Hotel/Rooms';
import { Foods } from './containers/Restaurant/Foods';
import { Reservations } from './containers/Restaurant/Reservations';
import { ReserveNow } from './containers/Restaurant/ReserveNow';
import Checkout from './components/Checkout/Checkout';

const drawerWidth = 300;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const App = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Header open={open} setOpen={setOpen} DrawerHeader={DrawerHeader} />
        <Main open={open}>
          <DrawerHeader />
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <React.Fragment>
              <PrivateRoute exact path="/" component={Home} />
              <PrivateRoute path="/offers" component={Offers} />
              <PrivateRoute path="/bookings" component={Booking} />
              <PrivateRoute exact path="/reserve" component={ReserveNow} />
              <PrivateRoute
                exact
                path="/reservations"
                component={Reservations}
              />
              <PrivateRoute exact path="/book" component={BookNow} />
              <PrivateRoute exact path="/rooms" component={Rooms} />
              <PrivateRoute exact path="/foods" component={Foods} />
              <PrivateRoute exact path="/checkout" component={Checkout} />
              <PrivateRoute exact path="/rating" component={Rating} />
              <Footer />
            </React.Fragment>
          </Switch>
        </Main>
      </Box>
    </React.Fragment>
  );
};

export default App;
