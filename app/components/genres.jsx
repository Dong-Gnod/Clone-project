import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight } from "./icons/icons";

export default function Genres({ movies }) {
  const [genres, setGenres] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const TOTAL_SLIDE = 2;
  const slideRef = useRef([]);
  const boxRef = useRef([]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_MOVIE_API_KEY,
    },
  };

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/genre/movie/list?language=ko", options)
      .then((response) => response.json())
      .then((response) => {
        setGenres(response.genres);
      })
      .catch((err) => console.error(err));
  }, []);
  console.log(genres);

  const nextSlide = () => {
    if (currentSlide >= TOTAL_SLIDE) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(TOTAL_SLIDE);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };

  useEffect(() => {
    genres.forEach((genre, index) => {
      let width = boxRef.current[index].clientWidth;
      slideRef.current[index].style.transition = "all 0.5s ease-in-out";
      slideRef.current[index].style.transform = `translateX(-${
        width * currentSlide
      }px)`;
      console.log(`width: ${width}, current: ${currentSlide}`);
    });
  }, [currentSlide, genres]);
  console.log(slideRef.current);
  console.log(boxRef.current);

  return (
    <div className="font-RobotoMono">
      {genres.map((genre, index) => {
        return (
          <div key={genre.id} className={genre.name}>
            <h1 className="ml-2.5 mb-1.5 text-3xl font-bold">
              {document.querySelectorAll(`.${genre.name} .item`).length === 0
                ? null
                : genre.name}
            </h1>
            <div
              id={`slide-box-${index}`}
              ref={(element) => {
                boxRef.current[index] = element;
              }}>
              <ul
                className="flex"
                ref={(element) => {
                  slideRef.current[index] = element;
                }}>
                {movies
                  .filter((movie) => {
                    return movie.genre_ids.includes(genre.id);
                  })
                  .map((movie) => {
                    return (
                      <Link href={`detail/${movie.id}`} key={movie.id}>
                        <li className="item">
                          <h1
                            className="ml-2.5 bg-gray-600/50 p-3 rounded-md"
                            maxLength="15">
                            {movie.title.slice(0, 16)}
                          </h1>
                          <div className="w-72 ml-2.5 mb-7">
                            <img
                              id={movie.id}
                              src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                              alt="Image"
                            />
                          </div>
                        </li>
                      </Link>
                    );
                  })}
              </ul>
            </div>
            <div className="btnBox z-[100] flex justify-between w-full">
              <button className="slideBtn" onClick={prevSlide}>
                <ArrowLeft />
              </button>
              <button className="slideBtn" onClick={nextSlide}>
                <ArrowRight />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
