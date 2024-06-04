import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import BeerCard from './Card';
import Container from '@mui/material/Container';
import Navbar from './Navbar';
import './Home.css';
import { Typography } from '@mui/material';
import Loader from '../ui/Loader';
import BookShelf from './BookShelf';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [bookshelf, setBookshelf] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  // https://openlibrary.org/search.json?q=YOUR_QUERY&limit=10&page=1

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        let apiUrl = '';
        if (searchQuery.trim() === '') {
          apiUrl = `https://openlibrary.org/search.json?q=YOUR_QUERY&limit=10&page=1`;
        } else {
          apiUrl = `https://openlibrary.org/search.json?q=${searchQuery}&limit=10&page=${page}`;
        }
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBooks(data.docs);
        setTotalPages(Math.ceil(data.numFound / 10)); // Update to use numFound from the response
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();

    const storedBookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
    setBookshelf(storedBookshelf);
  }, [searchQuery, page]);

  const addToBookshelf = (book) => {
    if (!bookshelf.find((item) => item.key === book.key)) {
      const updatedBook = { ...book, added: true };
      setBookshelf([...bookshelf, updatedBook]);
      localStorage.setItem('bookshelf', JSON.stringify([...bookshelf, updatedBook]));
    }
  };

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div className='home'>
      <div className='home_navbar'>
        <Navbar onSearch={setSearchQuery} onAddToBookshelf={addToBookshelf} />
      </div>
    <Container>     
     <Modal open={openModal} onClose={toggleModal} sx={{ justifyItems: 'center' }}>
          <BookShelf bookshelf={bookshelf} onClose={toggleModal} />
        </Modal>
        </Container>
      <div className='home_cont_cards'>
    


        <Container>
          <Button sx={{backgroundColor:'#1976d2', color:'white'}} onClick={toggleModal}>My Bookshelf</Button>
          <Box
            sx={{
              display: loading ? 'block' : 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: 2,
              padding: 2,
              mt: 8,
              justifyContent: 'center',
            }}>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                <Loader />
                <Typography variant="h6" sx={{ ml: 2 }}>Loading...</Typography>
              </Box>
            ) : (
              <>
                {books.map((book) => (
                  <BeerCard key={book.key} beer={book} onAddToBookshelf={addToBookshelf} />
                ))}

              </>
            )}
          </Box>
        </Container>
        {/* <Container> <Box sx={{ textAlign: 'center', marginTop: '1rem' }}>
          <Typography>
            Page {page} of {totalPages}
          </Typography>
          <Button disabled={page === 1} onClick={handlePreviousPage}>Previous</Button>
          <Button disabled={page === totalPages} onClick={handleNextPage}>Next</Button>
        </Box>
        </Container> */}
      </div>
    </div>
  );
};

export default Home;
