'use client';

import { useEffect, useState } from 'react';
import { useInfiniteQuery, useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { getPopularMovie, getNowPlayMovie, getUpcomingMovie, getTopRatedMovie } from '../assets/api';
import clsx from 'clsx';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { Top } from '../assets/icons';
useInfiniteQuery;

const categoryRoute = [
	{
		id: 'popularMovie',
		name: '인기 영화',
	},
	{
		id: 'nowPlayMovie',
		name: '상영 중인 영화',
	},
	{
		id: 'upcomingMovie',
		name: '상영 예정 영화',
	},
	{
		id: 'topRated',
		name: '평점 순 영화',
	},
];

export default function MoviePage() {
	const [categories, setCategories] = useState('popularMovie');
	const [showTop, setShowTop] = useState(false);
	const [show, setShow] = useState(false);
	const {
		data: popular,
		isError: popularStatus,
		error: popularError,
		fetchNextPage: popularNextPage,
		hasNextPage: popularHasNextPage,
		isFetching: popularFetching,
	} = useInfiniteQuery({
		queryKey: ['popularMovie'],
		queryFn: ({ pageParam = 1 }) => getPopularMovie({ page: pageParam }),
		initialPageParam: 1,
		getNextPageParam: (lastPage) => lastPage.nextPageParam,
		maxPages: 100,
	});

	const {
		data: nowPlay,
		isError: nowplayStatus,
		error: nowPlayError,
		fetchNextPage: nowPlayNextPage,
		hasNextPage: nowPlayHasNextPage,
		isFetching: nowPlayFetching,
	} = useInfiniteQuery({
		queryKey: ['nowPlayMovie'],
		queryFn: ({ pageParam = 1 }) => getNowPlayMovie({ page: pageParam }),
		initialPageParam: 1,
		getNextPageParam: (lastPage) => lastPage.nextPageParam,
		maxPages: 100,
	});

	const {
		data: upcoming,
		isError: upcomingStatus,
		error: upcomingError,
		fetchNextPage: upcomingNextPage,
		hasNextPage: upcomingHasNextPage,
		isFetching: upcomingFetching,
	} = useInfiniteQuery({
		queryKey: ['upcomingMovie'],
		queryFn: ({ pageParam = 1 }) => getUpcomingMovie({ page: pageParam }),
		initialPageParam: 1,
		getNextPageParam: (lastPage) => lastPage.nextPageParam,
		maxPages: 100,
	});

	const {
		data: topRated,
		isError: topRatedStatus,
		error: topRatedError,
		fetchNextPage: topRatedNextPage,
		hasNextPage: topRatedHasNextPage,
		isFetching: topRatedFetching,
	} = useInfiniteQuery({
		queryKey: ['topRated'],
		queryFn: ({ pageParam = 1 }) => getTopRatedMovie({ page: pageParam }),
		initialPageParam: 1,
		getNextPageParam: (lastPage) => lastPage.nextPageParam,
		maxPages: 100,
	});

	const { ref, inView } = useInView({
		threshold: 0,
		delay: 0,
	});

	useEffect(() => {
		if (inView) {
			loadMore();
		}
	}, [inView]);

	const loadMore = () => {
		if (categories === 'popularMovie') {
			!popularFetching && popularHasNextPage && popularNextPage();
		}
		if (categories === 'nowPlayMovie') {
			!nowPlayFetching && nowPlayHasNextPage && nowPlayNextPage();
		}

		if (categories === 'upcomingMovie') {
			!upcomingFetching && upcomingHasNextPage && upcomingNextPage();
		}

		if (categories === 'topRated') {
			!topRatedFetching && topRatedHasNextPage && topRatedNextPage();
		}
	};

	useEffect(() => {
		const topButtonShow = () => {
			if (window.scrollY > 100) {
				setShowTop(true);
			} else {
				setShowTop(false);
			}
		};
		window.addEventListener('scroll', topButtonShow);
		return () => window.removeEventListener('scroll', topButtonShow);
	}, []);

	if (popularStatus) {
		return <h1>Popular Error: {popularError.message}</h1>;
	}
	if (nowplayStatus) {
		return <h1>Now-play Error: {nowPlayError.message}</h1>;
	}
	if (upcomingStatus) {
		return <h1>Upcoming Error: {upcomingError.message}</h1>;
	}
	if (topRatedStatus) {
		return <h1>Top-Rated Error: {topRatedError.message}</h1>;
	}

	const popularMovieList = popular?.pages;
	const nowPlayMovieList = nowPlay?.pages;
	const upcomingMovieList = upcoming?.pages;
	const topRatedMovieList = topRated?.pages;

	const moviesByCategory = {
		popularMovie: popularMovieList || [],
		nowPlayMovie: nowPlayMovieList || [],
		upcomingMovie: upcomingMovieList || [],
		topRated: topRatedMovieList || [],
	};

	const MoveToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
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
				<div className="w-9/12 flex flex-wrap gap-5 justify-center mx-auto">
					{moviesByCategory[categories].map((page) => {
						if (page[categories]) {
							return page[categories].results.map((movie) => {
								if (!movie.poster_path) return;
								return (
									<Link key={movie.id} href={`detail/movie/${movie.id}`}>
										<div className="w-48 transition-all duration-300 hover:scale-150">
											<img
												src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
												alt="poster"
											/>
										</div>
									</Link>
								);
							});
						}
						return null;
					})}
					<div ref={ref} style={{ height: 20 }} />
				</div>
				{showTop && (
					<button className="text-red-500 w-10 h-10 fixed bottom-16 right-6" onClick={MoveToTop}>
						<Top />
					</button>
				)}
			</div>
		</div>
	);
}
