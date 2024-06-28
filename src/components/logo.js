import React from 'react';
import { useTheme } from '@mui/material/styles';

export const Logo = () => {
  const theme = useTheme();

  // Assuming you want to use the theme color for the image border
  const borderColor = theme.palette.primary.main;

  return (
    <img
      src='/assets/logo.png'
      style={{ width: 70, borderRadius: '50%' }}
      alt="Logo"
    />
  );
};
