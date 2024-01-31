'use client';

import Genres from '../components/Genres';
import { useQuery } from '@tanstack/react-query';
import { getMovie } from '../assets/api.js';
import Link from 'next/link';
import Nav from '../components/Nav';
import Header from '../components/Header';
import Movie from '../components/Movie';

export default function MoviePage() {
	const { data, isPending, isError, error } = useQuery({
		queryKey: ['movieList'],
		queryFn: getMovie,
	});

	if (isPending) {
		return <span>Loading...</span>;
	}

	if (isError) {
		return <span>Error: {error.message}</span>;
	}

	console.log(data);

	const movies = data.movieList.results;
	const headerImage = movies[Math.floor(Math.random() * movies.length - 1)];

	return (
		<>
			<Nav />
			<div className="w-full flex justify-center">
				<Link key={headerImage.id} href={`detail/${headerImage.id}`}>
					<Header />
					<div className="text-black z-[100] absolute top-[65%] left-[25%] w-1/2 bg-gray-400/50 p-3 rounded-md mx-auto text-center">
						<p className="font-extrabold text-xl mb-2.5 border-b-solid border-b-white border-b-2 pb-0.5 w-80 mx-auto">
							{headerImage.title}
						</p>
						<p className="font-semibold line-clamp-3 m-10">
							{headerImage.overview ? headerImage.overview : '설명이 없습니다.'}
						</p>
					</div>
				</Link>
			</div>

			<div className="w-screen h-full">
				<h1 className="ml-2.5 text-3xl font-bold mb-1.5 bg-gray-600/50 p-3 rounded-md w-[15%]">
					지금 뜨는 콘텐츠
				</h1>
				<div>
					<Movie movies={movies} />
				</div>
			</div>

			<div className="mt-28 mb-7">
				<div className="flex justify-between">
					<Genres movies={movies} />
				</div>
			</div>
		</>
	);
}
