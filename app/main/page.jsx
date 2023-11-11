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
    fetch('https://api.themoviedb.org/4/account/6540ac1f4557a0013ac0020d/movie/recommendations?page=1&language=ko-KO', options)
    .then(response => response.json())
    .then((response) => {
    setMovies(response.results);
    setHeaderImage(response.results[Math.floor(Math.random() * response.results.length - 1)]);
    console.log('렌더링');
    })
    .catch(err => console.error(err));
    }, []);
    console.log(movies);

  useEffect(()=> {
    fetch('https://api.themoviedb.org/3/genre/movie/list?language=ko', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
  });

  return (
    <div className='w-full'>
      <Nav />
      <div className='w-full'>
        <Link key={headerImage.id} href={`detail/${headerImage.id}`}>
          <Header
            key={headerImage.id}
            id={headerImage.id}
            title={headerImage.title}
            headerImage={headerImage.backdrop_path}
          />
        </Link>
      </div>
      <div>
          <h1>인기 콘텐츠</h1>
          <div className='flex justify-between relative w-full mb-2.5'>
            {movies.map((movie) => {
              return(
                <div key={movie.id}>
                  <Link key={movie.id} href={`detail/${movie.id}`}>
                    <Movie
                      key={movie.id}
                      id={movie.id}
                      posterImg={movie.backdrop_path}
                      title={movie.title}
                    />
                  </Link>
                </div>
              )
            }).sort((a, b) => b.popularity - a.popularity).slice(0, 10)}
          </div>
          <div>
          <h1>지금 뜨는 콘텐츠</h1>
          <div className='flex justify-between relative'>
            {movies.map((movie) => {
              return(
                <div key={movie.id}>
                  <Link key={movie.id} href={`detail/${movie.id}`}>
                    <Movie
                      key={movie.id}
                      id={movie.id}
                      posterImg={movie.poster_path}
                      title={movie.title}
                    />
                  </Link>
                </div>
              )
            }).sort((a, b) => b.vote_average - a.vote_average)}
          </div>
        </div>
      </div>
    </div>
  );
}