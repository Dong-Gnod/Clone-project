'use client'
import { useState, useEffect } from 'react';
import Movie from '../components/movie';
import Link from 'next/link';
import Header from './../components/header';
import Nav from '../components/nav';
import Genres from '../components/genres';
import TopTen from '../components/topTen';

export default function Main() {
  const [movies, setMovies] = useState([]);
  const [headerImage, setHeaderImage] = useState([]);

  const options = {
    method: 'GET',
    headers: {
    accept: 'application/json',
    Authorization: process.env.NEXT_PUBLIC_MOVIE_API_KEY
    }
  };

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/discover/movie?certification_country=asia%2Cus&include_adult=false&include_video=true&language=ko-KO&page=2&region=asia%2Cus&sort_by=popularity.desc', options)
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
    <div className='w-full h-full'>
      <Nav />
      <div className='w-full'>
        <Link key={headerImage.id} href={`detail/${headerImage.id}`}>
          <Header
            key={headerImage.id}
            id={headerImage.id}
            title={headerImage.title}
            headerImage={headerImage.backdrop_path}
          />
          <div className='text-black z-[100] absolute top-[65%] left-[25%] w-1/2 bg-gray-400/50 p-3 rounded-md mx-auto text-center'>
            <p className='font-extrabold text-xl mb-2.5 border-b-solid border-b-white border-b-2 pb-0.5 w-80 mx-auto'>{headerImage.title}</p>
            <p className='font-semibold'>{headerImage.overview ? headerImage.overview : '설명이 없습니다.'}</p>
          </div>
        </Link>
      </div>

      <div className='z-50 relative translate-y-[-15%] h-screen'>
        <div className='mb-5'>
          <h1>지금 뜨는 콘텐츠</h1>
          <div className='flex justify-between relative'>
            {movies.map((movie) => {
              return(
                <div key={movie.id} className='mb-2.5 ml-2.5'>
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
            }).sort((a, b) => b.vote_average - a.vote_average)}
          </div>
        </div>

        <div className='mb-5'>
          <h1 className='ml-2.5'>인기 콘텐츠</h1>
          <div className='flex justify-between relative'>
            {movies.map((movie) => {
              return(
                <div key={movie.id} className='ml-2.5'>
                  <Link key={movie.id} href={`detail/${movie.id}`}>
                    <TopTen
                      key={movie.id}
                      id={movie.id}
                      posterImg={movie.poster_path}
                      title={movie.title}
                    />
                  </Link>
                </div>
              )
            }).sort((a, b) => b.popularity - a.vote_average).slice(0, 10)}
          </div>
        </div>
        
        <div className='mt-5 mb-5'>
          <h1>장르별</h1>
          <div className='flex justify-between'>
            {movies.map((movie) => {
              return (
                <div key={movie.id} className='ml-2.5'>
                  <Link key={movie.id} href={`detail/${movie.id}`}>
                    <Genres
                      key={movie.id}
                      id={movie.id}
                      posterImg={movie.backdrop_path}
                      title={movie.title}
                      genreIds={movie.genre_ids}
                    />  
                  </Link>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </div>
  );
}