// Home.js
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import BeerCard from './Card';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Navbar from './Navbar';
import './Home.css'
import { Typography } from '@mui/material';
import Loader from '../ui/Loader';

const Home = () => {
  const [beers, setBeers] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetch('https://api.sampleapis.com/beers/ale')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setBeers(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const filteredBeers = beers.filter((beer) =>
    beer.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  return (
    <div className='home'>
    <div className='home_navbar'>
      <Navbar onSearch={setSearchQuery} />
    </div>
      <div className='home_cont_cards'>
      <Container>
      <Box 
  sx={{ 
    display: loading ? 'block' : 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
    gap: 2,
    padding: 2,
    mt: 8,  // To offset the AppBar
    justifyContent: 'center',
  }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
            <Loader />
            <Typography variant="h6" sx={{ ml: 2 }}>Loading...</Typography>
          </Box>
        ) : (
          filteredBeers.map((beer) => (
            <BeerCard key={beer.id} beer={beer} />
          ))
        )}
      </Box> 
      </Container>
     

      </div>
    </div>
  );
};

export default Home;
