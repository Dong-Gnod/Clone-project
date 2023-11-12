'use client'
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Nav } from './../../components/nav';
import Header from '../../components/header';
import { Play } from '../../components/icons/icons';
import Link from 'next/link';

export default function Detail(props){
  const [movie, setMovie] = useState([]);
  const [videos, setVideos] = useState([]);
  const params = useParams();
  const ref = useRef(null);
  const videoKey = [];
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
    fetch(`https://api.themoviedb.org/3/movie/${props.params.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=ko-KO&append_to_response=images,videos`, options)
    .then(response => response.json())
    .then((response) => {
      setMovie(response);
      setVideos(response.videos.results);
      console.log('렌더링');
    })
    .catch(err => console.error(err));
  }, []);
  console.log(movie);
  console.log(videos);
  return (
    <>
    <Nav />
    {movie && <Header
        key={movie.id}
        id={movie.id}
        headerImage={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        title={movie.title}
      />}

      <h1>{movie.title}</h1>
      {videos.map((video) => {
        if(video.type === "Trailer"){
          videoKey.push(video.key);
          console.log(videoKey);
        } else if(videoKey.length === 0){
          ref.current.style.textContent = '영상이 없습니다.'
        }
      })}
        <Link href={`https://www.youtube.com/watch?v=${videoKey[0]}`} className='bg-play'>
          <Play />
          <span ref={ref} className='text-black'>예고편 재생</span>
        </Link>
      <p>{movie.overview}</p>
    </>
  )
}