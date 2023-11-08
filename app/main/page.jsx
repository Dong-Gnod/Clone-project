'use client'
import { useState, useEffect } from 'react';
import Movie from '../components/movie';
import Link from 'next/link';

export default function Main() {
  const [movies, setMovies] = useState([]);
  const [headerImage, setHeaderImage] = useState([]);

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
    setHeaderImage(response.results[Math.floor(Math.random() * response.results.length - 1)]);
    console.log('렌더링');
    })
    .catch(err => console.error(err));
    }, []);
    console.log(movies);

  return (
    <>
      {movies.map((movie) => {
        return(
          <Link key={movie.id} href={`detail/${movie.id}`}>
          <Movie
            key={movie.id}
            id={movie.id}
            posterImg={movie.poster_path}
            bigPoster={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
            title={movie.title}
          />
        </Link>
        )
      })}
    </>
  );
}