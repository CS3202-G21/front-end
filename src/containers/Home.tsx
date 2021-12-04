import * as React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { useHistory } from 'react-router';
import { useStore } from '../hooks/useStore';

const cover = {
  title: 'Cloud Hotel',
  description: '#1 Hotel & Restaurant Management Application',
  image1: 'https://source.unsplash.com/MXbM1NrRqtI/1600x900',
  image2: 'https://source.unsplash.com/szCvt1gP2d4/1600x900',
  imageText: 'main image description',
  linkText: 'Continue reading…',
};

//Landing Page for the customer, receptionist, and waiter

export default function Home() {
  const history = useHistory();
  const store = useStore();
  return (
    <React.Fragment>
      <Paper
        sx={{
          position: 'relative',
          backgroundColor: 'grey.800',
          color: '#fff',
          mb: 4,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: `url(${
            store.userStore.userClass === 0 ? cover.image1 : cover.image2
          })`,
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
          <Grid item md={6}>
            <Box
              sx={{
                margin: '100px ',
                position: 'relative',
                p: { xs: 3, md: 6 },
                pr: { md: 0 },
              }}
            >
              <Typography
                component="h1"
                variant="h1"
                color="inherit"
                gutterBottom
              >
                {cover.title}
              </Typography>
              <Typography variant="h3" color="inherit" paragraph>
                {cover.description}
              </Typography>
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
          <Container maxWidth="sm">
            <Typography
              component="h2"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              What we provide as
            </Typography>
            <Typography
              component="h1"
              variant="h1"
              align="center"
              color="primary"
              gutterBottom
            >
              Cloud Hotel
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Cloud Hotel offers ultimate comfort and luxury. This 4-storied
              hotel is a beautiful combination of traditional grandeur and
              modern facilities. The 255 exclusive guest rooms are furnished
              with a range of modern amenities such as television and internet
              access
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button
                variant="contained"
                onClick={() => history.push('/rooms')}
              >
                Visit Hotel
              </Button>
              <Button variant="outlined" onClick={() => history.push('/foods')}>
                Visit Restaurant
              </Button>
            </Stack>
          </Container>
        </Box>
      </main>
    </React.Fragment>
  );
}
