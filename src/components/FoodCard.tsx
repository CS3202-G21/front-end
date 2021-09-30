import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import CheckIcon from '@mui/icons-material/Check';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

export default function FoodCard(props: any) {
  const { id, photo, title, description, availability, price } = props;
  return (
    <Grid item key={id} xs={12} sm={6} md={4}>
      <Card
        elevation={5}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          marginTop: '50px',
        }}
      >
        <CardMedia component="img" image={photo} height="200px" alt="random" />
        <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Divider sx={{ margin: '20px' }} />
          <Typography sx={{ textAlign: 'justify' }}>{description}</Typography>
          <Chip
            icon={<MonetizationOnIcon />}
            label={`Price: ${price} LKR`}
            variant="outlined"
            color="secondary"
            sx={{ margin: '20px 10px' }}
          />
          <Chip
            icon={availability ? <CheckIcon /> : <ErrorOutlineIcon />}
            label={availability ? 'Available Now' : 'Not Available'}
            color={availability ? 'primary' : 'error'}
          />
        </CardContent>
      </Card>
    </Grid>
  );
}
