'use client';

import { useState } from 'react';
import { useSuspenseInfiniteQuery, useSuspenseQuery } from '@tanstack/react-query';
import {
	getPopularInfinite,
	getNowPlayMovieInfinite,
	getUpcomingMovieInfinite,
	getTopRatedMovieInfinite,
	getMovie,
} from '../assets/api';
import Link from 'next/link';
import clsx from 'clsx';
import { MovieList } from '../components/MovieList';

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

export default function MoviePage() {
	const [categories, setCategories] = useState('popular');

	const {
		data: popular,
		isError: popularStatus,
		error: popularError,
	} = useSuspenseInfiniteQuery({
		queryKey: ['popularMovie'],
		queryFn: ({ pageParams = 1 }) => getPopularInfinite({ pageParams: pageParams }),
		initialPageParam: 1,
		getNextPageParam: (lastPage) => lastPage.nextCursor,
		maxPages: 500,
	});

	const {
		data: nowPlay,
		isError: nowplayStatus,
		error: nowPlayError,
	} = useSuspenseInfiniteQuery({
		queryKey: ['nowPlayMovie'],
		queryFn: ({ pageParams = 1 }) => getNowPlayMovieInfinite({ pageParams: pageParams }),
		initialPageParam: 1,
		getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
		maxPages: 500,
	});

	const {
		data: upcoming,
		isError: upcomingStatus,
		error: upcomingError,
	} = useSuspenseInfiniteQuery({
		queryKey: ['upcomingMovie'],
		queryFn: ({ pageParams = 1 }) => getUpcomingMovieInfinite({ pageParams: pageParams }),
		initialPageParam: 1,
		getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
		maxPages: 500,
	});

	const {
		data: topRated,
		isError: topRatedStatus,
		error: topRatedError,
	} = useSuspenseInfiniteQuery({
		queryKey: ['topRated'],
		queryFn: ({ pageParams = 1 }) => getTopRatedMovieInfinite({ pageParams: pageParams }),
		initialPageParam: 1,
		getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
		maxPages: 500,
	});

	if (popularStatus) {
		<h1>Popular Error: {popularError.message}</h1>;
	}

	if (nowplayStatus) {
		<h1>Now-play Error: {nowPlayError.message}</h1>;
	}
	if (upcomingStatus) {
		<h1>Upcoming Error: {upcomingError.message}</h1>;
	}
	if (topRatedStatus) {
		<h1>Top-Rated Error: {topRatedError.message}</h1>;
	}

	const popularMovieList = popular.pages[0].popularMovie.results;
	const nowPlayMovieList = nowPlay.pages[0].nowPlayMovie.results;
	const upcomingMovieList = upcoming.pages[0].upcomingMovie.results;
	const topRatedMovieList = topRated.pages[0].topRated.results;
	// console.log(popularMovieList[0].popularMovie.results);

	const moviesByCategory = {
		popular: popularMovieList,
		'now-playing': nowPlayMovieList,
		upcoming: upcomingMovieList,
		toprated: topRatedMovieList,
	};

	return (
		<div className="w-screen flex flex-col justify-center mt-20">
			<ul className="flex w-dvw justify-center font-black text-xl mt-10">
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
			<div className="mt-10">
				<MovieList movies={moviesByCategory[categories]} />
			</div>
		</div>
	);
}
