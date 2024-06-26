import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import TextField from '@mui/material/TextField';
 
export default function Navbar({ onSearch }) {
  
    const handleSearchChange = (event) => {
        const value = event.target.value;
        if (value.trim() !== '') {
          onSearch(value);
        } else {
          onSearch('');
        }
      };
  
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" sx={{ backgroundColor: '#f4f4f4', borderBottom:'.5px solid hsl(0deg 0% 89.92% / 85%)' }} elevation={0}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ fontSize: '16px', flexGrow: 1, textAlign: 'left' }}>
                        Bookish
                    </Typography>
                    <TextField
                        variant="outlined"
                        size="small"
                        placeholder="Search..."
                        onChange={handleSearchChange}
                        sx={{ backgroundColor: 'white', borderRadius: 1, mr: 2 }}
                    />
                    <Button color="inherit" >Login</Button> {/* Button to open the modal */}
                </Toolbar>
            </AppBar>
           
        </Box>
    );
}
