'use client'
import { useEffect, useState } from 'react';
import { Nav } from './components/Nav';

export default function Home() {
  const [movies, setMovies] = useState([]);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YjQwNmUwYjQ4ZWYzOGE5NjU0MzllOGQ3MGYyMmZlZCIsInN1YiI6IjY1NDBhYzFmNDU1N2EwMDEzYWMwMDIwZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eLhE6jFhC8QqdghjVsHvegoQrb-mSUxdqDQrVOYaBNU'
    }
  };
  
  fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-ko&page=1&sort_by=popularity.desc', options)
    .then(response => response.json())
    .then((response) => {
      setMovies(response);
      console.log(response)
    })
    .catch(err => console.error(err));

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-0">
      {/* 만들어야 할 것
      1.nav
      2.header
      3.main -> slide */}
      {/* navigation */}
      <Nav />
      {/* header */}
      {/* contents */}
    </main>
  )
}
