import Link from "next/link";
import { useState, useEffect } from "react";

export default function Genres({ movies }) {
  const [genres, setGenres] = useState([]);

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

  return (
    <div className="font-RobotoMono">
      {genres.map((genre) => {
        const movieArray = [];
        const categories = {
          genreId: genre.id,
          genreName: genre.name,
          movieList: [],
        };
        return (
          <div key={genre.id}>
            <h1 className="ml-2.5 mb-1.5 text-3xl font-bold">{genre.name}</h1>
            <ul className="flex flex-wrap">
              {movies
                .filter((movie) => {
                  if (movie.genre_ids.includes(genre.id)) {
                    categories.movieList.push({
                      movieId: movie.id,
                      movieTitle: movie.title,
                    });
                    return movieArray.push(categories);
                  }
                  return movieArray;
                })
                .map((movie) => {
                  if (movieArray === 0) return;
                  return (
                    <Link href={`detail/${movie.id}`} key={movie.id}>
                      <li>
                        <h1 className="ml-2.5 bg-gray-600/50 p-3 rounded-md">
                          {movie.title}
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
        );
      })}
    </div>
  );
}
