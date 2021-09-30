import * as React from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { useStore } from '../hooks/useStore';
import { Avatar, Card, CardContent, CardMedia, Chip } from '@mui/material';
import { observer } from 'mobx-react-lite';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import FaceIcon from '@mui/icons-material/Face';
import BedroomChildIcon from '@mui/icons-material/BedroomChild';
import FastfoodIcon from '@mui/icons-material/Fastfood';

const Profile = () => {
  const store = useStore();

  return (
    <React.Fragment>
      <Paper
        sx={{
          height: '300px',
          position: 'relative',
          backgroundColor: 'grey.800',
          color: '#fff',
          mb: 4,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: `url('https://source.unsplash.com/rlwE8f8anOc/1600x900')`,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,.6)',
          }}
        />
        <Grid container>
          <Grid item>
            <Box
              sx={{
                margin: 'auto',
                position: 'absolute',
                top: 200,
                left: '50%',
                transform: 'translateX(-50%)',
              }}
            >
              <Avatar
                sx={{ width: 200, height: 200 }}
                src="https://source.unsplash.com/C8Ta0gwPbQg/200x200"
              />
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="md">
            <Typography
              component="h4"
              variant="h4"
              align="center"
              color="primary"
              fontWeight="800"
              gutterBottom
              sx={{ margin: '50px' }}
            >
              {store.userStore.currentUser?.username}
            </Typography>
            <List component="nav" aria-label="mailbox folders">
              <ListItem button>
                <ListItemText
                  primaryTypographyProps={{ color: 'primary', variant: 'h5' }}
                  primary={store.userStore.currentUser?.id}
                  secondary="Your ID"
                />
              </ListItem>
              <Divider />
              <ListItem button>
                <ListItemText
                  primaryTypographyProps={{ color: 'primary', variant: 'h5' }}
                  primary={store.userStore.currentUser?.first_name}
                  secondary="First Name"
                />
              </ListItem>
              <Divider />
              <ListItem button divider>
                <ListItemText
                  primaryTypographyProps={{ color: 'primary', variant: 'h5' }}
                  primary={store.userStore.currentUser?.last_name}
                  secondary="Last Name"
                />
              </ListItem>
              <Divider />
              <ListItem button>
                <ListItemText
                  primaryTypographyProps={{ color: 'primary', variant: 'h5' }}
                  primary={store.userStore.currentUser?.email}
                  secondary="Email"
                />
              </ListItem>
            </List>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={4}
              justifyContent="center"
            >
              <Card elevation={5}>
                <CardMedia
                  component="img"
                  height="200"
                  image="https://source.unsplash.com/rlwE8f8anOc/1600x900"
                  alt="Restaurant"
                />
                <CardContent sx={{ p: '50px 20px' }}>
                  <Typography
                    component="h5"
                    variant="h5"
                    align="center"
                    color="primary"
                    gutterBottom
                  >
                    Rooms & Reservations
                  </Typography>
                  <Divider />
                  <Stack direction="row">
                    <Typography
                      component="h6"
                      variant="h6"
                      align="center"
                      gutterBottom
                      sx={{ margin: '20px' }}
                    >
                      Total rooms booked:
                    </Typography>
                    <Typography
                      component="h6"
                      variant="h6"
                      align="center"
                      color="secondary"
                      gutterBottom
                      sx={{ margin: '20px' }}
                    >
                      5
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={4}>
                    <Chip
                      color="primary"
                      icon={<FaceIcon />}
                      label="Happy Customer"
                    />
                    <Chip
                      color="primary"
                      icon={<BedroomChildIcon />}
                      label="Bedrooms"
                    />
                  </Stack>
                </CardContent>
              </Card>
              <Card elevation={5}>
                <CardMedia
                  component="img"
                  height="200"
                  image="https://source.unsplash.com/ykThMylLsbY/1600x900"
                  alt="Meals"
                />
                <CardContent sx={{ p: '50px 20px' }}>
                  <Typography
                    component="h5"
                    variant="h5"
                    align="center"
                    color="primary"
                    gutterBottom
                  >
                    Orders
                  </Typography>
                  <Divider />
                  <Stack direction="row">
                    <Typography
                      component="h6"
                      variant="h6"
                      align="center"
                      gutterBottom
                      sx={{ margin: '20px' }}
                    >
                      Total Orders Placed:
                    </Typography>
                    <Typography
                      component="h6"
                      variant="h6"
                      align="center"
                      color="secondary"
                      gutterBottom
                      sx={{ margin: '20px' }}
                    >
                      5
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={4}>
                    <Chip
                      color="primary"
                      icon={<FaceIcon />}
                      label="Happy Customer"
                    />
                    <Chip
                      color="primary"
                      icon={<FastfoodIcon />}
                      label="Happy Meal"
                    />
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Container>
        </Box>
      </main>
    </React.Fragment>
  );
};
export default observer(Profile);
