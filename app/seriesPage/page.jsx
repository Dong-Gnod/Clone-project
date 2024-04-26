'use client';

import { useEffect, useState } from 'react';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { getTopRatedTv, getPopularTv, getOnTheAir, getAiringToday, getTvList } from '../assets/api.js';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import clsx from 'clsx';
import { Top } from '../assets/icons';

const categoryRoute = [
	{
		id: 'popularTv',
		name: '인기 Tv 프로그램',
	},
	{
		id: 'onTheAir',
		name: '방영 중인 프로그램',
	},
	{
		id: 'airingToday',
		name: '오늘 방영 프로그램',
	},
	{
		id: 'topRatedTv',
		name: '평점 순 프로그램',
	},
];

export default function SeriesPage() {
	const [categories, setCategories] = useState('popularTv');
	const part = 'tv';

	const {
		data: popular,
		isError: popularStatus,
		error: popularError,
		fetchNextPage: popularNextPage,
		hasNextPage: popularHasNextPage,
		isFetching: popularFetching,
	} = useSuspenseInfiniteQuery({
		queryKey: ['popularTv'],
		queryFn: ({ pageParam = 1 }) => getPopularTv({ page: pageParam }),
		initialPageParam: 1,
		getNextPageParam: (lastPage) => lastPage.nextPageParam,
		maxPages: 500,
	});

	const {
		data: onTheAir,
		isError: onTheAirStatus,
		error: onTheAirError,
		fetchNextPage: onTheAirNextPage,
		hasNextPage: onTheAirHasNextPage,
		isFetching: onTheAirFetching,
	} = useSuspenseInfiniteQuery({
		queryKey: ['onTheAir'],
		queryFn: ({ pageParam = 1 }) => getOnTheAir({ page: pageParam }),
		initialPageParam: 1,
		getNextPageParam: (lastPage) => lastPage.nextPageParam,
		maxPages: 500,
	});

	const {
		data: airingToday,
		isError: airingTodayStatus,
		error: airingTodayError,
		fetchNextPage: airingTodayNextPage,
		hasNextPage: airingTodayHasNextPage,
		isFetching: airingTodayFetching,
	} = useSuspenseInfiniteQuery({
		queryKey: ['airingToday'],
		queryFn: ({ pageParam = 1 }) => getAiringToday({ page: pageParam }),
		initialPageParam: 1,
		getNextPageParam: (lastPage) => lastPage.nextPageParam,
		maxPages: 500,
	});

	const {
		data: topRated,
		isError: topRatedStatus,
		error: topRatedError,
		fetchNextPage: topRatedNextPage,
		hasNextPage: topRatedHasNextPage,
		isFetching: topRatedFetching,
	} = useSuspenseInfiniteQuery({
		queryKey: ['topRatedTv'],
		queryFn: ({ pageParam = 1 }) => getTopRatedTv({ page: pageParam }),
		initialPageParam: 1,
		getNextPageParam: (lastPage) => lastPage.nextPageParam,
		maxPages: 500,
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
		if (categories === 'popularTv') {
			!popularFetching && popularHasNextPage && popularNextPage();
		}
		if (categories === 'onTheAir') {
			!onTheAirFetching && onTheAirHasNextPage && onTheAirNextPage();
		}

		if (categories === 'airingToday') {
			!airingTodayFetching && airingTodayHasNextPage && airingTodayNextPage();
		}

		if (categories === 'topRatedTv') {
			!topRatedFetching && topRatedHasNextPage && topRatedNextPage();
		}
	};

	if (popularStatus) {
		<h1>Error: {popularError.message}</h1>;
	}

	if (onTheAirStatus) {
		<h1>Error: {onTheAirError.message}</h1>;
	}

	if (airingTodayStatus) {
		<h1>Error: {airingTodayError.message}</h1>;
	}

	if (topRatedStatus) {
		<h1>Error: {topRatedError.message}</h1>;
	}

	const popularTvList = popular?.pages;
	const onTvList = onTheAir?.pages;
	const todayTvList = airingToday?.pages;
	const topRatedTvList = topRated?.pages;

	const tvByCategory = {
		popularTv: popularTvList || [],
		onTheAir: onTvList || [],
		airingToday: todayTvList || [],
		topRatedTv: topRatedTvList || [],
	};

	const MoveToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

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
			<div className="mt-10">
				<div className="w-9/12 flex flex-wrap gap-5 justify-center mx-auto">
					{tvByCategory[categories]?.map((page) => {
						if (page[categories]) {
							return page[categories].results?.map((series) => {
								if (!series.poster_path) return;
								return (
									<Link key={series.id} href={`detail/tv/${series.id}`}>
										<div className="w-48 transition-all duration-300 hover:scale-150">
											<img
												src={`https://image.tmdb.org/t/p/original/${series.poster_path}`}
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
				<button className="text-red-500 w-10 h-10 fixed bottom-16 right-6" onClick={MoveToTop}>
					<Top />
				</button>
			</div>
		</div>
	);
}
