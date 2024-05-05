import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loader() {
  return (
    <Box
      sx={{
        margin: 'auto',
        display: 'flex',
        justifyContent: 'center', // Align horizontally
        height: '100vh', // Set height to full viewport height
        width: '100%',
      }}
    >
      <CircularProgress />
    </Box>
  );
}
