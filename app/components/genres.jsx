import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Genres({movies}){
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
      setGenres(response.genres);
    })
    .catch(err => console.error(err));
    }, []);
    console.log(genres);
  return(
    <div className='font-RobotoMono'>
      {genres.map((genre) => {
          return(
          <div key={genre.id}>
            <h1>{genre.name}</h1>
            <div className='flex'>
            {movies
              .filter((movie) => {
                return movie.genre_ids.includes(genre.id);
              })
              .map((movie) => {
                return(
                  <Link href={`detail/${movie.id}`} key={movie.id}>
                    <h1>{movie.title}</h1>
                    <div className='w-72 ml-2.5 mb-7'>
                      <img
                        id={movie.id}
                        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} 
                        alt="Image"
                      />
                    </div>
                  </Link>

                )
              })}
            </div>
          </div>
          )
        })}
        
    </div>
  );
}