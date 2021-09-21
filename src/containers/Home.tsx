import * as React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';

const cover = {
  title: 'Cloud Hotel',
  description: '#1 Hotel Management System Software',
  image: 'https://source.unsplash.com/collection/4977823',
  imageText: 'main image description',
  linkText: 'Continue reading…',
};

export default function Home() {
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
          backgroundImage: `url(${cover.image})`,
        }}
      >
        {/* Increase the priority of the hero background image */}
        {
          <img
            style={{ display: 'none' }}
            src={cover.image}
            alt={cover.imageText}
          />
        }
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
              <Link variant="subtitle1" href="/home" sx={{ color: 'white' }}>
                {cover.linkText}
              </Link>
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
              <Button variant="contained">Visit Hotel</Button>
              <Button variant="outlined">Visit Restaurant</Button>
            </Stack>
          </Container>
        </Box>
      </main>
    </React.Fragment>
  );
}
