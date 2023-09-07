import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import { UserContext } from '../App';

function MovieCard({movieData, favorite=false}) {
  const {favoriteList, setFavoriteList} = React.useContext(UserContext);

  const navigate = useNavigate()
  const [favoriteButton , setFavoriteButton] = React.useState(favorite)
  const handleFavCollection = ()=>{
    setFavoriteButton(!favoriteButton)
    if(favoriteButton){
      setFavoriteList(prevState=>{
        const dataHolder = prevState.filter(el=>el.imdbID !== movieData.imdbID)
        return dataHolder
      })
    }else{
      setFavoriteList(prevState => [...prevState,{imdbID: movieData.imdbID, Title : movieData.Title, Poster : movieData.Poster, Year:movieData.Year}])
    }
  }

  return (
    <Card sx={{ maxWidth: 345}} key={movieData.imdbID}>
      <img
        src={movieData?.Poster}
        className="max-h-80 w-full bg-cover object-contain bg-center"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {movieData?.Title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {movieData.Plot}
        </Typography>
        <Typography sx={{marginTop: "10px"}} variant="body2" color="text.primary">
          {movieData.Year}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={e=> navigate(`/movieDetails/${movieData?.imdbID}`)}>Learn More</Button>
        <IconButton aria-label="add to favorites" onClick={handleFavCollection}>
          <FavoriteIcon style={{color: favoriteButton ? "red" : ""}}/>
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default MovieCard