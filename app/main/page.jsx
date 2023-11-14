'use client'
import { useState, useEffect } from 'react';
import Movie from '../components/Movie';
import Link from 'next/link';
import Header from './../components/header';
import Nav from '../components/Nav';

export default function Main() {
  const [movies, setMovies] = useState([]);
  const [headerImage, setHeaderImage] = useState([]);
  const [genre, setGenre] = useState([]);

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

  useEffect(()=> {
    fetch('https://api.themoviedb.org/3/genre/movie/list?language=ko', options)
  .then(response => response.json())
  .then((response) => {
    setGenre(response.genres)
    console.log('렌더링 genre');
  })
  .catch(err => console.error(err));
  },[]);
  console.log(genre);

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
            <p className='font-semibold'>{headerImage.overview}</p>
          </div>
        </Link>
      </div>

      <div className='z-[100] relative translate-y-[-15%] h-screen'>
        <div className='mb-5'>
          <h1>인기 콘텐츠</h1>
          <div className='flex justify-between relative'>
            {movies.map((movie) => {
              return(
                <div key={movie.id} className='mb-2.5 ml-2.5 w-72'>
                  <Link key={movie.id} href={`detail/${movie.id}`} className='w-72'>
                    <Movie
                      key={movie.id}
                      id={movie.id}
                      posterImg={movie.backdrop_path}
                      title={movie.title}
                      className='w-72'
                    />
                  </Link>
                </div>
              )
            }).sort((a, b) => b.popularity - a.popularity)}
          </div>
        </div>

        <div className='mb-5'>
          <h1 className='ml-2.5'>지금 뜨는 콘텐츠</h1>
          <div className='flex justify-between relative'>
            {movies.map((movie) => {
              return(
                <div key={movie.id} className='w-36'>
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

        <div className='mb-5'>
          {/* <h1>{genre[0].name}</h1> */}
          <div className='flex'>
          {movies.map((movie) => (
            movie.genre_ids.includes(genre[0].id) ? 
              <div key={movie.id} className='ml-2.5 w-36'>
                <Movie
                  key={movie.id}
                  id={movie.id}
                  posterImg={movie.backdrop_path}
                  title={movie.title}
                    />
              </div> : null
            ))}
          </div>
        </div>

        <div className='mb-5'>
          {/* <h1>{genre[1].name}</h1> */}
          <div className='flex'>
          {movies.map((movie) => (
            movie.genre_ids.includes(genre[1].id) ? 
              <div key={movie.id} className='ml-2.5 w-36'>
                <Movie
                  key={movie.id}
                  id={movie.id}
                  posterImg={movie.backdrop_path}
                  title={movie.title}
                    />
              </div> : null
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}