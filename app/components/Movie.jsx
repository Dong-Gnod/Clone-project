'use client'
import { useState, useEffect } from 'react';

export const Movie = () => {
  const [movies, setMovies] = useState([]);
  
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: process.env.NEXT_PUBLIC_API_KEY
    }
  };
  
  useEffect(() => {
    fetch('https://api.themoviedb.org/4/account/6540ac1f4557a0013ac0020d/movie/recommendations?page=1&language=ko-ko', options)
    .then(response => response.json())
    .then((response) => {
      setMovies(response.results);
    })
    .catch(err => console.error(err));
  }, []);

  console.log(movies);

  return (
    <>
      {/* header */}
      <div>
        {/* 여기부터 */}
      </div>
      {/* content */}
      {/* TOP 10 */}
      <div className='flex'>
        {movies.map((movie, index) => {
          return (
            <>
              <img 
                key={index} 
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} 
                alt='poster'
                className='w-36 h-52'
              />
            </>
          )
        })}
      </div>

      {/* 인기 콘텐츠 */}
      <div className='flex'>
        {movies.map((movie, index) => {
            return (
              <>
                <img 
                  key={index} 
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} 
                  alt='poster'
                  className='w-72 h-40'
                />
              </>
            )
        })}
      </div>
    </>
  )
}
