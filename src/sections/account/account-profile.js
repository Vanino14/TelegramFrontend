import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  TextField
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { AccountProfileDetails } from '../account/account-profile-details';

const user = {
  avatar: '/assets/avatars/avatar-anika-visser.png',
  city: 'Los Angeles',
  country: 'USA',
  jobTitle: 'Senior Developer',
  name: 'Anika Visser',
  timezone: 'GTM-7'
};export const AccountProfile = () => {
  const [formData, setFormData] = useState({
    newName: user.name,
    newCity: user.city,
    newCountry: user.country,
    newTimezone: user.timezone
  });

  const handleInputChange = (fieldName) => (event) => {
    setFormData({
      ...formData,
      [fieldName]: event.target.value
    });
  };

  const handleSubmit = () => {
    // Add your logic to handle form submission
    console.log('Form submitted:', formData);
    // You can send the data to a server or perform any other actions here
  };
return( 
   <Card>
  <CardContent>
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Avatar
        src={user.avatar}
        sx={{
          height: 80,
          mb: 2,
          width: 80
        }}
      />
      <Typography
        gutterBottom
        variant="h5"
      >
        {user.name}
      </Typography>
      <Typography
        color="text.secondary"
        variant="body2"
      >
        {user.city} {user.country}
      </Typography>
      <Typography
        color="text.secondary"
        variant="body2"
      >
        {user.timezone}
      </Typography>
    </Box>
  </CardContent>
  <Divider />
  <CardActions>
    <Button
      fullWidth
      variant="text"
    >
      Upload picture
    </Button>
  </CardActions>
</Card>
)};
