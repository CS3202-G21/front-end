import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Chip, Divider, Paper, Stack } from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PersonIcon from '@mui/icons-material/Person';
import KingBedIcon from '@mui/icons-material/KingBed';

export default function HorizontalCard(props: any) {
  const theme = useTheme();
  const { roomData } = props;
  return (
    <Card sx={{ display: 'flex' }} elevation={10}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography gutterBottom variant="h5" component="h5" fontWeight="800">
            {roomData.title}{' '}
            <Typography color="primary.main">{`Room Number: ${roomData.roomNumber}`}</Typography>
          </Typography>
          <Divider sx={{ margin: '20px' }} />
          <Typography sx={{ textAlign: 'justify' }}>
            {roomData.description}
          </Typography>
          <Stack direction="row">
            <Chip
              icon={<MonetizationOnIcon />}
              label={`Price: ${roomData.price} LKR`}
              variant="outlined"
              color="primary"
              sx={{ margin: '10px' }}
            />
            <Chip
              icon={<PersonIcon />}
              label={`Adults: ${roomData.number_of_adults}`}
              variant="outlined"
              color="primary"
              sx={{ margin: '10px' }}
            />
            <Chip
              icon={<KingBedIcon />}
              label={`Beds: ${roomData.number_of_beds}`}
              variant="outlined"
              color="primary"
              sx={{ margin: '10px' }}
            />
          </Stack>
        </CardContent>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 300 }}
        image={roomData.photo_main}
        alt="Live from space album cover"
      />
    </Card>
  );
}
