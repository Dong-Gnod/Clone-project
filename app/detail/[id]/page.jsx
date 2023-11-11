'use client'
import Movie from '../../components/movie';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Nav } from './../../components/nav';


export default function Detail(props){
  const [movie, setMovie] = useState([]);
  const params = useParams();
  console.log(props);
  console.log(params);
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: process.env.NEXT_PUBLIC_API_KEY
    }
  };
  
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${props.params.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=ko-KO&append_to_response=images`, options)
    .then(response => response.json())
    .then((response) => {
      setMovie(response);
      console.log('렌더링');

    })
    .catch(err => console.error(err));
  }, []);
  console.log(movie.backdrop_path);

  return (
    <>
    <Nav />
    {movie && <Movie
        key={movie.id}
        id={movie.id}
        bigPoster={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        title={movie.title}
      />}
    </>
  )
}