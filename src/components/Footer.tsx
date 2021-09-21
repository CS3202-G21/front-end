import React from 'react';
import Link from '@mui/material/Link';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

interface FooterProps {}
function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        Cloud Hotel
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
export const Footer: React.FC<FooterProps> = () => {
  return (
    <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
      <Typography variant="h6" align="center" gutterBottom>
        Cloud Hotel
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="text.secondary"
        component="p"
      >
        Restaurant Management System
      </Typography>
      <Copyright />
    </Box>
  );
};
