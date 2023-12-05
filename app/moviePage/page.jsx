"use client";

import Genres from "../components/genres";
import { useQuery } from "@tanstack/react-query";
import { fetchMovie } from "../util/http.js";
import { useAuth } from "../store/useAuth";
import Link from "next/link";
import Nav from "../components/nav";

export default function MoviePage() {
  const { user } = useAuth();
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["movieList"],
    queryFn: fetchMovie,
  });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  console.log(data);

  const movies = data.movieList.results;

  if (!user) {
    return (
      <div>
        <Link href={"/"}>로그인</Link>을 해주세요
      </div>
    );
  }

  return (
    <>
      <Nav />
      <Genres movies={movies} />
    </>
  );
}
