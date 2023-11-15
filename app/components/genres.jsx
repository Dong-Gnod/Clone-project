import { useState, useEffect } from 'react';

export default function Genres({id, title, posterImg, genreIds}){
  const [genres, setGenres] = useState([]);

  const options = {
    method: 'GET',
    headers: {
    accept: 'application/json',
    Authorization: process.env.NEXT_PUBLIC_MOVIE_API_KEY
    }
  };

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/genre/movie/list?language=ko', options)
    .then(response => response.json())
    .then((response) => {
      console.log(response);
      setGenres(response.genres);
      console.log('렌더링 g');
    })
    .catch(err => console.error(err));
    }, []);
  return(
    <>
      {genres
        .filter((genre) => genreIds.includes(genre))
        .map((genre) => {
          return(
          <div key={genre.id}>
            <h1>{genre.name}</h1>
            <h1>{title}</h1>
            <div className='w-72'>
              <img
                id={id}
                src={`https://image.tmdb.org/t/p/original/${posterImg}`} 
                alt="Image"
              />
            </div>
          </div>
          )
        })}
        
    </>
  );
}