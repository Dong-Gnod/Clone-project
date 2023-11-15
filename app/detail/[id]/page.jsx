'use client'
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Nav from '@/app/components/nav';
import Header from '../../components/header';
import { Play } from '../../components/icons/icons';
import Link from 'next/link';

export default function Detail(props){
  const [movie, setMovie] = useState([]);
  const [genres, setGenres] = useState([]);
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
      Authorization: process.env.NEXT_PUBLIC_MOVIE_API_KEY
    }
  };
  
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${props.params.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=ko-KO&append_to_response=images,videos`, options)
    .then(response => response.json())
    .then((response) => {
      setMovie(response);
      setVideos(response.videos.results);
      setGenres(response.genres);
      console.log('렌더링');
    })
    .catch(err => console.error(err));
  }, []);
  console.log(movie);
  console.log(videos);
  console.log(movie.genres);
  return (
    <>
    <Nav />
    <div className='w-full h-screen text-black font-semibold'>
      {/* 이미지 */}
      {movie && <Header
        key={movie.id}
        id={movie.id}
        headerImage={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        title={movie.title}
      />}

        <div className='bg-gray-400/50 p-3 rounded-md z-[100] w-2/4 flex justify-center flex-col mx-auto relative bottom-[15%] translate-y-[-50%]'>
          <h1 className='text-center text-3xl font-black'>{movie.title}</h1>
          <div className='flex justify-between items-center mb-2'>
            <div className='flex text-xl w-[100%]'>
              <h1>장르:</h1>
              <span className='flex justify-between'>
              {genres.map((genre, index) => {
                return (
                  <p key={index} className='ml-2'>{genre.name}</p>
                )
              })}
              </span>
            </div>

            {/* 예고편 */}
            {videos.map((video) => {
              if(video.type === "Trailer"){
                videoKey.push(video.key);
                console.log(videoKey);
              }
            })}
            <div className=' bg-play w-[20%] items-center p-3 rounded-md'>
              <Link href={`https://www.youtube.com/watch?v=${videoKey[0]}`} className='flex justify-center top-[50%]'>
              <Play />
                <span ref={ref} className='text-black items-center'>예고편 재생</span>
              </Link>
            </div>
          </div>

          {/* 줄거리 */}
          <p>{movie.overview}</p>
        </div>
      </div>
    
    </>
  )
}