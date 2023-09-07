import React,{useContext} from 'react'
import { UserContext } from '../App';
import MovieCard from '../components/MovieCard';
function FavoriteCollections() {
    const {favoriteList} = React.useContext(UserContext);
  return (
    <div className='mt-10 grid grid-cols-4 gap-4'>
        {favoriteList.map(item=>(
            <MovieCard movieData={item} favorite={true}/>
        ))}
    </div>
  )
}

export default FavoriteCollections