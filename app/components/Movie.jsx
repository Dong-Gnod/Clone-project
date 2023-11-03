'use client'
import { useState, useEffect } from 'react';
import Rank1 from './imgs/1.png';
import Rank2 from './imgs/2.png';
import Rank3 from './imgs/3.png';
import Rank4 from './imgs/4.png';
import Rank5 from './imgs/5.png';
import Rank6 from './imgs/6.png';
import Rank7 from './imgs/7.png';
import Rank8 from './imgs/8.png';
import Rank9 from './imgs/9.png';
import Rank10 from './imgs/10.png';


export const Movie = () => {
  const [movies, setMovies] = useState([]);
  const [headerImage, setHeaderImage] = useState({});
  
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
      console.log(movies);
      console.log(headerImage);
    })
    .catch(err => console.error(err));
  }, []);
  return (
    <div className='absolute top-0'>
      <div className='h-2/5'>
        <img 
          src={`https://image.tmdb.org/t/p/original/${headerImage.backdrop_path}`} 
          alt="headerImage"
          className='w-full'
        />
      </div>
      {/* content */}
      {/* 인기 콘텐츠 */}
      <h1>넷플릭스 인기 콘텐츠</h1>
      <div className='flex w-full h-40 overflow-hidden'>
        {movies.map((movie, index) => {
          return (
            <>
              <img 
                key={index} 
                src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} 
                alt='poster'
                className='w-72 m-1'
              />
            </>
            )
        })}
      </div>
      {/* TOP 10 */}
      <div className='flex'>
        {movies.map((movie, index) => {
          return (
            <>
              <img 
                key={index} 
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} 
                alt='poster'
                className='w-36 h-52 m-1'
              />
            </>
          )
        })}
      </div>
    </div>
  )
}
