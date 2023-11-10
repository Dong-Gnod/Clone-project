'use client'
import { useState, useEffect } from 'react';
import Movie from '../components/movie';
import Link from 'next/link';
import Header from './../components/header';
import { Nav } from './../components/nav';

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
    <div>
      <Nav />
      <div className='top-0'>
        <Header
          id={headerImage.id}
          title={headerImage.title}
          headerImage={headerImage.backdrop_path}
        />
      </div>
      <div className='flex justify-between'>
      {movies.map((movie) => {
        return(
          <div>
            <Link key={movie.id} href={`detail/${movie.id}`} className='w-72 m-1 flex justify-between'>
              <Movie
                key={movie.id}
                id={movie.id}
                posterImg={movie.poster_path}
                title={movie.title}
              />
            </Link>
          </div>

        )
      })}
    </div>
    </div>
  );
}