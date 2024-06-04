import React from 'react';
import { Box, IconButton } from '@mui/material';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import default_img from '../../assets/images/image.png';
import Button from '@mui/material/Button';
import AspectRatio from '@mui/joy/AspectRatio';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

const BookShelf = ({ bookshelf, onClose }) => {
  const handleImageError = (event) => {
    event.target.src = default_img;
  };

  return (
    <Box
      sx={{
        backgroundColor: '#f4f4f4',
        padding: '20px',
        borderRadius: '8px',
        border: '1px solid #ddd',
        minHeight: '80vh',
        margin: 'auto',
        overflow: 'auto', // Set overflow to auto
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
        <IconButton onClick={onClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </Box>
      <Typography variant="h4" sx={{ marginBottom: '15px', textAlign: 'center' }}>Bookshelf</Typography>

      {bookshelf && bookshelf.length > 0 ? (
        <Grid container spacing={2} justifyContent="center">
          {bookshelf.map((book, index) => (
            <Grid item key={index}>
              <Card orientation="vertical" variant="outlined" sx={{ width: '200px' }}>
                <CardOverflow>
                  <AspectRatio ratio="1" sx={{ width: 90 }}>
                    <img
                      src={book.image || default_img}
                      alt={book.title}
                      loading="lazy"
                      onError={handleImageError}
                    />
                  </AspectRatio>
                </CardOverflow>

                <CardContent justifyContent="flex-start" textAlign="left" alignItems="left">
                  <Typography fontWeight="700" textColor="success.plainColor">
                    {book.title}</Typography>
                  <Typography level="body-sm">Edition  &nbsp;
                    <b>{book.edition_count}</b></Typography>
                  <Typography level="body-sm">Author: {book.author_name ? book.author_name.join(', ') : 'Unknown'}</Typography>
                  <Typography level="body-sm">Published on {book.first_publish_year}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" align="center">No books in the shelf</Typography>
      )}
    </Box>
  );
};

export default BookShelf;
