import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
        flexGrow: 1, // Ensure it pushes to the bottom
        backgroundColor: '#f4f4f4',
        position: 'absolute',
        bottom: 0,
        width: '100%',
      }}
    >
      <Typography variant="body2" color="textSecondary">
        © {new Date().getFullYear()} PT XYZ - Achmad Fathoni
      </Typography>
    </Box>
  );
};

export default Footer;
