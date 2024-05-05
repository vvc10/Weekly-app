import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// Loader component to display a loading spinner
export default function Loader() {
  return (
    <Box
      sx={{
        margin: 'auto', // Center the loader horizontally
        display: 'flex',
        justifyContent: 'center', // Align horizontally
        height: '100vh', // Set height to full viewport height
        width: '100%',
      }}
    >
      <CircularProgress /> {/* Circular loading spinner */}
    </Box>
  );
}
