'use client'
import { useEffect, useState } from 'react';
import { Nav } from './components/Nav';

      {/* 만들어야 할 것
      1.nav
      2.header
      3.main -> slide */}

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const API_TOKEN = process.env.NEXT_PUBLIC_apiToken;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: API_TOKEN
      }
    };
    
    fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=ko-ko&page=1&sort_by=popularity.desc', options)
      .then(response => response.json())
      .then((data) => 
        setMovies(data)
      )
      .catch(err => console.error(err));
}, [])
    console.log(movies);
// console.log(movies.results[0]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-0">
      {/* navigation */}
      <Nav />
      {/* header */}

      {/* contents */}
      {/* <div>{movies.results[0].title}</div> */}
    </main>
  )
}
