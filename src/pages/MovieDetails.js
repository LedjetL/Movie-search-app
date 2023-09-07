import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import { apiKey, apiUrl } from '../env';

function MovieDetail() {
  const { imdbID } = useParams(); 

  const [movieData, setMovieData] = useState(null);

  useEffect(() => {
    
    fetch(`${apiUrl}?apiKey=${apiKey}&i=${imdbID}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setMovieData(data);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, [imdbID]); 

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex">
      {}
      <div className="relative">
        <img
          src={movieData?.Poster || '/placeholder-image.jpg'}
          alt={`${movieData?.Title} Poster`}
          className="w-full h-auto"
        />
        <div className="absolute inset-0  opacity-50  transition-opacity"></div>
      </div>

      {}
      <div className="p-6">
        <h1 className="text-3xl font-semibold text-gray-800">{movieData?.Title}</h1>
        <p className="text-lg text-gray-600">Year: {movieData?.Year}</p>
        <p className="text-lg text-gray-600">Director: {movieData?.Director}</p>
        <p className="text-lg text-gray-600">Actors: {movieData?.Actors}</p>
        <p className="text-lg text-gray-600">Genre: {movieData?.Genre}</p>
        <p className="text-lg text-gray-600">Plot: {movieData?.Plot}</p>
        <p className="text-lg text-gray-600">IMDb Rating: {movieData?.imdbRating}</p>
        <p className="text-lg text-gray-600">IMDb Votes: {movieData?.imdbVotes}</p>
        {}
      </div>
    </div>
  );
}

export default MovieDetail;
