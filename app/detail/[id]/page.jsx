'use client'
import Movie from '../../components/movie';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Nav } from './../../components/nav';


export default function Detail(props){
  const [movies, setMovies] = useState();
  const [headerImage, setHeaderImage] = useState({});
  const params = useParams();
  console.log(props);
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: process.env.NEXT_PUBLIC_API_KEY
    }
  };
  
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${props.params.id}`, options)
    .then(response => response.json())
    .then((response) => {
      setMovies(response.results);
      setHeaderImage(response.results[Math.floor(Math.random() * response.results.length - 1)]);
      console.log('렌더링');
    })
    .catch(err => console.error(err));
  }, []);
  return (
    <>
    <Nav />
    {movies && <Movie
        key={movies.id}
        id={movies.id}
        posterImg={`https://image.tmdb.org/t/p/original/${movies.poster_path}`}
        bigPoster={`https://image.tmdb.org/t/p/original/${headerImage.backdrop_path}`}
        title={movies.title}
      />}
    </>
  )
}