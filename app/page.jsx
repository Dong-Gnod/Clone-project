'use client'
import { useEffect, useState } from 'react';
import { Nav } from './components/Nav';

      {/* 만들어야 할 것
      1.nav
      2.header
      3.main -> slide */}

export default function Home() {
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
      console.log(response)
      setMovies(response.results);
    })
    .catch(err => console.error(err));
  console.log(movies)
  }, [])
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-0">
      {/* navigation */}
      <Nav />
      {/* header */}
      {movies.map((movie, index) => {
        return (
          <>
            <h1 key={index}>123</h1>
            <h1>{movie.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="poster" />
          </>
        
          )
        })}
      {/* contents */}
    </main>
  )
}
