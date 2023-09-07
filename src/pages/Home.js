import { Button, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { apiKey, apiUrl } from '../env';
import MovieCard from '../components/MovieCard';

function Home() {
  const [movieData, setMovieData] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); 
  const [yearFilter, setYearFilter] = useState(''); 
  const [currentPage, setCurrentPage] = useState(1);
  const fetchMovies = (query, year, page) => {
    
    let apiUrlWithParams = `${apiUrl}?apiKey=${apiKey}&s=${query}&y=${year}&page=${page}`;

    fetch(apiUrlWithParams)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data.Response === 'False') {
          setMovieData([]);
        } else {
          setMovieData(data.Search || []); 
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMovies(searchQuery, yearFilter, currentPage);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(()=>{
    fetchMovies(searchQuery, yearFilter, currentPage);
  },[currentPage])

  return (
    <>
      <form onSubmit={handleSearch} className='center'>
        <TextField
          label='Movie'
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
        />
        <TextField
          label='Year'
          onChange={(e) => setYearFilter(e.target.value)}
          value={yearFilter}
        />
        <Button variant='contained' type='submit'>
          Search
        </Button>
      </form>
      <div className='mt-10 grid grid-cols-4 gap-4'>
        {movieData.length > 0 &&
          movieData.map((movie, index) => (
            <MovieCard key={index} movieData={movie} />
          ))}
      </div>
      {movieData.length === 0 && <p>No movies found</p>}
      <div className='pagination'>
        <Button
          variant='outlined'
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className='page-number'>{currentPage}</span>
        <Button
          variant='outlined'
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </>
  );
}

export default Home;
