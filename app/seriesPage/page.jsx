'use client';

import { useEffect, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getTopRatedTv, getPopularTv, getOnTheAir, getAiringToday } from '../assets/api.js';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import clsx from 'clsx';
import { Top } from '../assets/icons';
import Image from 'next/image.js';

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
	const [showTop, setShowTop] = useState('false');

	const {
		data: popular,
		isError: popularStatus,
		fetchNextPage: popularNextPage,
		hasNextPage: popularHasNextPage,
	} = useInfiniteQuery({
		queryKey: ['popularTv'],
		queryFn: ({ pageParam = 1 }) => getPopularTv({ page: pageParam }),
		initialPageParam: 1,
		getNextPageParam: (lastPage) => lastPage.nextPageParam,
		maxPages: 100,
	});

	const {
		data: onTheAir,
		isError: onTheAirStatus,
		fetchNextPage: onTheAirNextPage,
		hasNextPage: onTheAirHasNextPage,
	} = useInfiniteQuery({
		queryKey: ['onTheAir'],
		queryFn: ({ pageParam = 1 }) => getOnTheAir({ page: pageParam }),
		initialPageParam: 1,
		getNextPageParam: (lastPage) => lastPage.nextPageParam,
		maxPages: 100,
	});

	const {
		data: airingToday,
		isError: airingTodayStatus,
		fetchNextPage: airingTodayNextPage,
		hasNextPage: airingTodayHasNextPage,
	} = useInfiniteQuery({
		queryKey: ['airingToday'],
		queryFn: ({ pageParam = 1 }) => getAiringToday({ page: pageParam }),
		initialPageParam: 1,
		getNextPageParam: (lastPage) => lastPage.nextPageParam,
		maxPages: 100,
	});

	const {
		data: topRated,
		isError: topRatedStatus,
		fetchNextPage: topRatedNextPage,
		hasNextPage: topRatedHasNextPage,
	} = useInfiniteQuery({
		queryKey: ['topRatedTv'],
		queryFn: ({ pageParam = 1 }) => getTopRatedTv({ page: pageParam }),
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
		if (categories === 'popularTv') {
			popularHasNextPage && popularNextPage();
		}
		if (categories === 'onTheAir') {
			onTheAirHasNextPage && onTheAirNextPage();
		}

		if (categories === 'airingToday') {
			airingTodayHasNextPage && airingTodayNextPage();
		}

		if (categories === 'topRatedTv') {
			topRatedHasNextPage && topRatedNextPage();
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

	if (popularStatus || onTheAirStatus || airingTodayStatus || topRatedStatus) {
		return <h1>Error: 문제가 발생했어요</h1>;
	}

	const popularTvList = !popular ? null : popular?.pages;
	const onTvList = !onTheAir ? null : onTheAir?.pages;
	const todayTvList = !airingToday ? null : airingToday?.pages;
	const topRatedTvList = !topRated ? null : topRated?.pages;

	const tvByCategory = {
		popularTv: popularTvList,
		onTheAir: onTvList,
		airingToday: todayTvList,
		topRatedTv: topRatedTvList,
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
					{!tvByCategory[categories]
						? null
						: tvByCategory[categories]?.map((page) => {
								if (page[categories]) {
									return page[categories].results?.map((series) => {
										if (!series.poster_path) return;
										return (
											<Link key={series.id} href={`detail/tv/${series.id}`}>
												<div className="w-48 transition-all duration-300 hover:scale-150">
													<Image
														src={`https://image.tmdb.org/t/p/original/${series.poster_path}`}
														alt="poster"
														width={240}
														height={360}
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
