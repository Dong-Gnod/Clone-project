'use client';

import { useCallback, useEffect, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getPopularMovie, getNowPlayMovie, getUpcomingMovie, getTopRatedMovie } from '../assets/api';
import clsx from 'clsx';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { Top } from '../assets/icons';
import Loading from '../components/Loading';
import Image from 'next/image';

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

	const {
		data: popular,
		isError: popularStatus,
		isLoading: popularLoading,
		isFetching: popularFetching,
		fetchNextPage: popularNextPage,
		hasNextPage: popularHasNextPage,
	} = useInfiniteQuery({
		queryKey: ['popularMovie'],
		queryFn: ({ pageParam = 1 }) => getPopularMovie({ page: pageParam }),
		initialPageParam: 1,
		getNextPageParam: (lastPage) => {
			return lastPage?.nextPageParam || undefined;
		},
		maxPages: 100,
	});
	console.log(popular);

	const {
		data: nowPlay,
		isError: nowplayStatus,
		isLoading: nowPlayLoading,
		isFetching: nowPlayFetching,
		fetchNextPage: nowPlayNextPage,
		hasNextPage: nowPlayHasNextPage,
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
		isLoading: upcomingLoading,
		isFetching: upcomingFetching,
		fetchNextPage: upcomingNextPage,
		hasNextPage: upcomingHasNextPage,
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
		isLoading: topRatedLoading,
		isFetching: topRatedFetching,
		fetchNextPage: topRatedNextPage,
		hasNextPage: topRatedHasNextPage,
	} = useInfiniteQuery({
		queryKey: ['topRated'],
		queryFn: ({ pageParam = 1 }) => getTopRatedMovie({ page: pageParam }),
		initialPageParam: 1,
		getNextPageParam: (lastPage) => lastPage.nextPageParam,
		maxPages: 100,
	});

	// /////////////////////////////////////////
	const { ref, inView } = useInView({
		threshold: 0,
		delay: 0,
	});

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
		if (inView) {
			loadMore();
		}
	}, [inView]);

	useEffect(() => {
		const topButtonShow = () => {
			if (window.scrollY > 250) {
				setShowTop(true);
			} else {
				setShowTop(false);
			}
		};
		window.addEventListener('scroll', topButtonShow);
		return () => window.removeEventListener('scroll', topButtonShow);
	}, []);

	const MoveToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};
	// /////////////////////////////////////////
	if (popularLoading) {
		return <Loading />;
	}
	if (nowPlayLoading) {
		return <Loading />;
	}
	if (upcomingLoading) {
		return <Loading />;
	}
	if (topRatedLoading) {
		return <Loading />;
	}

	if (popularStatus || nowplayStatus || upcomingStatus || topRatedStatus) {
		return <h1>Error: 문제가 발생했어요</h1>;
	}

	const popularMovieList = popular?.pages?.flatMap((page) => page[categories]?.results) ?? [];
	const nowPlayMovieList = nowPlay?.pages?.flatMap((page) => page[categories]?.results) ?? [];
	const upcomingMovieList = upcoming?.pages?.flatMap((page) => page[categories]?.results) ?? [];
	const topRatedMovieList = topRated?.pages?.flatMap((page) => page[categories]?.results) ?? [];
	console.log(popularMovieList);

	const moviesByCategory = {
		popularMovie: popularMovieList,
		nowPlayMovie: nowPlayMovieList,
		upcomingMovie: upcomingMovieList,
		topRated: topRatedMovieList,
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
					{moviesByCategory[categories]?.map((movie) => {
						if (!movie.poster_path) return;
						return (
							<Link key={movie.id} href={`detail/movie/${movie.id}`}>
								<div className="w-48 transition-all duration-300 hover:scale-150">
									<Image
										src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
										alt="poster"
										width={240}
										height={320}
									/>
								</div>
							</Link>
						);
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
