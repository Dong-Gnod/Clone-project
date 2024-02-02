'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPopularMovie, getNowPlayMovie, getUpcomingMovie, getTopRatedMovie, getMovie } from '@/app/assets/api';
import Link from 'next/link';
import clsx from 'clsx';

export default function MoviePage() {
	const [categories, setCategories] = useState('');
	const categoryRoute = [
		{
			id: 'popular',
			name: '인기 영화',
		},
		{
			id: 'now-playing',
			name: '상영 중인 영화',
		},
		{
			id: 'upcoming',
			name: '상영 예정 영화',
		},
		{
			id: 'toprated',
			name: '평점 순 영화',
		},
	];

	const getMovies = useQuery({
		queryKey: ['movieList'],
		queryFn: getMovie,
	});

	const getPopular = useQuery({
		queryKey: ['popularMovie'],
		queryFn: getPopularMovie,
	});
	const getNowPlaying = useQuery({
		queryKey: ['nowPlayMovie'],
		queryFn: getNowPlayMovie,
	});
	const getUpcoming = useQuery({
		queryKey: ['upcomingMovie'],
		queryFn: getUpcomingMovie,
	});
	const getTopRated = useQuery({
		queryKey: ['topRated'],
		queryFn: getTopRatedMovie,
	});

	if (getPopular.status === 'loading') {
		return <h1>Loading...</h1>;
	} else if (getPopular.status === 'error') {
		<h1>Error: {getPopular.error.message}</h1>;
	}

	if (getNowPlaying.status === 'loading') {
		return <h1>Loading...</h1>;
	} else if (getNowPlaying.status === 'error') {
		<h1>Error: {getNowPlaying.error.message}</h1>;
	}

	if (getUpcoming.status === 'loading') {
		return <h1>Loading...</h1>;
	} else if (getUpcoming.status === 'error') {
		<h1>Error: {getUpcoming.error.message}</h1>;
	}

	if (getTopRated.status === 'loading') {
		return <h1>Loading...</h1>;
	} else if (getTopRated.status === 'error') {
		<h1>Error: {getTopRated.error.message}</h1>;
	}

	if (!getPopular.data || !getNowPlaying.data || !getUpcoming.data || !getTopRated.data) {
		return <h1>Loading...</h1>;
	}

	const moviesList = getMovies.data.movieList.results;
	const popularMovieList = getPopular.data.popularMovie.results;
	console.log(popularMovieList);
	const nowPlayMovieList = getNowPlaying.data.nowPlayMovie.results;
	const upcomingMovieList = getUpcoming.data.upcomingMovie.results;
	const topRatedMovieList = getTopRated.data.topRated.results;

	return (
		<div className="w-screen flex flex-col justify-center mt-20">
			<ul className="flex w-dvw justify-center font-black text-xl">
				{categoryRoute.map((category) => {
					return (
						<button
							key={category.id}
							onClick={() => setCategories(category.id)}
							className={`mr-8 pb-2 hover:border-b-4 hover:border-solid hover:border-red-600 ${clsx({
								['border-b-4 border-solid border-red-600']: categories === category.id,
							})}`}>
							<li key={category.id}>{category.name}</li>
						</button>
					);
				})}
			</ul>
			<div className="flex justify-center mt-10">
				{categories === '' ? (
					<div className="w-9/12 flex flex-wrap gap-5 justify-center">
						{moviesList.map((movie) => {
							return (
								<Link key={movie.id} href={`detail/${movie.id}`}>
									<div className="w-48 transition-all duration-300 hover:scale-150">
										<img
											src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
											alt="poster"
										/>
									</div>
								</Link>
							);
						})}
					</div>
				) : null}

				{categories === 'popular' ? (
					<div className="w-9/12 flex flex-wrap gap-5 justify-center">
						{popularMovieList.map((movie) => {
							return (
								<Link key={movie.id} href={`detail/${movie.id}`}>
									<div className="w-48 transition-all duration-300 hover:scale-150">
										<img
											src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
											alt="poster"
										/>
									</div>
								</Link>
							);
						})}
					</div>
				) : null}

				{categories === 'now-playing' ? (
					<div className="w-9/12 flex flex-wrap gap-5 justify-center">
						{nowPlayMovieList.map((movie) => {
							return (
								<Link key={movie.id} href={`detail/${movie.id}`}>
									<div className="w-48 transition-all duration-300 hover:scale-150">
										<img
											src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
											alt="poster"
										/>
									</div>
								</Link>
							);
						})}
					</div>
				) : null}

				{categories === 'upcoming' ? (
					<div className="w-9/12 flex flex-wrap gap-5 justify-center">
						{upcomingMovieList.map((movie) => {
							return (
								<Link key={movie.id} href={`detail/${movie.id}`}>
									<div className="w-48 transition-all duration-300 hover:scale-150">
										<img
											src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
											alt="poster"
										/>
									</div>
								</Link>
							);
						})}
					</div>
				) : null}

				{categories === 'toprated' ? (
					<div className="w-9/12 flex flex-wrap gap-5 justify-center">
						{topRatedMovieList.map((movie) => {
							return (
								<Link key={movie.id} href={`detail/${movie.id}`}>
									<div className="w-48 transition-all duration-300 hover:scale-150">
										<img
											src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
											alt="poster"
										/>
									</div>
								</Link>
							);
						})}
					</div>
				) : null}
			</div>
		</div>
	);
}
