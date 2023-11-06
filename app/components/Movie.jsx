'use client'
import { useState, useEffect, useRef } from 'react';
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
import { ArrowLeft, ArrowRight } from './icons/icons';

export const Movie = () => {
  const [movies, setMovies] = useState([]);
  const [headerImage, setHeaderImage] = useState({});
  const [slideWidth, setSlideWidth] = useState(0);
  const [slideCount, setSlideCount] = useState(0);
  const [dotIdx, setDotIdx] = useState(0);
  const [dots,setDots] = useState([]);
  const slideRef = useRef(null);

  // 영화 API
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: process.env.NEXT_PUBLIC_API_KEY
    }
  };
  
  async function fetchMovieApi(){
    const response = await fetch('https://api.themoviedb.org/4/account/6540ac1f4557a0013ac0020d/movie/recommendations?page=1&language=ko-ko', options)
    const movieList = await response.json();
      setMovies(movieList.results);
      setHeaderImage(movieList.results[Math.floor(Math.random() * movieList.results.length - 1)]);
      console.log('렌더링');
      console.log(movies);
      // console.log(headerImage);
  }

  useEffect(() => {
    fetchMovieApi()
  }, []);

  console.log(slideRef);
  console.log(movies);

  // slide 만들기
  function makeClone(){ // 복제 슬라이드르 만들어서 슬라이드가 계속 돌아가게 하기
    // 뒤에 추가
    for(let i = 0; i < slideCount; i++){
      const cloneSlide = slide[i].cloneNode(true);
      cloneSlide.classList.add('clone');
      slideRef.current.appendChild(cloneSlide);
    }

    // 앞에 추가
    for(let i = slideCount - 1; i >= 0; i--){
      const cloneSlide = slide[i].cloneNode(true);
      cloneSlide.classList.add('clone');
      slideRef.current.prepend(cloneSlide);
    }
  }
  function upDateWidth(){
   
  }


  return (
    <div className='absolute top-0 w-full'>
      {/* header */}
      <div className='w-full  bg-gradient-to-t from-black via-black to-black'>
        <img
          src={`https://image.tmdb.org/t/p/original/${headerImage.backdrop_path}`} 
          alt="headerImage"
          className='w-full'
        />
        </div>
        
      {/* 인기 콘텐츠 */}
      <h1 className='pl-14'>넷플릭스 인기 콘텐츠</h1>
      <div id='slideViewer' className='flex w-full'>
        <div className='flex w-full h-40 overflow-hidden pl-14' ref={slideRef}>
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
          }).sort((a, b) => b.popularity - a.popularity)}
        </div>
        <div>
          <button>
            <ArrowLeft className='z-[100]' />
          </button>
          <button>
            <ArrowRight className='z-[100]' />
          </button>
        </div>

      </div>


      {/* TOP 10 */}
      <div className='flex overflow-hidden pl-14'>
        {movies.map((movie) => {
          return (
            <>
              <img 
                key={movie.id} 
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
