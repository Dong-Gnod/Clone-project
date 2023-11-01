'use client'
import { useEffect, useState } from 'react';
import { Nav } from './components/Nav';
import Image from 'next/image';

      {/* 만들어야 할 것
      1.nav
      2.header
      3.main -> slide */}

export default function Home() {
  const [movies, setMovies] = useState([]);
  
  useEffect(() => {
    const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: API_TOKEN
      }
    };
    const moviesApi = async () => {
      const json = await (
        await fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=ko-ko&page=1&sort_by=popularity.desc', options)
      ).json()
      console.log(json);
      setMovies(json);
      if(json){
        console.log(json);
      }
    }
    moviesApi();
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-0">
      {/* navigation */}
      <Nav />
      {/* header */}
      <h1>{movies.results[0].title}</h1>
      
      {/* contents */}

    </main>
  )
}
