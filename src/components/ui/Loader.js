import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// Loader component to display a loading spinner
export default function Loader() {
  return (
    <Box
      sx={{
      //  
      }}
    >
      <CircularProgress /> {/* Circular loading spinner */}
    </Box>
  );
}
