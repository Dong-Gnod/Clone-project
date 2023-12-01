"use client";

import { useEffect } from "react";
import Movie from "../components/movie";
import Link from "next/link";
import Header from "./../components/header";
import Nav from "../components/nav";
import Genres from "../components/genres";
import TopTen from "../components/topTen";
import { useAuth } from "./../store/useAuth";
import { useQuery } from "@tanstack/react-query";
import { fetchMovie } from "../util/http.server.js";

export default function Main() {
  // const [movies, setMovies] = useState([]);
  // const [headerImage, setHeaderImage] = useState([]);
  const { user } = useAuth();
  const { data } = useQuery({
    queryKey: ["movies", "headerImage"],
    queryFn: fetchMovie,
  });

  console.log(data);

  // const options = {
  //   method: "GET",
  //   headers: {
  //     accept: "application/json",
  //     Authorization: process.env.NEXT_PUBLIC_MOVIE_API_KEY,
  //   },
  // };

  // useEffect(() => {
  //   fetch(
  //     "https://api.themoviedb.org/3/discover/movie?certification=asia&include_adult=false&include_video=true&language=ko-KO&page=10&sort_by=popularity.desc",
  //     options
  //   )
  //     .then((response) => response.json())
  //     .then((response) => {
  //       setMovies(response.results);
  //       setHeaderImage(
  //         response.results[
  //           Math.floor(Math.random() * response.results.length - 1)
  //         ]
  //       );
  //     })
  //     .catch((err) => console.error(err));
  // }, []);

  if (!user) {
    return (
      <div>
        <Link href={"/"}>로그인</Link>을 해주세요
      </div>
    );
  }

  return (
    <div className="w-full h-full font-RobotoMono">
      <Nav />
      <div className="w-full flex justify-center">
        <Link key={headerImage.id} href={`detail/${headerImage.id}`}>
          <Header
            key={headerImage.id}
            id={headerImage.id}
            title={headerImage.title}
            headerImage={headerImage.backdrop_path}
          />
          <div className="text-black z-[100] absolute top-[65%] left-[25%] w-1/2 bg-gray-400/50 p-3 rounded-md mx-auto text-center">
            <p className="font-extrabold text-xl mb-2.5 border-b-solid border-b-white border-b-2 pb-0.5 w-80 mx-auto">
              {headerImage.title}
            </p>
            <p className="font-semibold line-clamp-3 m-10">
              {headerImage.overview ? headerImage.overview : "설명이 없습니다."}
            </p>
          </div>
        </Link>
      </div>

      {/* Main Contents */}
      <div className="translate-y-[-2%] overflow-x-hidden max-w-screen-3xl relative">
        <div className="w-screen mb-5 h-full">
          <h1 className="ml-2.5 text-3xl font-bold mb-1.5 bg-gray-600/50 p-3 rounded-md w-[15%]">
            지금 뜨는 콘텐츠
          </h1>
          <div className="w-full h-48">
            <Movie movies={data} />
          </div>
        </div>

        <div className="mb-7">
          <h1 className="ml-2.5 text-3xl font-bold mb-7">인기 콘텐츠</h1>
          <div className="flex justify-between relative mt-12">
            <TopTen movies={data} />
          </div>
        </div>

        <div className="mt-28 mb-7">
          <div className="flex justify-between">
            <Genres movies={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
