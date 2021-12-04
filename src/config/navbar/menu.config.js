import HomeIcon from '@mui/icons-material/Home';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import HotelIcon from '@mui/icons-material/Hotel';
import StarIcon from '@mui/icons-material/Star';

// side bar routes according to the user type

export const menu_config = [
  { name: 'Home', to: '/', icon: <HomeIcon /> },
  {
    name: 'Restaurant',
    icon: <RestaurantMenuIcon />,
    sub: [
      { name: 'Food & Beverages', to: '/foods' },
      { name: 'Special offers', to: '/offers' },
      { name: 'Reserve Table', to: '/reserve' },
      { name: 'Reservations', to: '/reservations' },
    ],
  },
  {
    name: 'Hotel',
    icon: <HotelIcon />,
    sub: [
      { name: 'Rooms', to: '/rooms' },
      { name: 'Book Now', to: '/book-now' },
      { name: 'Bookings', to: '/bookings' },
    ],
  },
  { name: 'Ratings & Reviews', to: '/rating', icon: <StarIcon /> },
];

export const waiter_menu_config = [
  { name: 'Home', to: '/', icon: <HomeIcon /> },
  {
    name: 'Restaurant',
    icon: <RestaurantMenuIcon />,
    sub: [
      { name: 'Food & Beverages', to: '/foods' },
      { name: 'Special offers', to: '/offers' },
      { name: 'Reservations', to: '/reservations' },
    ],
  },
  {
    name: 'Hotel',
    icon: <HotelIcon />,
    sub: [{ name: 'Rooms', to: '/rooms' }],
  },
];
export const receptionist_menu_config = [
  { name: 'Home', to: '/', icon: <HomeIcon /> },
  {
    name: 'Restaurant',
    icon: <RestaurantMenuIcon />,
    sub: [
      { name: 'Food & Beverages', to: '/foods' },
      { name: 'Special offers', to: '/offers' },
    ],
  },
  {
    name: 'Hotel',
    icon: <HotelIcon />,
    sub: [
      { name: 'Rooms', to: '/rooms' },
      { name: 'Book Now', to: '/book-now' },
      { name: 'Bookings', to: '/bookings' },
    ],
  },
];

export default menu_config;
