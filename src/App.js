import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import { createContext, useState } from 'react';
import FavoriteCollections from './pages/FavoriteCollections';
export const UserContext = createContext(null);
  
function App() {
  const [favoriteList, setFavoriteList] = useState([])
  return (
    <BrowserRouter>
      <UserContext.Provider value={{favoriteList, setFavoriteList}}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movieDetails/:imdbID" element={<MovieDetails />} />
          <Route path="/favoriteCollection" element={<FavoriteCollections />} />
          <Route path="*" element={<p>Error Wrong Page</p>} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
